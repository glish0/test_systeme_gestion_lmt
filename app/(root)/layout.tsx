import {RootSideBar} from "@/components/sharedComponents/sidebar/RootSideBar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full min-h-screen">
        
        <div className=" border-r">
          <RootSideBar />
        </div>

        <main className=" w-full p-6 ">
          {children}
        </main>

      </div>
    </SidebarProvider>
  )
}
