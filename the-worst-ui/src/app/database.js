import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';

export async function openDb() {
  return open({
    filename: './ssc_database.sqlite',
    driver: sqlite3.Database
  });
}

export async function initializeDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT);
  `);

  const sampleUser = {
    id: 100,
    username: 'ericw',
    password: 'ericw',
    email: 'ericw@example.com'
  };

  try {
    await db.run(`
      INSERT INTO users (id, username, password, email) VALUES (?, ?, ?, ?)`,
      [sampleUser.id, sampleUser.username, sampleUser.password, sampleUser.email]);
    console.log('Sample user inserted successfully');
  } catch (error) {
    console.error('Error inserting sample user:', error.message);
  }

  await db.close();
}