import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import UISidebar from "./Sidebar";

export default function MainLayout({children} : {children: React.ReactNode}) {
    return (
        <SidebarProvider>
            <UISidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}