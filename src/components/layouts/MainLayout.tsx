import { SidebarProvider } from "@/components/ui/sidebar";
import UISidebar from "./Sidebar";
import Navbar from "@/components/layouts/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-screen">
                <UISidebar />
                <div className="flex flex-col overflow-auto flex-1">
                    <Navbar />
                    <main className="flex-1 overflow-auto w-full">
                        <div className="">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
