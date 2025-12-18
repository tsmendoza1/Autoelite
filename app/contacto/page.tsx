"use client"

import type React from "react"

import { useState } from "react"
import { PublicHeader } from "@/components/public-header"
import { PublicFooter } from "@/components/public-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactoPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Mensaje enviado",
      description: "Gracias por contactarnos. Te responderemos pronto.",
    })

    setFormData({ nombre: "", email: "", telefono: "", mensaje: "" })
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12" aria-labelledby="contact-heading">
          <div className="container px-4 mx-auto text-center">
            <h1 id="contact-heading" className="text-4xl font-bold tracking-tight text-balance">
              Contáctanos
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90 leading-relaxed">
              Estamos aquí para ayudarte con cualquier pregunta
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                    <CardDescription>Puedes contactarnos por cualquiera de estos medios</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0" aria-hidden="true">
                        <Phone className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Teléfono</p>
                        <a
                          href="tel:+34900123456"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                          aria-label="Llamar al +34 900 123 456"
                        >
                          +34 900 123 456
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0" aria-hidden="true">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Email</p>
                        <a
                          href="mailto:info@autopremier.com"
                          className="text-sm text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                          aria-label="Enviar correo a info@autopremier.com"
                        >
                          info@autopremier.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0" aria-hidden="true">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Dirección</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Calle Principal 123
                          <br />
                          28001 Madrid, España
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0" aria-hidden="true">
                        <Clock className="w-4 h-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Horario</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Lunes a Viernes: 9:00 - 20:00
                          <br />
                          Sábados: 10:00 - 14:00
                          <br />
                          Domingos: Cerrado
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Envíanos un Mensaje</CardTitle>
                    <CardDescription>
                      Completa el formulario y nos pondremos en contacto contigo lo antes posible
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nombre">
                            Nombre completo{" "}
                            <span className="text-destructive" aria-label="requerido">
                              *
                            </span>
                          </Label>
                          <Input
                            id="nombre"
                            required
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="Juan Pérez"
                            aria-required="true"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="telefono">
                            Teléfono{" "}
                            <span className="text-destructive" aria-label="requerido">
                              *
                            </span>
                          </Label>
                          <Input
                            id="telefono"
                            type="tel"
                            required
                            value={formData.telefono}
                            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                            placeholder="+34 600 123 456"
                            aria-required="true"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email{" "}
                          <span className="text-destructive" aria-label="requerido">
                            *
                          </span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="tu@email.com"
                          aria-required="true"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mensaje">
                          Mensaje{" "}
                          <span className="text-destructive" aria-label="requerido">
                            *
                          </span>
                        </Label>
                        <Textarea
                          id="mensaje"
                          required
                          value={formData.mensaje}
                          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                          placeholder="Cuéntanos en qué podemos ayudarte..."
                          className="min-h-32"
                          aria-required="true"
                        />
                      </div>

                      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
                        {loading ? "Enviando..." : "Enviar Mensaje"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  )
}
