import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { HelpCircle, LogOut } from "lucide-react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png"


const SidebarItems = [
    {
        title: "Explorers",
        url: "/explorers",
        isSingleLink: true,
        isActive: true
    },
    {
        title: "Coaches",
        url: "/coaches",
        isSingleLink: true,
        isActive: true
    },
    {
        title: "Organisations",
        url: "/organisations",
        isSingleLink: true,
        isActive: true
    },
    {
        title: "Approvals",
        url: "/approvals",
        isSingleLink: true,
        isActive: true
    },
    {
        title: "Products",
        items: [
            { content: "Assessments", url: "/assessments" },
            { content: "Sessions", url: "/sessions" },
            { content: "Sessions Pool", url: "/sessions-pool" },
            // { content: "Masterclasses", url: "/masterclasses" },
            // { content: "Learning", url: "/learning" },
        ],
        isActive: true,
    },
    {
        title: "Access Code",
        url: "/access-code",
        isSingleLink: false,
        isActive: false
    },
    {
        title: "CMS",
        items: [
            { content: "Insights", url: "/insights" },
            { content: "Videos Library", url: "/videoLibrary" },
            { content: "In the News", url: "/inTheNews" },
            { content: "Testimonials", url: "/testimonials" },
            { content: "Libraries", url: "/libraries" },
            { content: "Online Surveys", url: "/surveys" },
            { content: "Help Articles", url: "/helpArticles" },
            { content: "FAQs", url: "/faqspages" },
            { content: "Team Members", url: "/teamDirectory" },
        ],
        isActive: true,
    },
    {
        title: "Enquiries",
        items: [
            { content: "Callback", url: "/callback" },
            { content: "Chat Requests", url: "/chat-requests" },
            { content: "Career Enquiries", url: "/career-enquiries" },
            { content: "CareerLabs", url: "/careerlabs" },
            { content: "Partners", url: "/partners" },
        ],
        isActive: false,
    },
    {
        title: "User Reports",
        items: [
            { content: "Reviews", url: "/reviews" },
            { content: "Feedbacks", url: "/feedbacks" },
            { content: "Problems", url: "/problems" },
            { content: "Bugs", url: "/bugs" },
            { content: "Abuses", url: "/abuses" },
        ],
        isActive: true,
    },
    {
        title: "Finance",
        items: [
            { content: "Payments", url: "/financePayments" },
            { content: "Payout", url: "/financePayouts" },
            { content: "Commissions", url: "/financeCommissions" },
        
        ],
        isActive: true,
    },
    {
        title: "Notifications",
        items: [
            { content: "Web / App", url: "/notifications-web" },
            { content: "WhatsApp", url: "/notifications-whatsapp" },
            { content: "Email", url: "/notifications-email" },
        ],
        isActive: false,
    }
];

export default function UISidebar() {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const handleSectionToggle = (section: string) => {
        setOpenSection(prev => prev === section ? null : section);
    };

    return (
        <div className="">
            <Sidebar >
                <SidebarHeader className="flex space-y-10 items-center px-7 ">
                    <div className="text-lg font-semibold flex flex-col items-center gap-4 p-1">
                        <img src={logo} alt="logo" className="h-20 w-auto" />
                        <div className="font-bold text-xl text-[#231f20ad]">Admin Desk</div>
                    </div>
                </SidebarHeader>

                <SidebarContent className="mt-4">
                    {SidebarItems.map((x) => (
                        <SidebarMenu key={x.title}>
                            {x.isSingleLink ? (
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link to={x.url} className="block py-2 hover:bg-gray-100 rounded-md px-2">
                                            <span className="ml-4">{x.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ) : (
                                <Collapsible
                                    open={openSection === x.title}
                                    onOpenChange={() => handleSectionToggle(x.title)}
                                    className={`group/collapsible ${!x.isActive ? 'opacity-50 pointer-events-none' : ''}`}
                                >
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <CollapsibleTrigger className="w-full">
                                                <div className="flex items-center justify-between w-full ml-4">
                                                    <span>{x.title}</span>
                                                    <ChevronDown className="mr-2 h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                </div>
                                            </CollapsibleTrigger>
                                        </SidebarMenuButton>
                                        <CollapsibleContent>
                                            <div className="pl-6">
                                                {x.items?.map((item) => (
                                                    <SidebarMenuItem key={item.content}>
                                                        <SidebarMenuButton asChild>
                                                            <Link to={item.url} className="block py-2 hover:bg-gray-100 rounded-md px-2">
                                                                {item.content}
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </div>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            )}
                        </SidebarMenu>
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
                            <Link to={"/"}>
                                <SidebarMenuButton>
                                    <LogOut />
                                    <span>Logout</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </div>
    );
}