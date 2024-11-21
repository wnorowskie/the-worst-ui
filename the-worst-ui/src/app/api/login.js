import { NextResponse } from 'next/server';
import { openDb } from '../../../database';

export async function POST(req) {
  const { username, password } = await req.json();
  const db = await openDb();
  const user = await db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);
  if (user) {
    return NextResponse.json({ message: 'Logged in successfully!' });
  } else {
    return NextResponse.json({ error: 'Invalid username or password!' }, { status: 401 });
  }
}