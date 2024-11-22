const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database/db');
const router = express.Router();

// Register a new user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(query, [username, password], (err) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err.message });
        }
        res.status(201).json({ message: 'User created successfully.' });
    });
});

router.get('/user/:username', (req, res) => {
    const { username } = req.params;

    const query = `SELECT id, username FROM users WHERE username = ?`;
    db.get(query, [username], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(row);
    });
});

module.exports = router;
