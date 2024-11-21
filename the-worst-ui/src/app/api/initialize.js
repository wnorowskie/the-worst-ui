import { initializeDb } from '../../../database';

export default async function handler(req, res) {
  const db = await openDb();
  await initializeDb();
  res.status(200).send('Database initialized');
}