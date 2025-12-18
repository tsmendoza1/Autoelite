// Funciones que simulan las llamadas al backend Spring Boot
// En producción, estas harían fetch a tu API REST de Spring Boot
import type { Cliente, Auto, Reserva } from "./types"
import { mockClientes, mockAutos, mockReservas } from "./mock-data"

// Simulación de delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// === CLIENTES ===
export async function getClientes(): Promise<Cliente[]> {
  await delay(300)
  return [...mockClientes]
}

export async function getClienteById(id: number): Promise<Cliente | null> {
  await delay(200)
  return mockClientes.find((c) => c.id === id) || null
}

export async function createCliente(cliente: Omit<Cliente, "id">): Promise<Cliente> {
  await delay(400)
  const newId = Math.max(...mockClientes.map((c) => c.id)) + 1
  const newCliente = { ...cliente, id: newId }
  mockClientes.push(newCliente)
  return newCliente
}

export async function updateCliente(id: number, cliente: Partial<Cliente>): Promise<Cliente> {
  await delay(400)
  const index = mockClientes.findIndex((c) => c.id === id)
  if (index !== -1) {
    mockClientes[index] = { ...mockClientes[index], ...cliente }
    return mockClientes[index]
  }
  throw new Error("Cliente no encontrado")
}

export async function deleteCliente(id: number): Promise<void> {
  await delay(300)
  const index = mockClientes.findIndex((c) => c.id === id)
  if (index !== -1) {
    mockClientes.splice(index, 1)
  }
}

// === AUTOS ===
export async function getAutos(): Promise<Auto[]> {
  await delay(300)
  return [...mockAutos]
}

export async function getAutoById(id: number): Promise<Auto | null> {
  await delay(200)
  return mockAutos.find((a) => a.id === id) || null
}

export async function createAuto(auto: Omit<Auto, "id">): Promise<Auto> {
  await delay(400)
  const newId = Math.max(...mockAutos.map((a) => a.id)) + 1
  const newAuto = { ...auto, id: newId }
  mockAutos.push(newAuto)
  return newAuto
}

export async function updateAuto(id: number, auto: Partial<Auto>): Promise<Auto> {
  await delay(400)
  const index = mockAutos.findIndex((a) => a.id === id)
  if (index !== -1) {
    mockAutos[index] = { ...mockAutos[index], ...auto }
    return mockAutos[index]
  }
  throw new Error("Auto no encontrado")
}

export async function deleteAuto(id: number): Promise<void> {
  await delay(300)
  const index = mockAutos.findIndex((a) => a.id === id)
  if (index !== -1) {
    mockAutos.splice(index, 1)
  }
}

// === RESERVAS ===
export async function getReservas(): Promise<Reserva[]> {
  await delay(300)
  const reservasConDetalles = mockReservas.map((r) => ({
    ...r,
    cliente: mockClientes.find((c) => c.id === r.clienteId),
    auto: mockAutos.find((a) => a.id === r.autoId),
  }))
  return reservasConDetalles
}

export async function getReservaById(id: number): Promise<Reserva | null> {
  await delay(200)
  const reserva = mockReservas.find((r) => r.id === id)
  if (!reserva) return null
  return {
    ...reserva,
    cliente: mockClientes.find((c) => c.id === reserva.clienteId),
    auto: mockAutos.find((a) => a.id === reserva.autoId),
  }
}

export async function createReserva(reserva: Omit<Reserva, "id">): Promise<Reserva> {
  await delay(400)
  const newId = Math.max(...mockReservas.map((r) => r.id)) + 1
  const newReserva = { ...reserva, id: newId }
  mockReservas.push(newReserva)
  return {
    ...newReserva,
    cliente: mockClientes.find((c) => c.id === newReserva.clienteId),
    auto: mockAutos.find((a) => a.id === newReserva.autoId),
  }
}

export async function updateReserva(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
  await delay(400)
  const index = mockReservas.findIndex((r) => r.id === id)
  if (index !== -1) {
    mockReservas[index] = { ...mockReservas[index], ...reserva }
    return {
      ...mockReservas[index],
      cliente: mockClientes.find((c) => c.id === mockReservas[index].clienteId),
      auto: mockAutos.find((a) => a.id === mockReservas[index].autoId),
    }
  }
  throw new Error("Reserva no encontrada")
}

export async function deleteReserva(id: number): Promise<void> {
  await delay(300)
  const index = mockReservas.findIndex((r) => r.id === id)
  if (index !== -1) {
    mockReservas.splice(index, 1)
  }
}
