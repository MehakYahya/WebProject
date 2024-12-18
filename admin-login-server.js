const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// In-memory stores
const admins = {
  'admin@example.com': { password: bcrypt.hashSync('admin123', 10) },
};

let sellers = {}; // Store seller details {email: {name, password, isApproved}}
let products = []; // Store products added by sellers

// Utility function for generating JWT tokens
const generateToken = (payload) => jwt.sign(payload, 'secret-key', { expiresIn: '1h' });

/* ----------------------- ADMIN ENDPOINTS ----------------------- */

// 1. Admin Login
app.post('/api/auth/admin-login', (req, res) => {
  const { email, password } = req.body;

  const admin = admins[email];
  if (!admin) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  bcrypt.compare(password, admin.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT Token
    const token = generateToken({ email, role: 'admin' });
    return res.status(200).json({ message: 'Login successful', token });
  });
});

// 2. Admin: Get Pending Sellers
app.get('/admin/pending-sellers', (req, res) => {
  const pendingSellers = Object.entries(sellers)
    .filter(([email, details]) => !details.isApproved)
    .map(([email, details]) => ({ email, name: details.name }));

  return res.status(200).json({ pendingSellers });

});

// 3. Admin: Approve Seller
app.post('/admin/approve-seller', (req, res) => {
  const { email } = req.body;

  const seller = sellers[email];
  if (!seller) {
    return res.status(404).json({ message: 'Seller not found.' });
  }

  if (seller.isApproved) {
    return res.status(400).json({ message: 'Seller is already approved.' });
  }

  seller.isApproved = true;
  return res.status(200).json({ message: 'Seller approved successfully.' });
});

// 4. Admin: Reject Seller
// 4. Admin: Reject Seller
app.post('/admin/reject-seller', (req, res) => {
  const { email } = req.body;

  const seller = sellers[email];
  if (!seller) {
    return res.status(404).json({ message: 'Seller not found.' });
  }

  if (seller.isRejected) {
    return res.status(400).json({ message: 'Seller is already rejected.' });
  }

  seller.isRejected = true; // Add rejected status
  seller.isApproved = false; // Ensure isApproved is false
  return res.status(200).json({ message: 'Seller rejected successfully.' });
});

// Admin: Get Sellers with Status
app.get('/admin/sellers-status', (req, res) => {
  const sellersWithStatus = Object.entries(sellers).map(([email, details]) => ({
    email,
    name: details.name,
    status: details.isRejected
      ? 'Rejected'
      : details.isApproved
        ? 'Approved'
        : 'Pending', // Determine status
  }));

  return res.status(200).json({ sellers: sellersWithStatus });
});


// 5. Admin: View All Products
app.get('/api/products', (req, res) => {
  return res.status(200).json(products); // Return all products
});

/* ----------------------- SELLER ENDPOINTS ----------------------- */

// 1. Seller Signup
app.post('/seller/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if seller already exists
  if (sellers[email]) {
    return res.status(400).json({ message: 'Seller already exists.' });
  }

  // Add seller with pending approval
  sellers[email] = { name, password, isApproved: false };
  return res.status(201).json({ message: 'Signup successful. Awaiting admin approval.' });
});

// 2. Seller Login
app.post('/seller/login', (req, res) => {
  const { email, password } = req.body;

  const seller = sellers[email];
  if (!seller) {
    return res.status(404).json({ message: 'Seller not found.' });
  }

  if (!seller.isApproved) {
    return res.status(403).json({ message: 'Account not approved by admin yet.' });
  }

  if (seller.password === password) {
    return res.status(200).json({ message: 'Login successful.', role: 'seller' });
  } else {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
});

/* ----------------------- PRODUCT ENDPOINTS ----------------------- */

// 1. Seller: Add Product
app.post('/api/products', (req, res) => {
  console.log('Request body:', req.body);
  const { name, price, description, quantity, image } = req.body;

  if (!name || !price || !description || !quantity || !image) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newProduct = { name, price, description, quantity, image };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
/* ----------------------- SERVER START ----------------------- */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
