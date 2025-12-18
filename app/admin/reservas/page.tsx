"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { Plus, Pencil, Trash2, Search, CalendarIcon } from "lucide-react"
import type { Reserva, Cliente, Auto } from "@/lib/types"
import { getReservas, createReserva, updateReserva, deleteReserva, getClientes, getAutos } from "@/lib/api"

export default function ReservasPage() {
  const { toast } = useToast()
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [filteredReservas, setFilteredReservas] = useState<Reserva[]>([])
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [autos, setAutos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editingReserva, setEditingReserva] = useState<Reserva | null>(null)
  const [deletingReserva, setDeletingReserva] = useState<Reserva | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [formData, setFormData] = useState({
    clienteId: 0,
    autoId: 0,
    fechaReserva: new Date().toISOString().split("T")[0],
    fechaInicio: new Date().toISOString().split("T")[0],
    fechaFin: new Date().toISOString().split("T")[0],
    estado: "Pendiente" as Reserva["estado"],
    comentarios: "",
    montoTotal: 0,
  })

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = reservas.filter(
        (reserva) =>
          reserva.cliente?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reserva.cliente?.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reserva.auto?.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reserva.auto?.modelo.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredReservas(filtered)
    } else {
      setFilteredReservas(reservas)
    }
  }, [searchTerm, reservas])

  const fetchData = async () => {
    try {
      const [reservasData, clientesData, autosData] = await Promise.all([getReservas(), getClientes(), getAutos()])
      setReservas(reservasData)
      setFilteredReservas(reservasData)
      setClientes(clientesData)
      setAutos(autosData)
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los datos",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (reserva?: Reserva) => {
    if (reserva) {
      setEditingReserva(reserva)
      setFormData({
        clienteId: reserva.clienteId,
        autoId: reserva.autoId,
        fechaReserva: reserva.fechaReserva,
        fechaInicio: reserva.fechaInicio,
        fechaFin: reserva.fechaFin,
        estado: reserva.estado,
        comentarios: reserva.comentarios,
        montoTotal: reserva.montoTotal,
      })
    } else {
      setEditingReserva(null)
      setFormData({
        clienteId: 0,
        autoId: 0,
        fechaReserva: new Date().toISOString().split("T")[0],
        fechaInicio: new Date().toISOString().split("T")[0],
        fechaFin: new Date().toISOString().split("T")[0],
        estado: "Pendiente",
        comentarios: "",
        montoTotal: 0,
      })
    }
    setDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingReserva) {
        await updateReserva(editingReserva.id, formData)
        toast({
          title: "Reserva actualizada",
          description: "La reserva se ha actualizado correctamente",
        })
      } else {
        await createReserva(formData)
        toast({
          title: "Reserva creada",
          description: "La reserva se ha registrado correctamente",
        })
      }
      setDialogOpen(false)
      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la reserva",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!deletingReserva) return

    try {
      await deleteReserva(deletingReserva.id)
      toast({
        title: "Reserva eliminada",
        description: "La reserva ha sido eliminada correctamente",
      })
      setDeleteDialogOpen(false)
      fetchData()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la reserva",
        variant: "destructive",
      })
    }
  }

  const getEstadoBadgeVariant = (estado: Reserva["estado"]) => {
    switch (estado) {
      case "Confirmada":
        return "default"
      case "Pendiente":
        return "secondary"
      case "Cancelada":
        return "destructive"
      case "Completada":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <>
      <AdminHeader title="Gestión de Reservas" description="Administra las reservas de vehículos" />
      <main className="flex-1 overflow-y-auto p-6" role="main">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Buscar por cliente o auto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label="Buscar reservas"
            />
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" aria-hidden="true" />
            Nueva Reserva
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Vehículo</TableHead>
                  <TableHead>Fecha Inicio</TableHead>
                  <TableHead>Fecha Fin</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservas.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No se encontraron reservas
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReservas.map((reserva) => (
                    <TableRow key={reserva.id}>
                      <TableCell className="font-medium">
                        {reserva.cliente?.nombre} {reserva.cliente?.apellido}
                      </TableCell>
                      <TableCell>
                        {reserva.auto?.marca} {reserva.auto?.modelo}
                      </TableCell>
                      <TableCell>{new Date(reserva.fechaInicio).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(reserva.fechaFin).toLocaleDateString()}</TableCell>
                      <TableCell>€{reserva.montoTotal.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={getEstadoBadgeVariant(reserva.estado)}>{reserva.estado}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(reserva)}
                            aria-label={`Editar reserva de ${reserva.cliente?.nombre}`}
                          >
                            <Pencil className="w-4 h-4" aria-hidden="true" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setDeletingReserva(reserva)
                              setDeleteDialogOpen(true)
                            }}
                            aria-label={`Eliminar reserva de ${reserva.cliente?.nombre}`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Create/Edit Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-xl" aria-describedby="reserva-dialog-description">
            <DialogHeader>
              <DialogTitle>
                <CalendarIcon className="w-5 h-5 inline mr-2" aria-hidden="true" />
                {editingReserva ? "Editar Reserva" : "Nueva Reserva"}
              </DialogTitle>
              <DialogDescription id="reserva-dialog-description">
                {editingReserva
                  ? "Actualiza la información de la reserva"
                  : "Completa los datos para crear una nueva reserva"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clienteId">Cliente *</Label>
                  <Select
                    value={formData.clienteId.toString()}
                    onValueChange={(value) => setFormData({ ...formData, clienteId: Number(value) })}
                  >
                    <SelectTrigger id="clienteId">
                      <SelectValue placeholder="Selecciona un cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientes.map((cliente) => (
                        <SelectItem key={cliente.id} value={cliente.id.toString()}>
                          {cliente.nombre} {cliente.apellido}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoId">Vehículo *</Label>
                  <Select
                    value={formData.autoId.toString()}
                    onValueChange={(value) => {
                      const selectedAuto = autos.find((a) => a.id === Number(value))
                      setFormData({
                        ...formData,
                        autoId: Number(value),
                        montoTotal: selectedAuto?.precio || 0,
                      })
                    }}
                  >
                    <SelectTrigger id="autoId">
                      <SelectValue placeholder="Selecciona un vehículo" />
                    </SelectTrigger>
                    <SelectContent>
                      {autos
                        .filter((auto) => auto.disponible)
                        .map((auto) => (
                          <SelectItem key={auto.id} value={auto.id.toString()}>
                            {auto.marca} {auto.modelo} - €{auto.precio.toLocaleString()}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaReserva">Fecha Reserva *</Label>
                  <Input
                    id="fechaReserva"
                    type="date"
                    required
                    value={formData.fechaReserva}
                    onChange={(e) => setFormData({ ...formData, fechaReserva: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaInicio">Fecha Inicio *</Label>
                  <Input
                    id="fechaInicio"
                    type="date"
                    required
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fechaFin">Fecha Fin *</Label>
                  <Input
                    id="fechaFin"
                    type="date"
                    required
                    value={formData.fechaFin}
                    onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado *</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(value) => setFormData({ ...formData, estado: value as Reserva["estado"] })}
                  >
                    <SelectTrigger id="estado">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Confirmada">Confirmada</SelectItem>
                      <SelectItem value="Cancelada">Cancelada</SelectItem>
                      <SelectItem value="Completada">Completada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="montoTotal">Monto Total (€) *</Label>
                  <Input
                    id="montoTotal"
                    type="number"
                    required
                    min="0"
                    value={formData.montoTotal}
                    onChange={(e) => setFormData({ ...formData, montoTotal: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentarios">Comentarios</Label>
                <Textarea
                  id="comentarios"
                  value={formData.comentarios}
                  onChange={(e) => setFormData({ ...formData, comentarios: e.target.value })}
                  placeholder="Notas adicionales sobre la reserva..."
                  className="min-h-20"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingReserva ? "Actualizar" : "Crear"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent aria-describedby="delete-reserva-dialog-description">
            <DialogHeader>
              <DialogTitle>Confirmar Eliminación</DialogTitle>
              <DialogDescription id="delete-reserva-dialog-description">
                ¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </>
  )
}
