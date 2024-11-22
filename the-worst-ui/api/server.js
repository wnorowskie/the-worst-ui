const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');

dotenv.config();

const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

// Allow requests from your Next.js app
app.use(cors({
  origin: 'http://localhost:3000', // Replace with the URL of your Next.js app
  methods: 'GET, POST', // Allow these methods
}));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
