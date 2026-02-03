import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const result = await query(`
      SELECT 
        r.id, 
        r.fecha_inicio as "fechaInicio", 
        r.fecha_fin as "fechaFin", 
        r.estado, 
        r.notas as "comentarios",
        r.fecha_reserva as "fechaReserva",
        c.id as "personaId",
        c.nombre as "persona_nombre",
        c.apellido as "persona_apellido",
        c.email as "persona_email",
        a.id as "autoId",
        a.marca as "auto_marca",
        a.modelo as "auto_modelo",
        a.precio as "auto_precio"
      FROM reservas r
      JOIN personas c ON r.persona_id = c.id
      JOIN autos a ON r.auto_id = a.id
      WHERE r.persona_id = $1
      ORDER BY r.fecha_reserva DESC
    `, [id]);

        const reservas = result.rows.map(row => ({
            id: row.id,
            personaId: row.personaId,
            autoId: row.autoId,
            fechaReserva: row.fechaReserva,
            fechaInicio: row.fechaInicio,
            fechaFin: row.fechaFin,
            estado: row.estado,
            comentarios: row.comentarios || "",
            montoTotal: row.auto_precio,
            persona: {
                id: row.personaId,
                nombre: row.persona_nombre,
                apellido: row.persona_apellido,
                email: row.persona_email
            },
            auto: {
                id: row.autoId,
                marca: row.auto_marca,
                modelo: row.auto_modelo,
                precio: row.auto_precio
            }
        }));

        return NextResponse.json(reservas);
    } catch (error: any) {
        console.error("Database error fetching reservas for persona:", error);
        return NextResponse.json({ error: 'Error fetching reservass' }, { status: 500 });
    }
}
