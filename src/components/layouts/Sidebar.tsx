
import { cn } from '@/lib/utils';
import { useLocation, Link } from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarFooter
} from '@/components/ui/sidebar';
import { HelpCircle, LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

const menuItems = [
    {
        title: "Users",
        items: [
            { title: "Explorers", url: "/explorers" },
            { title: "Coaches", url: "/coaches" },
            { title: "Organisations", url: "/organisations" },
        ]
    },
    {
        title: "Approvals",
        items: [
            { title: "Coaches Profiles", url: "/coaches-profiles" },
            { title: "Organisations Profiles", url: "/organisations-profiles" },
            { title: "Google Map Listings", url: "/map-listings" },
            { title: "Forms Data", url: "/forms-data" },
        ]
    },
    {
        title: "Products",
        items: [
            { title: "Assessments", url: "/assessments" },
            { title: "Sessions", url: "/sessions" },
            { title: "Sessions Pool", url: "/sessions-pool" },
            { title: "Masterclasses", url: "/masterclasses" },
            { title: "Learning", url: "/learning" },
            { title: "Access Code", url: "/access-code" },
        ]
    },
    {
        title: "CMS",
        items: [
            { title: "Insights", url: "/insights" },
            { title: "Videos Library", url: "/videos" },
            { title: "In the News", url: "/news" },
            { title: "Testimonials", url: "/testimonials" },
            { title: "Libraries", url: "/libraries" },
            { title: "Online Surveys", url: "/surveys" },
            { title: "Help Articles", url: "/help" },
            { title: "FAQs", url: "/faqs" },
            { title: "Team Members", url: "/team" },
        ]
    },
    {
        title: "Business Enquiries",
        items: [
            { title: "Callback", url: "/callback" },
            { title: "Chat Requests", url: "/chat-requests" },
            { title: "Career Enquiries", url: "/career-enquiries" },
            { title: "CareerLabs", url: "/careerlabs" },
            { title: "Partners", url: "/partners" },
        ]
    },
    {
        title: "User Reports",
        items: [
            { title: "Reviews", url: "/reviews" },
            { title: "Feedbacks", url: "/feedbacks" },
            { title: "❗ Problems", url: "/problems" },
            { title: "🐞 Bugs", url: "/bugs" },
            { title: "🚩 Abuses", url: "/abuses" },
        ]
    },
    {
        title: "Push Notifications",
        items: [
            { title: "Web / App", url: "/notifications-web" },
            { title: "WhatsApp", url: "/notifications-whatsapp" },
            { title: "Email", url: "/notifications-email" },
        ]
    }
];

export default function UISidebar() {
    const location = useLocation();

    return (
        <Sidebar>
            <SidebarHeader className="flex space-y-15 items-center px-6">
                <div className="text-lg font-semibold flex flex-col items-center gap-4 p-6">
                    <img src={logo} alt="logo" className="h-20 w-20" />
                    <div className="font-medium text-4xl">Aimshala Admin</div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-2 py-4 space-y-5">
                {menuItems.map((section) => (
                    <SidebarGroup key={section.title}>
                        <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2">
                            {section.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => {
                                    const isActive = location.pathname === item.url ||
                                        (item.url === "/insights" && location.pathname === "/");

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton
                                                asChild
                                                className={cn(
                                                    "w-full justify-start",
                                                    isActive && "bg-blue-50 text-blue-600 font-medium"
                                                )}
                                            >
                                                <Link to={item.url}>
                                                    <span>{item.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarFooter className="border-t-1 p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <HelpCircle />
                            <span>Help & Support</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
