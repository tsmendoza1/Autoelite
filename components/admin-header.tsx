"use client"

import { Menu, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AdminHeaderProps {
  title: string
  description?: string
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <header className="border-b bg-background" role="banner">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menú de navegación">
            <Menu className="w-5 h-5" aria-hidden="true" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" aria-label="Notificaciones">
            <Bell className="w-5 h-5" aria-hidden="true" />
            <Badge
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              aria-label="3 notificaciones no leídas"
            >
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  )
}
