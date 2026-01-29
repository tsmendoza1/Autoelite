import { query } from "@/lib/db"
import { Persona, Reserva } from "@/lib/types"

export async function getAllClientes(): Promise<Persona[]> {
    try {
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
    `)
        return result.rows
    } catch (error) {
        console.error("Database error fetching clientes:", error)
        return []
    }
}

export async function getAllReservas(): Promise<Reserva[]> {
    try {
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
      JOIN clientes c ON r.cliente_id = c.id
      JOIN autos a ON r.auto_id = a.id
      ORDER BY r.fecha_reserva DESC
    `)

        return result.rows.map((row) => ({
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
                email: row.persona_email,
                telefono: "", // Placeholder
                direccion: "", // Placeholder
                dni: "", // Placeholder
                activo: true
            },
            auto: {
                id: row.autoId,
                marca: row.auto_marca,
                modelo: row.auto_modelo,
                precio: row.auto_precio,
                anio: 0,
                kilometraje: 0,
                combustible: "Gasolina",
                transmision: "Manual",
                color: "",
                descripcion: "",
                imagenUrl: "",
                estado: "Disponible",
                caracteristicas: []
            },
        }))
    } catch (error) {
        console.error("Database error fetching reservas:", error)
        return []
    }
}
