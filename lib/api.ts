import { Persona, Auto, Reserva } from "./types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8999/api"

// === AUTH ===
export async function login(username: string, password: string) {
  try {
    const res = await fetch(`/api/auth/persona/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username, password }),
    })

    if (!res.ok) return null
    return res.json()
  } catch (err) {
    console.error("Login error:", err)
    return null
  }
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

const NEXT_API_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

// === PERSONAS ===
export async function getPersonas(): Promise<Persona[]> {
  const res = await fetch(`${NEXT_API_URL}/api/personas`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Error fetching personas");
  return res.json();
}

export async function getPersonaById(id: number): Promise<Persona | null> {
  try {
    return await fetchAPI<Persona>(`/personas/${id}`)
  } catch (e) {
    return null
  }
}

export async function createPersona(persona: Omit<Persona, "id">): Promise<Persona> {
  const res = await fetch(`${NEXT_API_URL}/api/personas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persona),
  })
  if (!res.ok) throw new Error("Error creating persona");
  return res.json();
}

export async function updatePersona(id: number, persona: Partial<Persona>): Promise<Persona> {
  const res = await fetch(`${NEXT_API_URL}/api/personas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persona),
  })
  if (!res.ok) throw new Error("Error updating persona");
  return res.json();
}

export async function deletePersona(id: number): Promise<void> {
  const res = await fetch(`${NEXT_API_URL}/api/personas/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error deleting persona");
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
    const res = await fetch(`${NEXT_API_URL}/api/reservas`, { cache: 'no-store' });
    if (!res.ok) throw new Error("Error fetching reservas");
    return res.json();
  } catch (error) {
    console.error("Error fetching reservas:", error)
    return []
  }
}

export async function createReserva(reserva: Omit<Reserva, "id">): Promise<Reserva> {
  const res = await fetch(`${NEXT_API_URL}/api/reservas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  })
  if (!res.ok) throw new Error("Error creating reserva")
  return res.json()
}

export async function updateReserva(id: number, reserva: Partial<Reserva>): Promise<Reserva> {
  const res = await fetch(`${NEXT_API_URL}/api/reservas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva),
  })
  if (!res.ok) throw new Error("Error updating reserva")
  return res.json()
}

export async function deleteReserva(id: number): Promise<void> {
  const res = await fetch(`${NEXT_API_URL}/api/reservas/${id}`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error deleting reserva")
}

// ...

export async function getReservasPersona(personaId: number): Promise<Reserva[]> {
  try {
    return await fetchAPI<Reserva[]>(`/reservas/persona/${personaId}`)
  } catch (error) {
    console.error("Error fetching persona reservas:", error)
    return []
  }
}

// === AUTH PERSONA ===
export async function loginPersona(credentials: { email: string; password: string }) {
  // Use local Next.js API route instead of Java backend
  const res = await fetch(`/api/auth/persona/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })
  if (!res.ok) throw new Error("Credenciales inválidas")
  return res.json()
}

export async function registerPersona(persona: any) {
  // Use local Next.js API route instead of Java backend
  const res = await fetch(`/api/auth/persona/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(persona),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(err || "Error registrando persona")
  }
  return res.json()
}

// === FOOTER ===
export async function getFooterData() {
  try {
    const res = await fetch(`${NEXT_API_URL}/api/footer`, { cache: 'no-store' });
    if (!res.ok) return []
    return res.json()
  } catch (e) {
    return []
  }
}

export async function updateFooterData(key: string, value: string) {
  const res = await fetch(`${NEXT_API_URL}/api/footer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keyName: key, value }),
  })
  if (!res.ok) throw new Error("Error actualizando footer")
  return res.json()
}
