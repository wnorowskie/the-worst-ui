const sqlite3 = require('sqlite3').verbose();

// Create a new database connection
const db = new sqlite3.Database('./database/users.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL,
                password TEXT NOT NULL
            )
        `);
    }
});

module.exports = db;
