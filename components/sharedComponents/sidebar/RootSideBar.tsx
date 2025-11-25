"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/useAuth"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,

  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { LayoutDashboard, FileText, Package, Truck, LogOut, Plus } from "lucide-react"

export function RootSideBar() {
  const pathname = usePathname()
  const route = useRouter()
  const { logout } = useAuth()

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/articles", label: "Articles", icon: FileText },
    { href: "/category", label: "Catégories", icon: Package },
    { href: "/fournisseurs", label: "Fournisseurs", icon: Truck },

  ]

    const Ajouter = () => {

    route.push("/register");
  };


  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-bold px-4 py-2">LMT Stock</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>

          <SidebarMenu>
            {links.map(({ href, label, icon: Icon }) => {
              const active = pathname === href

              return (
                <SidebarMenuItem key={href}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={href}
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                        ${active
                          ? "bg-blue-600 text-white"
                          : "text-foreground hover:bg-white/10 hover:text-white"}
                      `}
                    >
                      <Icon
                        className={`h-4 w-4 ${active ? "text-white" : "text-muted-foreground"}`}
                      />
                      {label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex flex-col gap-2 py-2">
          <button
            onClick={Ajouter}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-green-500 hover:bg-green-500/10 rounded-lg transition"
          >
            <Plus className="h-4 w-4" />
            Ajouter un utilisateur
          </button>
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition"
          >
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </button>

        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
