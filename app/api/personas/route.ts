import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
    try {
        // Select and map snake_case columns to camelCase properties
        // Mapping 'clientes' table to 'Persona' interface
        const result = await query(`
      SELECT 
        id, 
        nombre, 
        apellido, 
        email, 
        telefono, 
        dni, 
        direccion, 
        activo, 
        fecha_registro as "fechaRegistro"
      FROM clientes
      ORDER BY id ASC
    `);

        return NextResponse.json(result.rows);
    } catch (error: any) {
        console.error("Database error:", error);
        return NextResponse.json({ error: 'Error fetching personas' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            nombre, apellido, email, telefono, dni, direccion
        } = body;

        // INSERT query into 'clientes'
        const result = await query(
            `INSERT INTO clientes (nombre, apellido, email, telefono, dni, direccion, activo, fecha_registro)
       VALUES ($1, $2, $3, $4, $5, $6, true, NOW())
       RETURNING id, nombre, apellido, email, telefono, dni, direccion, activo, fecha_registro as "fechaRegistro"`,
            [nombre, apellido, email, telefono, dni, direccion]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error("Database error:", error);
        return NextResponse.json({ error: 'Error creating persona: ' + error.message }, { status: 500 });
    }
}
