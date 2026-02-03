import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const result = await query(`
      SELECT 
        id, 
        marca, 
        modelo, 
        anio, 
        precio, 
        kilometraje, 
        color, 
        transmision, 
        combustible, 
        descripcion, 
        imagen_url as "imagenUrl", 
        estado
      FROM autos
      WHERE id = $1
    `, [id]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Auto not found" }, { status: 404 });
        }

        const auto = {
            ...result.rows[0],
            caracteristicas: []
        };

        return NextResponse.json(auto);
    } catch (error: any) {
        console.error("Database error fetching auto:", error);
        return NextResponse.json({ error: 'Error fetching auto' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const {
            marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagenUrl, estado
        } = body;

        const result = await query(
            `UPDATE autos 
       SET 
         marca = COALESCE($1, marca),
         modelo = COALESCE($2, modelo),
         anio = COALESCE($3, anio),
         precio = COALESCE($4, precio),
         kilometraje = COALESCE($5, kilometraje),
         color = COALESCE($6, color),
         transmision = COALESCE($7, transmision),
         combustible = COALESCE($8, combustible),
         descripcion = COALESCE($9, descripcion),
         imagen_url = COALESCE($10, imagen_url),
         estado = COALESCE($11, estado)
       WHERE id = $12
       RETURNING id, marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagen_url as "imagenUrl", estado`,
            [marca, modelo, anio, precio, kilometraje, color, transmision, combustible, descripcion, imagenUrl, estado, id]
        );

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Auto not found" }, { status: 404 });
        }

        return NextResponse.json(result.rows[0]);
    } catch (error: any) {
        console.error("Database error updating auto:", error);
        return NextResponse.json({ error: 'Error updating auto' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const result = await query('DELETE FROM autos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return NextResponse.json({ error: "Auto not found" }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        console.error("Database error deleting auto:", error);
        return NextResponse.json({ error: 'Error deleting auto' }, { status: 500 });
    }
}
