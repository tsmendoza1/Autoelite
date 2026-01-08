import { Cliente, Auto, Reserva } from "./types"

// Datos de prueba (MOCK DATA)
let clientes: Cliente[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.perez@email.com",
    telefono: "123456789",
    direccion: "Calle Falsa 123",
    fechaRegistro: "2023-01-15",
    activo: true,
  },
  {
    id: 2,
    nombre: "María",
    apellido: "González",
    email: "maria.gonzalez@email.com",
    telefono: "987654321",
    direccion: "Av. Siempre Viva 742",
    fechaRegistro: "2023-02-20",
    activo: true,
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "López",
    email: "carlos.lopez@email.com",
    telefono: "555123456",
    direccion: "Plaza Mayor 1",
    fechaRegistro: "2023-03-10",
    activo: false,
  },
]

let autos: Auto[] = [
  {
    id: 1,
    marca: "Toyota",
    modelo: "Corolla",
    anio: 2022,
    precio: 25000,
    kilometraje: 15000,
    color: "Blanco",
    transmision: "Automática",
    combustible: "Híbrido",
    descripcion: "Excelente estado, único dueño.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    estado: "Disponible",
    disponible: true,
  },
  {
    id: 2,
    marca: "Honda",
    modelo: "Civic",
    anio: 2021,
    precio: 22000,
    kilometraje: 30000,
    color: "Gris",
    transmision: "Manual",
    combustible: "Gasolina",
    descripcion: "Mantenimientos al día.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    estado: "Vendido",
    disponible: false,
  },
  {
    id: 3,
    marca: "Ford",
    modelo: "Mustang",
    anio: 2023,
    precio: 55000,
    kilometraje: 5000,
    color: "Rojo",
    transmision: "Automática",
    combustible: "Gasolina",
    descripcion: "Deportivo de lujo.",
    imageUrl: "/placeholder.svg?height=200&width=300",
    estado: "Disponible",
    disponible: true,
  },
]

let reservas: Reserva[] = [
  {
    id: 1,
    cliente: clientes[0],
    auto: autos[0],
    fechaInicio: "2023-06-01",
    fechaFin: "2023-06-05",
    estado: "Confirmada",
    montoTotal: 500,
    notas: "Cliente VIP",
  },
  {
    id: 2,
    cliente: clientes[1],
    auto: autos[2],
    fechaInicio: "2023-07-10",
    fechaFin: "2023-07-15",
    estado: "Pendiente",
    montoTotal: 1200,
    notas: "",
  },
]

// Funciones simuladas (API Mock)

// === AUTH ===
export async function login(username: string, password: string) {
  // Simulación de login exitoso para admin/admin123
  if (username === "admin" && password === "admin123") {
    return {
      id: 1,
      username: "admin",
      role: "ADMIN",
      token: "mock-jwt-token-123456"
    }
  }
  return null
}


// === CLIENTES ===
export async function getClientes(): Promise<Cliente[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...clientes]), 500))
}

export async function getClienteById(id: number): Promise<Cliente | null> {
  return new Promise((resolve) => {
    const cliente = clientes.find((c) => c.id === id)
    setTimeout(() => resolve(cliente || null), 500)
  })
}

export async function createCliente(cliente: Omit<Cliente, "id">): Promise<Cliente> {
  return new Promise((resolve) => {
    const newCliente = { ...cliente, id: clientes.length + 1 }
    clientes.push(newCliente)
    setTimeout(() => resolve(newCliente), 500)
  })
}

export async function updateCliente(id: number, cliente: Partial<Cliente>): Promise<Cliente> {
  return new Promise((resolve) => {
    const index = clientes.findIndex((c) => c.id === id)
    if (index !== -1) {
      clientes[index] = { ...clientes[index], ...cliente }
      setTimeout(() => resolve(clientes[index]), 500)
    } else {
      throw new Error("Cliente no encontrado")
    }
  })
}

export async function deleteCliente(id: number): Promise<void> {
  return new Promise((resolve) => {
    clientes = clientes.filter((c) => c.id !== id)
    setTimeout(() => resolve(), 500)
  })
}

// === AUTOS ===
export async function getAutos(): Promise<Auto[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...autos]), 500))
}

export async function getAutoById(id: number): Promise<Auto | null> {
  return new Promise((resolve) => {
    const auto = autos.find((a) => a.id === id)
    setTimeout(() => resolve(auto || null), 500)
  })
}

export async function createAuto(auto: Omit<Auto, "id">): Promise<Auto> {
  return new Promise((resolve) => {
    const newAuto = { ...auto, id: autos.length + 1 }
    autos.push(newAuto)
    setTimeout(() => resolve(newAuto), 500)
  })
}

export async function updateAuto(id: number, auto: Partial<Auto>): Promise<Auto> {
  return new Promise((resolve) => {
    const index = autos.findIndex((a) => a.id === id)
    if (index !== -1) {
      autos[index] = { ...autos[index], ...auto }
      setTimeout(() => resolve(autos[index]), 500)
    } else {
      throw new Error("Auto no encontrado")
    }
  })
}

export async function deleteAuto(id: number): Promise<void> {
  return new Promise((resolve) => {
    autos = autos.filter((a) => a.id !== id)
    setTimeout(() => resolve(), 500)
  })
}

// === RESERVAS ===
export async function getReservas(): Promise<Reserva[]> {
  return new Promise((resolve) => setTimeout(() => resolve([...reservas]), 500))
}

export async function getReservaById(id: number): Promise<Reserva | null> {
  return new Promise((resolve) => {
    const reserva = reservas.find((r) => r.id === id)
    setTimeout(() => resolve(reserva || null), 500)
  })
}

export async function createReserva(reserva: Omit<Reserva, "id">): Promise<Reserva> {
  return new Promise((resolve) => {
    const newReserva = { ...reserva, id: reservas.length + 1 }
    reservas.push(newReserva)
    setTimeout(() => resolve(newReserva), 500)
  })
}

export async function updateReserva(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
  return new Promise((resolve) => {
    const index = reservas.findIndex((r) => r.id === id)
    if (index !== -1) {
      reservas[index] = { ...reservas[index], ...reserva }
      setTimeout(() => resolve(reservas[index]), 500)
    } else {
      throw new Error("Reserva no encontrada")
    }
  })
}

export async function deleteReserva(id: number): Promise<void> {
  return new Promise((resolve) => {
    reservas = reservas.filter((r) => r.id !== id)
    setTimeout(() => resolve(), 500)
  })
}
