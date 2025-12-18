import { AdminHeader } from "@/components/admin-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Car, Calendar, TrendingUp } from "lucide-react"
import { getClientes, getAutos, getReservas } from "@/lib/api"

export default async function AdminDashboard() {
  const [clientes, autos, reservas] = await Promise.all([getClientes(), getAutos(), getReservas()])

  const autosDisponibles = autos.filter((auto) => auto.disponible).length
  const reservasPendientes = reservas.filter((r) => r.estado === "Pendiente").length
  const clientesActivos = clientes.filter((c) => c.activo).length

  return (
    <>
      <AdminHeader title="Dashboard" description="Vista general de tu concesionaria" />
      <main className="flex-1 overflow-y-auto p-6" role="main">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clientes.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{clientesActivos} activos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Autos</CardTitle>
              <Car className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{autos.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{autosDisponibles} disponibles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reservas</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reservas.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{reservasPendientes} pendientes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Ventas del Mes</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€450K</div>
              <p className="text-xs text-muted-foreground mt-1">+12% vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Últimas Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservas.slice(0, 5).map((reserva) => (
                  <div
                    key={reserva.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {reserva.cliente?.nombre} {reserva.cliente?.apellido}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {reserva.auto?.marca} {reserva.auto?.modelo}
                      </p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">€{reserva.montoTotal.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{reserva.estado}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Autos Más Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {autos.slice(0, 5).map((auto) => (
                  <div
                    key={auto.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        {auto.marca} {auto.modelo}
                      </p>
                      <p className="text-xs text-muted-foreground">{auto.anio}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-medium">€{auto.precio.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">{auto.disponible ? "Disponible" : "Vendido"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
