const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// In-memory data stores
const sellers = {}; // { email: { name, password (hashed), isApproved, isRejected } }
const admins = { 'admin@example.com': { password: bcrypt.hashSync('admin123', 10) } }; // Admin credentials
const products = []; // Store products
const orders = []; // Store orders
const customers = {}; // { email: { name, password, phone, address, createdAt } }

// Utility for generating JWT
const generateToken = (payload) => jwt.sign(payload, 'secret-key', { expiresIn: '1h' });

/* -------------------- AUTHENTICATION ENDPOINTS -------------------- */

// Admin Login
app.post('/api/auth/admin-login', (req, res) => {
  const { email, password } = req.body;
  const admin = admins[email];
  if (!admin) return res.status(401).json({ message: 'Invalid email or password.' });

  bcrypt.compare(password, admin.password, (err, isMatch) => {
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password.' });
    const token = generateToken({ email, role: 'admin' });
    res.status(200).json({ message: 'Login successful', token });
  });
});

// Seller Signup
app.post('/seller/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (sellers[email]) return res.status(400).json({ message: 'Seller already exists.' });

  // Hash password and store seller
  const hashedPassword = await bcrypt.hash(password, 10);
  sellers[email] = { name, password: hashedPassword, isApproved: false, isRejected: false };
  res.status(201).json({ message: 'Signup successful. Awaiting admin approval.' });
});

// Seller Login
app.post('/seller/login', (req, res) => {
  const { email, password } = req.body;
  const seller = sellers[email];
  if (!seller) return res.status(404).json({ message: 'Seller not found.' });
  if (seller.isRejected) return res.status(403).json({ message: 'Account rejected by admin.' });
  if (!seller.isApproved) return res.status(403).json({ message: 'Account not approved by admin yet.' });

  bcrypt.compare(password, seller.password, (err, isMatch) => {
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });
    const token = generateToken({ email, role: 'seller' });
    res.status(200).json({ message: 'Login successful.', token });
  });
});

/* -------------------- ADMIN ENDPOINTS -------------------- */

// Get Pending Sellers
app.get('/admin/pending-sellers', (req, res) => {
  const pendingSellers = Object.entries(sellers)
    .filter(([email, details]) => !details.isApproved && !details.isRejected)
    .map(([email, details]) => ({ email, name: details.name }));
  res.status(200).json({ pendingSellers });
});

// Approve Seller
app.post('/admin/approve-seller', (req, res) => {
  const { email } = req.body;
  const seller = sellers[email];
  if (!seller) return res.status(404).json({ message: 'Seller not found.' });
  if (seller.isApproved) return res.status(400).json({ message: 'Seller is already approved.' });

  seller.isApproved = true;
  seller.isRejected = false;
  res.status(200).json({ message: 'Seller approved successfully.' });
});

// Reject Seller
app.post('/admin/reject-seller', (req, res) => {
  const { email } = req.body;
  const seller = sellers[email];
  if (!seller) return res.status(404).json({ message: 'Seller not found.' });
  if (seller.isRejected) return res.status(400).json({ message: 'Seller is already rejected.' });

  seller.isRejected = true;
  seller.isApproved = false;
  res.status(200).json({ message: 'Seller rejected successfully.' });
});

// Get Sellers with Status
app.get('/admin/sellers-status', (req, res) => {
  const sellersWithStatus = Object.entries(sellers).map(([email, details]) => ({
    email,
    name: details.name,
    status: details.isRejected
      ? 'Rejected'
      : details.isApproved
        ? 'Approved'
        : 'Pending',
  }));
  res.status(200).json({ sellers: sellersWithStatus });
});

// View All Customers
app.get('/admin/customers', (req, res) => {
  const customerData = Object.entries(customers).map(([email, details]) => ({
    email,
    name: details.name,
    phone: details.phone,
    address: details.address,
    createdAt: details.createdAt,
  }));
  res.status(200).json({ customers: customerData });
});

/* -------------------- PRODUCT ENDPOINTS -------------------- */

// Add Product
app.post('/api/products', (req, res) => {
  const { name, price, description, quantity, image } = req.body;
  if (!name || !price || !description || !quantity || !image) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }
  const newProduct = { name, price, description, quantity, image };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// View All Products
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

/* -------------------- ORDER MANAGEMENT -------------------- */

// Create Order
app.post('/api/orders', (req, res) => {
  const { name, address, email, payment, totalAmount, cartItems } = req.body;
  if (!name || !address || !email || !payment || !totalAmount || !cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'Missing required fields or empty cart.' });
  }

  const newOrder = {
    id: Date.now().toString(),
    name,
    address,
    email,
    paymentInfo: payment,
    totalAmount,
    items: cartItems,
    status: 'Pending',
  };
  orders.push(newOrder);
  res.status(201).json({ message: 'Order created successfully.', order: newOrder });
});

// Update Order Status
app.put('/api/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const { status } = req.body;
  const order = orders.find((o) => o.id === orderId);
  if (!order) return res.status(404).json({ message: 'Order not found.' });

  order.status = status;
  res.status(200).json({ message: 'Order status updated successfully.', order });
});

// View All Orders
app.get('/api/orders', (req, res) => {
  res.status(200).json(orders);
});

/* -------------------- CUSTOMER ENDPOINTS -------------------- */

// Customer Signup
app.post('/customer/signup', (req, res) => {
  const { name, email, password, phone, address } = req.body;
  if (customers[email]) return res.status(400).json({ message: 'Customer already exists.' });

  customers[email] = { name, password, phone, address, createdAt: new Date() };
  res.status(201).json({ message: 'Customer registered successfully.' });
});

// Customer Login
app.post('/customer/login', (req, res) => {
  const { email, password } = req.body;
  const customer = customers[email];
  if (!customer) return res.status(404).json({ message: 'Customer not found.' });

  if (customer.password === password) {
    res.status(200).json({ message: 'Login successful.', role: 'customer' });
  } else {
    res.status(401).json({ message: 'Invalid credentials.' });
  }
});


/* ----------------------- SERVER START ----------------------- */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
