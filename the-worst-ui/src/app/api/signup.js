import { NextResponse } from 'next/server';
import { openDb } from '../../../database';

export async function POST(req) {
  const { username, password, email } = await req.json();
  const db = await openDb();
  await db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email]);
  return NextResponse.json({ message: 'Signed up successfully!' });
}
