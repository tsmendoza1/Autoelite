import { Cliente, Auto, Reserva } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8999/api"

// === AUTH ===
export async function login(username: string, password: string) {
  // TODO: Implementar login real contra el backend
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

// === HELPER ===
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    if (!res.ok) {
      console.warn(`Fetch failed for ${endpoint}: ${res.statusText}`)
      return [] as unknown as T // Retornar vacío para no romper el build
    }

    if (res.status === 204) {
      return {} as T
    }

    return res.json()
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error)
    return [] as unknown as T
  }
}

// === CLIENTES ===
export async function getClientes(): Promise<Cliente[]> {
  return fetchAPI<Cliente[]>("/clientes")
}

export async function getClienteById(id: number): Promise<Cliente | null> {
  try {
    return await fetchAPI<Cliente>(`/clientes/${id}`)
  } catch (e) {
    return null
  }
}

export async function createCliente(cliente: Omit<Cliente, "id">): Promise<Cliente> {
  return fetchAPI<Cliente>("/clientes", {
    method: "POST",
    body: JSON.stringify(cliente),
  })
}

export async function updateCliente(id: number, cliente: Partial<Cliente>): Promise<Cliente> {
  return fetchAPI<Cliente>(`/clientes/${id}`, {
    method: "PUT",
    body: JSON.stringify(cliente),
  })
}

export async function deleteCliente(id: number): Promise<void> {
  await fetchAPI<void>(`/clientes/${id}`, {
    method: "DELETE",
  })
}

// === AUTOS ===
export async function getAutos(): Promise<Auto[]> {
  try {
    return await fetchAPI<Auto[]>("/autos")
  } catch (error) {
    console.error("Error fetching autos:", error)
    return []
  }
}

export async function getAutoById(id: number): Promise<Auto | null> {
  try {
    return await fetchAPI<Auto>(`/autos/${id}`)
  } catch (e) {
    return null
  }
}

export async function createAuto(auto: Omit<Auto, "id">): Promise<Auto> {
  return fetchAPI<Auto>("/autos", {
    method: "POST",
    body: JSON.stringify(auto),
  })
}

export async function updateAuto(id: number, auto: Partial<Auto>): Promise<Auto> {
  return fetchAPI<Auto>(`/autos/${id}`, {
    method: "PUT",
    body: JSON.stringify(auto),
  })
}

export async function deleteAuto(id: number): Promise<void> {
  await fetchAPI<void>(`/autos/${id}`, {
    method: "DELETE",
  })
}

// === RESERVAS ===
export async function getReservas(): Promise<Reserva[]> {
  try {
    return await fetchAPI<Reserva[]>("/reservas")
  } catch (error) {
    console.error("Error fetching reservas:", error)
    return []
  }
}

export async function getReservaById(id: number): Promise<Reserva | null> {
  try {
    return await fetchAPI<Reserva>(`/reservas/${id}`)
  } catch (e) {
    return null
  }
}

export async function createReserva(reserva: Omit<Reserva, "id">): Promise<Reserva> {
  // Transformar datos para el backend
  const payload = {
    ...reserva,
    cliente: { id: reserva.clienteId },
    auto: { id: reserva.autoId },
    notas: reserva.comentarios,
    // Eliminar campos que no existen en el backend o que tienen otro formato
    clienteId: undefined,
    autoId: undefined,
    comentarios: undefined,
    montoTotal: undefined, // El backend no guarda el monto calculado
    fechaReserva: undefined, // El backend la genera
  }
  return fetchAPI<Reserva>("/reservas", {
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export async function updateReserva(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
  const payload = {
    ...reserva,
    cliente: reserva.clienteId ? { id: reserva.clienteId } : undefined,
    auto: reserva.autoId ? { id: reserva.autoId } : undefined,
    notas: reserva.comentarios,
    clienteId: undefined,
    autoId: undefined,
    comentarios: undefined,
    montoTotal: undefined,
    fechaReserva: undefined,
  }
  return fetchAPI<Reserva>(`/reservas/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  })
}

export async function deleteReserva(id: number): Promise<void> {
  await fetchAPI<void>(`/reservas/${id}`, {
    method: "DELETE",
  })
}
