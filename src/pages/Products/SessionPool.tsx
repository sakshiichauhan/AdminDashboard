import { useState } from "react";
import { CalendarDays, Clock, Star, Briefcase, Hourglass } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PoolTableData } from "@/Data";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Flag, Bell, Download, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const stats = [
    {
        title: "Total Pooled Sessions",
        value: "326",
        icon: CalendarDays,
        color: "text-blue-500",
        bgColor: "bg-blue-100"
    },
    {
        title: "Instant Sessions Available",
        value: "112",
        icon: Clock,
        color: "text-green-500",
        bgColor: "bg-green-100"
    },
    {
        title: "Introductory Sessions Listed",
        value: "89",
        icon: Star,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100"
    },
    {
        title: "B2B Sessions Published",
        value: "125",
        icon: Briefcase,
        color: "text-purple-500",
        bgColor: "bg-purple-100"
    },
    {
        title: "Waiting for Coach to Accept",
        value: "21",
        icon: Hourglass,
        color: "text-red-500",
        bgColor: "bg-red-100"
    }
];


function StatCards() {
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
    )
}

export default function SessionPool() {
    const [filtersOpen, setFiltersOpen] = useState(false);
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Top Overview </h1>
            <StatCards />
            <div className="flex justify-end flex-col sm:flex-row flex-wrap gap-2 mt-4">
                <Button>Add Session</Button>
                <Button>Export Pool List</Button>
                <Button>Assign Slots</Button>
                <Button>Manage Availability</Button>
            </div>
            {filtersOpen && <SessionPoolFilter />}
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
            <PoolTables />
        </div>
    );
}

function SessionPoolFilter() {
    return (
        <div className="p-4">
            <Card className="">
                <CardHeader>
                    <CardTitle className="text-lg">Pool Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Session Type</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="instant" />
                                    <label htmlFor="instant" className="text-sm">
                                        Instant
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="introductory" />
                                    <label htmlFor="introductory" className="text-sm">
                                        Introductory
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
                            <label className="text-sm font-medium">Coach Type</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="consultant" />
                                    <label htmlFor="consultant" className="text-sm">
                                        Consultant
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="mentor" />
                                    <label htmlFor="mentor" className="text-sm">
                                        Mentor
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="educator" />
                                    <label htmlFor="educator" className="text-sm">
                                        Educator
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Availibility</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="available_now" />
                                    <label htmlFor="available_now" className="text-sm">
                                        Available Now
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="scheduled" />
                                    <label htmlFor="scheduled" className="text-sm">
                                        Scheduled
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="full" />
                                    <label htmlFor="full" className="text-sm">
                                        Full
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="active" />
                                    <label htmlFor="active" className="text-sm">
                                        Active
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="inactive" />
                                    <label htmlFor="inactive" className="text-sm">
                                        Inactive
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pending" />
                                    <label htmlFor="pending" className="text-sm">
                                        Pending
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Segment</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="ug" />
                                    <label htmlFor="ug" className="text-sm">
                                        UG
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pg" />
                                    <label htmlFor="pg" className="text-sm">
                                        PG
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="career_changer" />
                                    <label htmlFor="career_changer" className="text-sm">
                                        Career Changer
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="professional" />
                                    <label htmlFor="professional" className="text-sm">
                                        Professional
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end gap-2 ">
                            <Button variant="outline">Reset</Button>
                            <Button>Apply Filters</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


function PoolTables() {
    const [activeTab, setActiveTab] = useState("instant-sessions");
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const totalPages = Math.ceil(PoolTableData.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = PoolTableData.slice(
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
        <div className="md:col-span-4 mt-6 cursor-pointer p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full h-12 grid-cols-4 gap-2 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger
                        value="instant-sessions"
                        className={`px-4 py-2 rounded-md transition-all ${activeTab === "instant-sessions"
                            ? "bg-white/90 shadow-sm text-black font-semibold"
                            : "text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        Instant Sessions
                    </TabsTrigger>
                    <TabsTrigger
                        value="introductory-sessions"
                        className={`px-4 py-2 rounded-md transition-all ${activeTab === "introductory-sessions"
                            ? "bg-white/90 shadow-sm text-black font-semibold"
                            : "text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        Introductory Sessions
                    </TabsTrigger>
                    <TabsTrigger
                        value="b2b-sessions"
                        className={`px-4 py-2 rounded-md transition-all ${activeTab === "b2b-sessions"
                            ? "bg-white/90 shadow-sm text-black font-semibold"
                            : "text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        B2B Sessions
                    </TabsTrigger>
                    <TabsTrigger
                        value="pending-approvals"
                        className={`px-4 py-2 rounded-md transition-all ${activeTab === "pending-approvals"
                            ? "bg-white/90 shadow-sm text-black font-semibold"
                            : "text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        Pending Approvals
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="instant-sessions" className="mt-4">
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
                                            <TableHead>Coach</TableHead>
                                            <TableHead>Coach Type</TableHead>
                                            <TableHead>Segment</TableHead>
                                            <TableHead>Topic</TableHead>
                                            <TableHead>Price/Code</TableHead>
                                            <TableHead>Slots</TableHead>
                                            <TableHead>Status</TableHead>
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
                                                            <div className="font-medium">{user.coach}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.coachType}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{user.segment}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{user.topic}</div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.priceCode}
                                                </TableCell>
                                                <TableCell>
                                                    <div>{user.slots}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.status}
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
                                    {Math.min(indexOfLastRecord, PoolTableData.length)}{" "}
                                    of {PoolTableData.length} explorers
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
                <TabsContent value="introductory-sessions" className="mt-4">
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
                                            <TableHead>Coach</TableHead>
                                            <TableHead>Coach Type</TableHead>
                                            <TableHead>Segment</TableHead>
                                            <TableHead>Topic</TableHead>
                                            <TableHead>Price/Code</TableHead>
                                            <TableHead>Slots</TableHead>
                                            <TableHead>Status</TableHead>
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
                                                            <div className="font-medium">{user.coach}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.coachType}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{user.segment}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{user.topic}</div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.priceCode}
                                                </TableCell>
                                                <TableCell>
                                                    <div>{user.slots}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.status}
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
                                    {Math.min(indexOfLastRecord, PoolTableData.length)}{" "}
                                    of {PoolTableData.length} explorers
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
                <TabsContent value="b2b-sessions" className="mt-4">
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
                                            <TableHead>Coach</TableHead>
                                            <TableHead>Coach Type</TableHead>
                                            <TableHead>Segment</TableHead>
                                            <TableHead>Topic</TableHead>
                                            <TableHead>Price/Code</TableHead>
                                            <TableHead>Slots</TableHead>
                                            <TableHead>Status</TableHead>
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
                                                            <div className="font-medium">{user.coach}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.coachType}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{user.segment}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{user.topic}</div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.priceCode}
                                                </TableCell>
                                                <TableCell>
                                                    <div>{user.slots}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.status}
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
                                    {Math.min(indexOfLastRecord, PoolTableData.length)}{" "}
                                    of {PoolTableData.length} explorers
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
                <TabsContent value="pending-approvals" className="mt-4">
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
                                            <TableHead>Coach</TableHead>
                                            <TableHead>Coach Type</TableHead>
                                            <TableHead>Segment</TableHead>
                                            <TableHead>Topic</TableHead>
                                            <TableHead>Price/Code</TableHead>
                                            <TableHead>Slots</TableHead>
                                            <TableHead>Status</TableHead>
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
                                                            <div className="font-medium">{user.coach}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.coachType}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{user.segment}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{user.topic}</div>
                                                </TableCell>
                                                <TableCell>
                                                    {user.priceCode}
                                                </TableCell>
                                                <TableCell>
                                                    <div>{user.slots}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.status}
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
                                    {Math.min(indexOfLastRecord, PoolTableData.length)}{" "}
                                    of {PoolTableData.length} explorers
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
    )
}


