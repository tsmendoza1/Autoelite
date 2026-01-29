import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const result = await query(
            `SELECT id, username, role, password 
       FROM usuarios 
       WHERE username = $1`,
            [email]
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        const user = result.rows[0];

        // Map database fields to what frontend expects if needed, or just use as is.
        // Frontend likely expects generic user object.
        if (user.password !== password) {
            return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
        }

        // Remove password
        delete user.password;

        return NextResponse.json(user);
    } catch (error: any) {
        console.error("Login DB Error:", error);
        return NextResponse.json({ error: 'System error' }, { status: 500 });
    }
}
