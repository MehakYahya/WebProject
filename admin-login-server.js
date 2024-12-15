const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');  // Import CORS module

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Mock database
const admins = [
  {
    email: 'syedahira2846@gmail.com',
    password: bcrypt.hashSync('admin123', 10), // Hashed password
  },
];

let supportTickets = [
  { id: '1', customerName: 'John Doe', subject: 'Login issue', status: 'Pending' },
  { id: '2', customerName: 'Jane Smith', subject: 'Payment failure', status: 'Pending' },
  { id: '3', customerName: 'Alice Johnson', subject: 'Product not delivered', status: 'Resolved' },
];

// Admin login route
app.post('/api/auth/admin-login', (req, res) => {
  const { email, password } = req.body;
  const admin = admins.find((admin) => admin.email === email);

  if (!admin) return res.status(401).json({ message: 'Invalid email or password' });

  bcrypt.compare(password, admin.password, (err, result) => {
    if (err || !result) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ email: admin.email }, 'secret-key', { expiresIn: '1h' });
    return res.status(200).json({ message: 'Login successful', token });
  });
});

// Get all support tickets
app.get('/api/support/tickets', (req, res) => {
  res.status(200).json(supportTickets);
});

// Resolve a support ticket
app.put('/api/support/tickets/resolve/:id', (req, res) => {
  const { id } = req.params;

  const ticket = supportTickets.find((t) => t.id === id);
  if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

  ticket.status = 'Resolved';
  return res.status(200).json({ message: 'Ticket resolved successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
