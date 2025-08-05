import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logoPicture from "@/assets/icons4.jpeg";


export default function Navbar() {
    return (
        <header className="flex h-14 items-center justify-between border-b bg-white px-6 dark:bg-gray-800 w-auto overflow-hidden">
            <div className="flex items-center lg:hidden pr-2">
                <SidebarTrigger className="inline-flex justify-center items-center "/>
            </div>
            <div className="flex items-center gap-0 md:gap-6 md:ml-auto">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[300px]" />
                </div>
                <Button variant="outline" size="icon">
                    <Bell className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-">
                            <div className="h-8 w-8 rounded-full bg-gray-200">
                                <img src={logoPicture} alt="Admin" className="h-8 w-8 rounded-full object-cover" />
                            </div>
                            <span className="hidden md:inline">Admin User</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-2" align="end">
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>

    )
}