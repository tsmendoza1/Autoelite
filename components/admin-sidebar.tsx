"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Car, Users, Calendar, LayoutDashboard, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Clientes",
    href: "/admin/clientes",
    icon: Users,
  },
  {
    name: "Autos",
    href: "/admin/autos",
    icon: Car,
  },
  {
    name: "Reservas",
    href: "/admin/reservas",
    icon: Calendar,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <aside
      className="hidden md:flex md:flex-col md:w-64 bg-sidebar border-r"
      role="navigation"
      aria-label="Navegación del panel de administración"
    >
      <div className="flex items-center h-16 px-6 border-b">
        <Car className="w-6 h-6 text-sidebar-primary" aria-hidden="true" />
        <span className="ml-2 text-lg font-bold text-sidebar-foreground">AutoPremier</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2" aria-label="Menú principal del administrador">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href))
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-2",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-6 border-t">
        <Button
          type="button"
          variant="outline"
          className="w-full bg-transparent"
          size="sm"
          onClick={() => {
            localStorage.removeItem("adminUser")
            router.push("/")
            router.refresh()
          }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Volver al Sitio
        </Button>
      </div>
    </aside>
  )
}
