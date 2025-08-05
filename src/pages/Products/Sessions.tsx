import { useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    XCircle,
    Clock,
    PlayCircle,
    HelpCircle,
    IndianRupee,
    Video,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Bell,
    Download,
    Eye,
    Flag,
    MessageSquare,
    X,
    ChevronLeft,
    ChevronRight,
    Filter
} from "lucide-react";
import { UpcomingSessionsTable } from "@/Data";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";

const stats = [
    {
        title: "Total Sessions Booked",
        value: "5,248",
        icon: CalendarDays,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        title: "Completed Sessions",
        value: "3,780",
        icon: CheckCircle2,
        color: "text-green-500",
        bgColor: "bg-green-100",
    },
    {
        title: "Missed / No-Show",
        value: "341",
        icon: XCircle,
        color: "text-red-500",
        bgColor: "bg-red-100",
    },
    {
        title: "Upcoming Sessions",
        value: "446",
        icon: Clock,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
    },
    {
        title: "Live Sessions",
        value: "12",
        icon: PlayCircle,
        color: "text-indigo-500",
        bgColor: "bg-indigo-100",
    },
    {
        title: "Session Recordings Available",
        value: "298",
        icon: Video,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
    },
    {
        title: "Refund Requests",
        value: "27",
        icon: HelpCircle,
        color: "text-orange-500",
        bgColor: "bg-orange-100",
    },
    {
        title: "Refunds Processed",
        value: "₹42,500",
        icon: IndianRupee,
        color: "text-emerald-600",
        bgColor: "bg-emerald-100",
    },
];

export default function Sessions() {
    const [filtersOpen, setFiltersOpen] = useState(false);
    return (
        <div className="p-6">
            <h1 className="font-semibold px-2 text-2xl">Sessions – Admin Desk</h1>
            <SessionCards />
            <div className="mt-6 flex justify-end gap-2">
                <Button>Create Manual Session</Button>
                <Button>Find Coach</Button>
                <Button>Export Sessions</Button>
                <Button>Refund Requests</Button>
                <Button>Live Sessions</Button>
                <Button>Access Recording</Button>
            </div>
            {filtersOpen && <SessionFilter />}
                <div className="flex justify-end mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="h-4 w-4" />
                        {filtersOpen ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>
            {/* Tabs with tables */}
            <SessionTables />
        </div>
    );
}

function SessionCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2 py-1">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex items-center justify-start">
                        <div className={`${stat.bgColor} rounded-full p-2`}>
                            <stat.icon className={`h-10 w-10 ${stat.color}`} />
                        </div>
                        <div className="flex flex-col  ml-2 ">
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <div className="text-md font-medium">{stat.title}</div>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}

function SessionFilter() {
    return (
        <div className="p-4">
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg">Session Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Name / Email / Phone
                            </label>
                            <Input
                                placeholder="Search by name, email or phone"
                                className="mt-2"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Session Type</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="approved" />
                                    <label htmlFor="approved" className="text-sm">
                                        Approved
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pending" />
                                    <label htmlFor="pending" className="text-sm">
                                        Pending
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="blocked" />
                                    <label htmlFor="blocked" className="text-sm">
                                        Blocked
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Specialization</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="career" />
                                    <label htmlFor="career" className="text-sm">
                                        Career
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="psychology" />
                                    <label htmlFor="psychology" className="text-sm">
                                        Psychology
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="STEM" />
                                    <label htmlFor="STEM" className="text-sm">
                                        STEM
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="Design" />
                                    <label htmlFor="Design" className="text-sm">
                                        Design
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="law" />
                                    <label htmlFor="law" className="text-sm">
                                        Law
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Session Type</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="1:1" />
                                    <label htmlFor="1:1" className="text-sm">
                                        1:1
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="group" />
                                    <label htmlFor="group" className="text-sm">
                                        Group
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="instant" />
                                    <label htmlFor="instant" className="text-sm">
                                        Instant
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="b2b" />
                                    <label htmlFor="b2b" className="text-sm">
                                        B2B
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Session Type</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="1:1" />
                                    <label htmlFor="1:1" className="text-sm">
                                        Yes
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="b2b" />
                                    <label htmlFor="b2b" className="text-sm">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">State / City</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between mt-2"
                                    >
                                        <span>Select location</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[200px]">
                                    <DropdownMenuItem>Delhi</DropdownMenuItem>
                                    <DropdownMenuItem>Mumbai</DropdownMenuItem>
                                    <DropdownMenuItem>Bangalore</DropdownMenuItem>
                                    <DropdownMenuItem>Chennai</DropdownMenuItem>
                                    <DropdownMenuItem>Hyderabad</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Last Active</label>
                            <div className="">
                                <DatePickerWithRange />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-2 ">
                        <Button variant="outline">Reset</Button>
                        <Button>Apply Filters</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SessionTables() {
    const [activeTab, setActiveTab] = useState("upcoming-sessions");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const totalPages = Math.ceil(UpcomingSessionsTable.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = UpcomingSessionsTable.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const toggleSelectAll = () => {
        if (selectedUsers.length === currentRecords.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(
                currentRecords.map((user): string => user.id.toString())
            );
        }
    };

    const toggleSelectUser = (userId: string) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    return (
        <>
            <div className="md:col-span-3 mt-6 cursor-pointer p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full h-12 grid-cols-5 gap-2 bg-gray-100 p-1 rounded-lg">
                        <TabsTrigger
                            value="upcoming-sessions"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === "upcoming-sessions"
                                    ? "bg-white/90 shadow-sm text-black font-semibold"
                                    : "text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            Upcoming Sessions
                        </TabsTrigger>
                        <TabsTrigger
                            value="live-sessions"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === "live-sessions"
                                    ? "bg-white/90 shadow-sm text-black font-semibold"
                                    : "text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            Live Sessions
                        </TabsTrigger>
                        <TabsTrigger
                            value="completed-sessions"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === "completed-sessions"
                                    ? "bg-white/90 shadow-sm text-black font-semibold"
                                    : "text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            Completed Sessions
                        </TabsTrigger>
                        <TabsTrigger
                            value="cancelled-sessions"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === "cancelled-sessions"
                                    ? "bg-white/90 shadow-sm text-black font-semibold"
                                    : "text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            Cancelled Session
                        </TabsTrigger>
                        <TabsTrigger
                            value="refund-request"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === "refund-request"
                                    ? "bg-white/90 shadow-sm text-black font-semibold"
                                    : "text-gray-900 hover:bg-gray-200"
                                }`}
                        >
                            Refund Request
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming-sessions" className="mt-4">
                        <div>
                            <div className="rounded-md border bg-white p-5">
                                <div className="flex items-center justify-between border-b p-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={
                                                selectedUsers.length === currentRecords.length &&
                                                currentRecords.length > 0
                                            }
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <label htmlFor="select-all" className="text-sm font-medium">
                                            Select All
                                        </label>
                                        {selectedUsers.length > 0 && (
                                            <Badge variant="outline" className="ml-2">
                                                {selectedUsers.length} selected
                                            </Badge>
                                        )}
                                    </div>

                                    {selectedUsers.length > 0 && (
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Bell className="mr-2 h-4 w-4" />
                                                Send Notification
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Export Selected
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <X className="mr-2 h-4 w-4" />
                                                Mark Inactive
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]"></TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Coach</TableHead>
                                                <TableHead>Coach Type</TableHead>
                                                <TableHead>Data/Time</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status Timeline</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentRecords.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.includes(
                                                                user.id.toString()
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleSelectUser(user.id.toString())
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="font-medium">{user.user}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{user.coach}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.coachType}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{user.dateTime}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.type}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>{user.amount}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[0]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[1]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[2]}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            // onClick={() => navigate(`/user-details/${user.id}`)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">View</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <MessageSquare className="h-4 w-4" />
                                                                <span className="sr-only">Chat</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <Flag className="h-4 w-4" />
                                                                <span className="sr-only">Flag</span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex items-center justify-between border-t p-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {indexOfFirstRecord + 1}-
                                        {Math.min(indexOfLastRecord, UpcomingSessionsTable.length)}{" "}
                                        of {UpcomingSessionsTable.length} explorers
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <Button
                                                    key={page}
                                                    variant={page === currentPage ? "default" : "outline"}
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </Button>
                                            )
                                        )}
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                            }
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="live-sessions" className="mt-4">
                        <div>
                            <div className="rounded-md border bg-white p-5">
                                <div className="flex items-center justify-between border-b p-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={
                                                selectedUsers.length === currentRecords.length &&
                                                currentRecords.length > 0
                                            }
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <label htmlFor="select-all" className="text-sm font-medium">
                                            Select All
                                        </label>
                                        {selectedUsers.length > 0 && (
                                            <Badge variant="outline" className="ml-2">
                                                {selectedUsers.length} selected
                                            </Badge>
                                        )}
                                    </div>

                                    {selectedUsers.length > 0 && (
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Bell className="mr-2 h-4 w-4" />
                                                Send Notification
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Export Selected
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <X className="mr-2 h-4 w-4" />
                                                Mark Inactive
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]"></TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Coach</TableHead>
                                                <TableHead>Coach Type</TableHead>
                                                <TableHead>Data/Time</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status Timeline</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentRecords.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.includes(
                                                                user.id.toString()
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleSelectUser(user.id.toString())
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="font-medium">{user.user}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{user.coach}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.coachType}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{user.dateTime}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.type}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>{user.amount}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[0]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[1]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[2]}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            // onClick={() => navigate(`/user-details/${user.id}`)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">View</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <MessageSquare className="h-4 w-4" />
                                                                <span className="sr-only">Chat</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <Flag className="h-4 w-4" />
                                                                <span className="sr-only">Flag</span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex items-center justify-between border-t p-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {indexOfFirstRecord + 1}-
                                        {Math.min(indexOfLastRecord, UpcomingSessionsTable.length)}{" "}
                                        of {UpcomingSessionsTable.length} explorers
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <Button
                                                    key={page}
                                                    variant={page === currentPage ? "default" : "outline"}
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </Button>
                                            )
                                        )}
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                            }
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="completed-sessions" className="mt-4">
                        <div>
                            <div className="rounded-md border bg-white p-5">
                                <div className="flex items-center justify-between border-b p-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={
                                                selectedUsers.length === currentRecords.length &&
                                                currentRecords.length > 0
                                            }
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <label htmlFor="select-all" className="text-sm font-medium">
                                            Select All
                                        </label>
                                        {selectedUsers.length > 0 && (
                                            <Badge variant="outline" className="ml-2">
                                                {selectedUsers.length} selected
                                            </Badge>
                                        )}
                                    </div>

                                    {selectedUsers.length > 0 && (
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Bell className="mr-2 h-4 w-4" />
                                                Send Notification
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Export Selected
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <X className="mr-2 h-4 w-4" />
                                                Mark Inactive
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]"></TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Coach</TableHead>
                                                <TableHead>Coach Type</TableHead>
                                                <TableHead>Data/Time</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status Timeline</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentRecords.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.includes(
                                                                user.id.toString()
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleSelectUser(user.id.toString())
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="font-medium">{user.user}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{user.coach}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.coachType}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{user.dateTime}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.type}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>{user.amount}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[0]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[1]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[2]}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            // onClick={() => navigate(`/user-details/${user.id}`)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">View</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <MessageSquare className="h-4 w-4" />
                                                                <span className="sr-only">Chat</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <Flag className="h-4 w-4" />
                                                                <span className="sr-only">Flag</span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex items-center justify-between border-t p-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {indexOfFirstRecord + 1}-
                                        {Math.min(indexOfLastRecord, UpcomingSessionsTable.length)}{" "}
                                        of {UpcomingSessionsTable.length} explorers
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <Button
                                                    key={page}
                                                    variant={page === currentPage ? "default" : "outline"}
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </Button>
                                            )
                                        )}
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                            }
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="cancelled-sessions" className="mt-4">
                        <div>
                            <div className="rounded-md border bg-white p-5">
                                <div className="flex items-center justify-between border-b p-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={
                                                selectedUsers.length === currentRecords.length &&
                                                currentRecords.length > 0
                                            }
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <label htmlFor="select-all" className="text-sm font-medium">
                                            Select All
                                        </label>
                                        {selectedUsers.length > 0 && (
                                            <Badge variant="outline" className="ml-2">
                                                {selectedUsers.length} selected
                                            </Badge>
                                        )}
                                    </div>

                                    {selectedUsers.length > 0 && (
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Bell className="mr-2 h-4 w-4" />
                                                Send Notification
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Export Selected
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <X className="mr-2 h-4 w-4" />
                                                Mark Inactive
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]"></TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Coach</TableHead>
                                                <TableHead>Coach Type</TableHead>
                                                <TableHead>Data/Time</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status Timeline</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentRecords.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.includes(
                                                                user.id.toString()
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleSelectUser(user.id.toString())
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="font-medium">{user.user}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{user.coach}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.coachType}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{user.dateTime}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.type}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>{user.amount}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[0]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[1]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[2]}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            // onClick={() => navigate(`/user-details/${user.id}`)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">View</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <MessageSquare className="h-4 w-4" />
                                                                <span className="sr-only">Chat</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <Flag className="h-4 w-4" />
                                                                <span className="sr-only">Flag</span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex items-center justify-between border-t p-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {indexOfFirstRecord + 1}-
                                        {Math.min(indexOfLastRecord, UpcomingSessionsTable.length)}{" "}
                                        of {UpcomingSessionsTable.length} explorers
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <Button
                                                    key={page}
                                                    variant={page === currentPage ? "default" : "outline"}
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </Button>
                                            )
                                        )}
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                            }
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="refund-request" className="mt-4">
                        <div>
                            <div className="rounded-md border bg-white p-5">
                                <div className="flex items-center justify-between border-b p-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="select-all"
                                            checked={
                                                selectedUsers.length === currentRecords.length &&
                                                currentRecords.length > 0
                                            }
                                            onCheckedChange={toggleSelectAll}
                                        />
                                        <label htmlFor="select-all" className="text-sm font-medium">
                                            Select All
                                        </label>
                                        {selectedUsers.length > 0 && (
                                            <Badge variant="outline" className="ml-2">
                                                {selectedUsers.length} selected
                                            </Badge>
                                        )}
                                    </div>

                                    {selectedUsers.length > 0 && (
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm">
                                                <Bell className="mr-2 h-4 w-4" />
                                                Send Notification
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <Download className="mr-2 h-4 w-4" />
                                                Export Selected
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <X className="mr-2 h-4 w-4" />
                                                Mark Inactive
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]"></TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Coach</TableHead>
                                                <TableHead>Coach Type</TableHead>
                                                <TableHead>Data/Time</TableHead>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status Timeline</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {currentRecords.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.includes(
                                                                user.id.toString()
                                                            )}
                                                            onCheckedChange={() =>
                                                                toggleSelectUser(user.id.toString())
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                <div className="font-medium">{user.user}</div>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{user.coach}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.coachType}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{user.dateTime}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline">{user.type}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div>{user.amount}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[0]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[1]}
                                                        </div>
                                                        <div className="text-sm">
                                                            {user.statusTimeline[2]}
                                                        </div>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex justify-center gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                            // onClick={() => navigate(`/user-details/${user.id}`)}
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                <span className="sr-only">View</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <MessageSquare className="h-4 w-4" />
                                                                <span className="sr-only">Chat</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <Flag className="h-4 w-4" />
                                                                <span className="sr-only">Flag</span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>

                                <div className="flex items-center justify-between border-t p-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {indexOfFirstRecord + 1}-
                                        {Math.min(indexOfLastRecord, UpcomingSessionsTable.length)}{" "}
                                        of {UpcomingSessionsTable.length} explorers
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.max(prev - 1, 1))
                                            }
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                            (page) => (
                                                <Button
                                                    key={page}
                                                    variant={page === currentPage ? "default" : "outline"}
                                                    size="sm"
                                                    className="h-8 w-8 p-0"
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    {page}
                                                </Button>
                                            )
                                        )}
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() =>
                                                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                            }
                                            disabled={currentPage === totalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
