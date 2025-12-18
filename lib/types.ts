// Tipos que representan las entidades JPA del backend Spring Boot

export interface Cliente {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string
  direccion: string
  dni: string
  fechaRegistro: string
  activo: boolean
}

export interface Auto {
  id: number
  marca: string
  modelo: string
  anio: number
  precio: number
  kilometraje: number
  combustible: "Gasolina" | "Diesel" | "Eléctrico" | "Híbrido"
  transmision: "Manual" | "Automática"
  color: string
  descripcion: string
  imagenUrl: string
  disponible: boolean
  caracteristicas: string[]
}

export interface Reserva {
  id: number
  clienteId: number
  autoId: number
  fechaReserva: string
  fechaInicio: string
  fechaFin: string
  estado: "Pendiente" | "Confirmada" | "Cancelada" | "Completada"
  comentarios: string
  montoTotal: number
  cliente?: Cliente
  auto?: Auto
}

export interface FormularioContacto {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}
