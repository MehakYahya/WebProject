const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');  // Import CORS module

// Initialize Express app
const app = express();
const port = 3000;

// Enable CORS to allow requests from Angular app
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Mock database with admin details
const admins = [
    {
        email: 'syedahira2846@gmail.com',
        password: bcrypt.hashSync('admin123', 10), // Hashed password
    },
];
app.post('/api/auth/admin-login', (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email, password });  // Log the incoming data

    // Find the admin by email
    const admin = admins.find((admin) => admin.email === email);
    if (!admin) {
        console.log('Admin not found');
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, admin.password, (err, result) => {
        if (err || !result) {
            console.log('Password mismatch');
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // If passwords match, generate a JWT token
        const token = jwt.sign({ email: admin.email }, 'secret-key', { expiresIn: '1h' });
        console.log('Token generated:', token);  // Log the generated token

        // Send the token in the response
        return res.status(200).json({ message: 'Login successful', token });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
