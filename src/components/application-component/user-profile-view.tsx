// import { useState } from "react"
// import {
//     ArrowLeft, User, Mail, Phone, Calendar, Clock, Globe, Link2, FileText, MessageSquare, Bell, Building, Flag, Send,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Textarea } from "@/components/ui/textarea"
// import type { User as DashboardUser } from "@/components/dashboard-page"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { ChevronDown } from "lucide-react"
// import picture1 from "@/assets/icon1.png"
// import picture2 from "@/assets/icon2.png"
// import picture3 from "@/assets/icons3.png"
// import picture4 from "@/assets/icons4.jpeg"
// import { NavLink } from "react-router-dom"


// interface UserProfileViewProps {
//     user: DashboardUser
//     onClose: () => void
// }

// export function UserProfileView({ user, onClose }: UserProfileViewProps) {
//     const [activeTab, setActiveTab] = useState("basic-info");

//     return (
//         <div className="container mx-auto py-6">
//             <div className="mb-6 flex items-center gap-4">
//                 <NavLink to="/">
//                     <Button variant="ghost" size="icon" onClick={onClose}>
//                         <ArrowLeft className="h-5 w-5" />
//                     </Button>
//                 </NavLink>
//                 <h1 className="text-2xl font-bold">Explorer Profile</h1>
//                 <div className="ml-auto flex gap-2">
//                     <Button variant="outline">
//                         <Bell className="mr-2 h-4 w-4" />
//                         Send Notification
//                     </Button>
//                     <Button variant="outline">
//                         <MessageSquare className="mr-2 h-4 w-4" />
//                         Start Chat
//                     </Button>
//                     <Button variant="outline">
//                         <Flag className="mr-2 h-4 w-4" />
//                         Flag User
//                     </Button>
//                     <Button>
//                         <Send className="mr-2 h-4 w-4" />
//                         Resend ACE Test Invite
//                     </Button>
//                 </div>
//             </div>

//             <div className="grid gap-6 md:grid-cols-4">
//                 <Card className="md:col-span-1">
//                     <CardContent className="p-6">
//                         <div className="flex flex-col items-center">
//                             <div className="mb-4 h-24 w-24 overflow-hidden rounded-full">
//                                 <img src={user.photo || picture4} alt={user.name} className="h-full w-full object-cover" />
//                             </div>
//                             <h2 className="text-xl font-bold">{user.name}</h2>
//                             <p className="text-sm text-gray-500">{user.gender}</p>

//                             <Separator className="my-4" />

//                             <div className="w-full space-y-4">
//                                 <div className="flex items-start gap-3">
//                                     <Mail className="mt-0.5 h-4 w-4 text-gray-500" />
//                                     <div>
//                                         <p className="text-sm font-medium">Email</p>
//                                         <p className="text-sm text-gray-500">{user.email}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Phone className="mt-0.5 h-4 w-4 text-gray-500" />
//                                     <div>
//                                         <p className="text-sm font-medium">Phone</p>
//                                         <p className="text-sm text-gray-500">{user.phone}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <User className="mt-0.5 h-4 w-4 text-gray-500" />
//                                     <div>
//                                         <p className="text-sm font-medium">User Type</p>
//                                         <p className="text-sm text-gray-500">{user.userType}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Calendar className="mt-0.5 h-4 w-4 text-gray-500" />
//                                     <div>
//                                         <p className="text-sm font-medium">Joined On</p>
//                                         <p className="text-sm text-gray-500">{user.joinDate}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Clock className="mt-0.5 h-4 w-4 text-gray-500" />
//                                     <div>
//                                         <p className="text-sm font-medium">Last Login</p>
//                                         <p className="text-sm text-gray-500">{user.lastLogin}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Globe className="mt-0.5 h-4 w-4 text-gray-500" />
//                                     <div>
//                                         <p className="text-sm font-medium">Source</p>
//                                         <p className="text-sm text-gray-500">{user.source}</p>
//                                     </div>
//                                 </div>

//                                 <div className="flex items-start gap-3">
//                                     <Link2 className="mt-0.5 h-4 w-4 text-gray-500" />
//                                     <div>
//                                         <p className="text-sm font-medium">Public Profile</p>
//                                         <a href="#" className="text-sm text-blue-500 hover:underline">
//                                             View Profile
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 <div className="md:col-span-3">
//                     <Tabs value={activeTab} onValueChange={setActiveTab}>
//                         <TabsList className="grid w-full grid-cols-4">
//                             <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
//                             <TabsTrigger value="activity">Activity</TabsTrigger>
//                             <TabsTrigger value="interactions">Interactions</TabsTrigger>
//                             <TabsTrigger value="assigned-team">Assigned Team</TabsTrigger>
//                         </TabsList>

//                         <TabsContent value="basic-info" className="mt-6">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Personal Information</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="grid gap-6 md:grid-cols-2">
//                                         <div>
//                                             <h3 className="mb-4 text-lg font-medium">Demographics</h3>
//                                             <div className="space-y-4">
//                                                 <div>
//                                                     <p className="text-sm font-medium text-gray-500">Age</p>
//                                                     <p>{user.age || "Not specified"}</p>
//                                                 </div>
//                                                 <div>
//                                                     <p className="text-sm font-medium text-gray-500">Class/Grade</p>
//                                                     <p>{user.class || "Not specified"}</p>
//                                                 </div>
//                                                 <div>
//                                                     <p className="text-sm font-medium text-gray-500">School/College</p>
//                                                     <p>{user.school || "Not specified"}</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div>
//                                             <h3 className="mb-4 text-lg font-medium">Account Status</h3>
//                                             <div className="space-y-4">
//                                                 <div>
//                                                     <p className="text-sm font-medium text-gray-500">Profile Stage</p>
//                                                     <p>{user.profileStage}</p>
//                                                 </div>
//                                                 <div>
//                                                     <p className="text-sm font-medium text-gray-500">Status</p>
//                                                     <p>{user.status}</p>
//                                                 </div>
//                                                 <div>
//                                                     <p className="text-sm font-medium text-gray-500">Registration Date</p>
//                                                     <p>{user.joinDate}</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         <TabsContent value="activity" className="mt-6 space-y-6">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Assessment Reports</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">ACE Test</h4>
//                                                     <p className="text-sm text-gray-500">Completed on May 16, 2023</p>
//                                                 </div>
//                                                 <Button variant="outline" size="sm">
//                                                     <FileText className="mr-2 h-4 w-4" />
//                                                     View Report
//                                                 </Button>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">Career Assessment</h4>
//                                                     <p className="text-sm text-gray-500">In Progress</p>
//                                                 </div>
//                                                 <Button variant="outline" size="sm" disabled>
//                                                     <FileText className="mr-2 h-4 w-4" />
//                                                     Not Available
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Session History</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">Career Guidance Session</h4>
//                                                     <p className="text-sm text-gray-500">Completed on May 15, 2023</p>
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <Button variant="outline" size="sm">
//                                                         <FileText className="mr-2 h-4 w-4" />
//                                                         View Feedback
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">Follow-up Session</h4>
//                                                     <p className="text-sm text-gray-500">Scheduled for May 25, 2023</p>
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <Button variant="outline" size="sm">
//                                                         <Calendar className="mr-2 h-4 w-4" />
//                                                         Reschedule
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-md border p-4 bg-red-50">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">Academic Planning Session</h4>
//                                                     <p className="text-sm text-red-500">Missed on May 10, 2023</p>
//                                                 </div>
//                                                 <div className="flex items-center gap-2">
//                                                     <Button variant="outline" size="sm">
//                                                         <Calendar className="mr-2 h-4 w-4" />
//                                                         Reschedule
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Notifications Sent</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">Session Reminder</h4>
//                                                     <p className="text-sm text-gray-500">Sent via Email on May 14, 2023</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">ACE Test Invitation</h4>
//                                                     <p className="text-sm text-gray-500">Sent via WhatsApp on May 12, 2023</p>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center justify-between">
//                                                 <div>
//                                                     <h4 className="font-medium">Welcome Message</h4>
//                                                     <p className="text-sm text-gray-500">Sent via SMS on May 10, 2023</p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         <TabsContent value="interactions" className="mt-6 space-y-6">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Interacted Mentors/Consultants</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="h-10 w-10 rounded-full bg-gray-200">
//                                                     <img
//                                                         src={picture1}
//                                                         alt="Mentor"
//                                                         className="h-full w-full rounded-full object-cover"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <h4 className="font-medium">Dr. Anjali Mehta</h4>
//                                                     <p className="text-sm text-gray-500">Career Counselor</p>
//                                                 </div>
//                                                 <div className="ml-auto">
//                                                     <Button variant="outline" size="sm">
//                                                         <MessageSquare className="mr-2 h-4 w-4" />
//                                                         Contact
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="h-10 w-10 rounded-full bg-gray-200">
//                                                     <img
//                                                         src={picture3}
//                                                         alt="Mentor"
//                                                         className="h-full w-full rounded-full object-cover"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <h4 className="font-medium">Rajesh Kumar</h4>
//                                                     <p className="text-sm text-gray-500">Academic Advisor</p>
//                                                 </div>
//                                                 <div className="ml-auto">
//                                                     <Button variant="outline" size="sm">
//                                                         <MessageSquare className="mr-2 h-4 w-4" />
//                                                         Contact
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             <Card>
//                                 <CardHeader className="flex flex-row items-center justify-between">
//                                     <CardTitle>Admin Notes & Comments</CardTitle>
//                                     <Button size="sm">Add Note</Button>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="rounded-md border p-4">
//                                             <div className="mb-2 flex items-center justify-between">
//                                                 <h4 className="font-medium">Follow-up Required</h4>
//                                                 <p className="text-xs text-gray-500">Added by Admin on May 17, 2023</p>
//                                             </div>
//                                             <p className="text-sm text-gray-700">
//                                                 Student showed interest in engineering programs. Needs detailed guidance on entrance exam
//                                                 preparation.
//                                             </p>
//                                         </div>

//                                         <div className="rounded-md border p-4">
//                                             <div className="mb-2 flex items-center justify-between">
//                                                 <h4 className="font-medium">Parent Consultation</h4>
//                                                 <p className="text-xs text-gray-500">Added by Admin on May 15, 2023</p>
//                                             </div>
//                                             <p className="text-sm text-gray-700">
//                                                 Parents requested a joint session to discuss career options. Schedule for next week.
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="mt-6">
//                                         <h4 className="mb-2 font-medium">Add New Comment</h4>
//                                         <Textarea placeholder="Type your comment here..." className="mb-2" />
//                                         <Button size="sm">Submit</Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Reports & Flags</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4">
//                                         <div className="mb-2 flex items-center justify-between">
//                                             <h4 className="font-medium text-yellow-800">Missed Multiple Sessions</h4>
//                                             <p className="text-xs text-yellow-800">Flagged on May 12, 2023</p>
//                                         </div>
//                                         <p className="text-sm text-yellow-800">
//                                             Student has missed 2 sessions in the last month. Requires follow-up to understand reasons.
//                                         </p>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>

//                         <TabsContent value="assigned-team" className="mt-6">
//                             <Card>
//                                 <CardHeader>
//                                     <CardTitle>Assigned Team Members</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="space-y-4">
//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="h-10 w-10 rounded-full bg-gray-200">
//                                                     <img
//                                                         src={picture3}
//                                                         alt="Team Member"
//                                                         className="h-full w-full rounded-full object-cover"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <h4 className="font-medium">Neha Verma</h4>
//                                                     <p className="text-sm text-gray-500">Primary Consultant</p>
//                                                 </div>
//                                                 <div className="ml-auto">
//                                                     <Button variant="outline" size="sm">
//                                                         <MessageSquare className="mr-2 h-4 w-4" />
//                                                         Contact
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="rounded-md border p-4">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="h-10 w-10 rounded-full bg-gray-200">
//                                                     <img
//                                                         src={picture2}
//                                                         alt="Team Member"
//                                                         className="h-full w-full rounded-full object-cover"
//                                                     />
//                                                 </div>
//                                                 <div>
//                                                     <h4 className="font-medium">Suresh Patel</h4>
//                                                     <p className="text-sm text-gray-500">Academic Advisor</p>
//                                                 </div>
//                                                 <div className="ml-auto">
//                                                     <Button variant="outline" size="sm">
//                                                         <MessageSquare className="mr-2 h-4 w-4" />
//                                                         Contact
//                                                     </Button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             <Card className="mt-6">
//                                 <CardHeader>
//                                     <CardTitle>Linked Organization</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="rounded-md border p-4">
//                                         <div className="flex items-center gap-4">
//                                             <div className="h-12 w-12 rounded-md bg-gray-200">
//                                                 <img
//                                                     src="/placeholder.svg?height=48&width=48"
//                                                     alt="Organization"
//                                                     className="h-full w-full rounded-md object-cover"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <h4 className="font-medium">Delhi Public School</h4>
//                                                 <p className="text-sm text-gray-500">Educational Institution</p>
//                                                 <p className="text-xs text-gray-500">Delhi, India</p>
//                                             </div>
//                                             <div className="ml-auto">
//                                                 <Button variant="outline" size="sm">
//                                                     <Building className="mr-2 h-4 w-4" />
//                                                     View Details
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </CardContent>
//                             </Card>

//                             <Card className="mt-6">
//                                 <CardHeader className="flex flex-row items-center justify-between">
//                                     <CardTitle>Assign New Team Member</CardTitle>
//                                 </CardHeader>
//                                 <CardContent>
//                                     <div className="flex gap-4">
//                                         <div className="flex-1">
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild>
//                                                     <Button variant="outline" className="w-full justify-between">
//                                                         <span>Select Team Member</span>
//                                                         <ChevronDown className="h-4 w-4" />
//                                                     </Button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent className="w-[200px]">
//                                                     <DropdownMenuItem>Vikram Malhotra</DropdownMenuItem>
//                                                     <DropdownMenuItem>Priya Singh</DropdownMenuItem>
//                                                     <DropdownMenuItem>Rahul Kapoor</DropdownMenuItem>
//                                                     <DropdownMenuItem>Ananya Desai</DropdownMenuItem>
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </div>
//                                         <div className="flex-1">
//                                             <DropdownMenu>
//                                                 <DropdownMenuTrigger asChild>
//                                                     <Button variant="outline" className="w-full justify-between">
//                                                         <span>Select Role</span>
//                                                         <ChevronDown className="h-4 w-4" />
//                                                     </Button>
//                                                 </DropdownMenuTrigger>
//                                                 <DropdownMenuContent className="w-[200px]">
//                                                     <DropdownMenuItem>Primary Consultant</DropdownMenuItem>
//                                                     <DropdownMenuItem>Academic Advisor</DropdownMenuItem>
//                                                     <DropdownMenuItem>Career Counselor</DropdownMenuItem>
//                                                     <DropdownMenuItem>Subject Expert</DropdownMenuItem>
//                                                 </DropdownMenuContent>
//                                             </DropdownMenu>
//                                         </div>
//                                         <Button>Assign</Button>
//                                     </div>
//                                 </CardContent>
//                             </Card>
//                         </TabsContent>
//                     </Tabs>
//                 </div>
//             </div>
//         </div>
//     )
// }
