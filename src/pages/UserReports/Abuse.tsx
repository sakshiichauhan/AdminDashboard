import { MessageCircle, Star, CalendarDays, Filter, Bell, Download, X, Eye, MessageSquare, Flag, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CardContent, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AbuseTableData } from "@/Data";
import { Badge } from "@/components/ui/badge";

const ReviewStatsAbuse = [
    {
        id: 1,
        title: "Total Reviews",
        value: "94",
        icon: MessageCircle,
        color: "text-blue-600",
        bgColor: "bg-blue-100",
    },
    {
        id: 2,
        title: "Average Rating",
        value: "4.4",
        icon: Star,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
    },
    {
        id: 3,
        title: "Last Updated",
        value: "18 May 2025",
        icon: CalendarDays,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
    },
];

export default function Abuse() {
    const [showFilter, setShowFilter] = useState(false);
    return (
        <div className="p-4">
            <h1 className="text-2xl font-semibold">Overview</h1>
            <AbuseCards />
            <div className="flex justify-end gap-2 mt-4">
                <Button>Add New Report</Button>
                <Button>Escalate</Button>
                <Button>Export Logs</Button>
            </div>
            <ReportedTabAreas />
            {showFilter && <Abusefilter />}
            <div className="flex justify-end">
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowFilter(!showFilter)}
                >
                    <Filter className="h-4 w-4" />
                    {showFilter ? "Hide Filter" : "Show Filter"}
                </Button>
            </div>
            <ReportTable />
        </div>
    );
}

function AbuseCards() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-2 py-1">
            {ReviewStatsAbuse.map((stat, index) => (
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

function ReportedTabAreas() {
    const [activeTabs, setActiveTabs] = useState("chats");
    return (
        <div className="mt-4">
            <Tabs value={activeTabs} onValueChange={setActiveTabs}>
                <TabsList className="grid w-full h-10 grid-cols-4 gap-2 bg-gray-100 p-1 rounded-lg">
                    <TabsTrigger value="chats">Chats</TabsTrigger>
                    <TabsTrigger value="sessions">Sessions</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                    <TabsTrigger value="public_posts">Public Posts</TabsTrigger>
                </TabsList>
                <TabsContent value="chats">
                    <div>Chats data</div>
                </TabsContent>
                <TabsContent value="sessions">
                    <div>Sessions data</div>
                </TabsContent>
                <TabsContent value="comments">
                    <div>Comments data</div>
                </TabsContent>
                <TabsContent value="public_posts">
                    <div>Public posts data</div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

function Abusefilter() {
    return (
        <div className="p-4">
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg">Abuse Report Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Search by User / Section */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Search by User / Section</label>
                            <Input placeholder="Enter user name, email, or section" className="mt-2" />
                        </div>

                        {/* Reported In */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reported In</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="chat" />
                                    <label htmlFor="chat" className="text-sm">Chat</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="session" />
                                    <label htmlFor="session" className="text-sm">Session</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="post" />
                                    <label htmlFor="post" className="text-sm">Post</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="feedback" />
                                    <label htmlFor="feedback" className="text-sm">Feedback</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="comment" />
                                    <label htmlFor="comment" className="text-sm">Comment</label>
                                </div>
                            </div>
                        </div>

                        {/* Reason */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reason</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="inappropriate" />
                                    <label htmlFor="inappropriate" className="text-sm">Inappropriate Content</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="harassment" />
                                    <label htmlFor="harassment" className="text-sm">Harassment</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="spam" />
                                    <label htmlFor="spam" className="text-sm">Spam</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="misinformation" />
                                    <label htmlFor="misinformation" className="text-sm">Misinformation</label>
                                </div>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="under_review" />
                                    <label htmlFor="under_review" className="text-sm">Under Review</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="actioned" />
                                    <label htmlFor="actioned" className="text-sm">Actioned</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="resolved" />
                                    <label htmlFor="resolved" className="text-sm">Resolved</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="archived" />
                                    <label htmlFor="archived" className="text-sm">Archived</label>
                                </div>
                            </div>
                        </div>

                        {/* Date Range */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Reported Between</label>
                            <div className="mt-2">
                                <DatePickerWithRange />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end gap-2">
                        <Button variant="outline">Reset</Button>
                        <Button>Apply Filters</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function ReportTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const totalPages = Math.ceil(AbuseTableData.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = AbuseTableData.slice(indexOfFirstRecord, indexOfLastRecord);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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
        <div className="mt-6">
            <div>
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
                                        <TableHead>Reported By</TableHead>
                                        <TableHead>Submitted On</TableHead>
                                        <TableHead>Reported In</TableHead>
                                        <TableHead>Reported Content</TableHead>
                                        <TableHead>Reason</TableHead>
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
                                                        <div className="font-medium">{user.reportedBy}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.submittedOn}</TableCell>
                                            <TableCell>
                                                {user.submittedOn}
                                            </TableCell>
                                            <TableCell>
                                                {user.reportedContent}
                                            </TableCell>
                                            <TableCell>
                                                {user.reason}
                                            </TableCell>
                                            <TableCell>
                                                <div>{user.status}</div>
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
                                {Math.min(indexOfLastRecord, AbuseTableData.length)}{" "}
                                of {AbuseTableData.length} explorers
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
            </div>
        </div>
    )
}
