"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { LayoutDashboard, FileText, Package, Truck } from "lucide-react"

export function RootSideBar() {
  const pathname = usePathname()

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/articles", label: "Articles", icon: FileText },
    { href: "/category", label: "Catégories", icon: Package },
    { href: "/fournisseurs", label: "Fournisseurs", icon: Truck },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-bold px-4 py-2">Menu</h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

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
                        className={`h-4 w-4 ${
                          active ? "text-white" : "text-muted-foreground"
                        }`}
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
        <p className="text-sm text-center text-muted-foreground py-2">
          © 2025 — App
        </p>
      </SidebarFooter>
    </Sidebar>
  )
}
