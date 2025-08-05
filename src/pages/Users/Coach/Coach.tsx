import {
    Users,
    Building2,
    UserPlus,
    Venus,
    CalendarDays,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    Bell,
    Download,
    X,
    Search,
    Mars,
} from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { coachTableData } from "@/Data";
import { Separator } from "@/components/ui/separator";

const coachStats = [
    {
        title: "This Week",
        value: "27",
        icon: UserPlus,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
    },
    {
        title: "Total Coaches",
        value: "1234",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        title: "Approvals",
        value: "34",
        icon: Building2,
        color: "text-green-500",
        bgColor: "bg-green-100",
    },

    {
        title: "Sessions",
        value: "4860",
        icon: MessageSquare,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
    },
    {
        title: "Masterclasses",
        value: "67",
        icon: CalendarDays,
        color: "text-red-500",
        bgColor: "bg-red-100",
    },
    {
        title: "Questions",
        value: "67",
        icon: CalendarDays,
        color: "text-red-500",
        bgColor: "bg-red-100",
    },
];

export default function Coach() {
    const [filtersOpen, setFiltersOpen] = useState<Boolean>(false);

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <h1 className="text-2xl font-bold">Coaches Dashboard</h1>
            </div>
            {/* Coach card data */}
            <CoachState />
            <div className="relative">
                <div className="flex justify-end p-4">
                    <Button
                        variant="outline"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="h-4 w-4" />
                        {filtersOpen ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>
                {filtersOpen && (
                    <div className="absolute right-0 top-16 z-50 w-full max-w-xl">
                        <CoachFilter />
                    </div>
                )}
            </div>
            <div>
                <ExplorerTable />
            </div>
        </div>
    );
}

function CoachState() {
    return (
        <div className="mt-2">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 px-2 py-1">
                {coachStats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex items-center justify-start">
                            <div
                                className={`${stat.bgColor} flex justify-center items-center rounded-full p-1`}
                            >
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div className="flex flex-col ml-2">
                                <div className="text-[14px] font-normal">{stat.title}</div>
                                <div className="text-[22px] font-semibold">{stat.value}</div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function CoachFilter() {
    return (
        <div className="">
            <Card className="mt-2">
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Coach Type</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="educator" />
                                    <label htmlFor="educator" className="text-sm">
                                        Educator
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="mentor" />
                                    <label htmlFor="mentor" className="text-sm">
                                        Mentor
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="coach" />
                                    <label htmlFor="coach" className="text-sm">
                                        Coach
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
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

function ExplorerTable() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: "ascending" | "descending";
    } | null>(null);

    // Sorting logic
    const sortedData = [...coachTableData];
    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            const aValue = a[sortConfig.key as keyof typeof a];
            const bValue = b[sortConfig.key as keyof typeof b];
            if (aValue < bValue) {
                return sortConfig.direction === "ascending" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === "ascending" ? 1 : -1;
            }
            return 0;
        });
    }

    const totalPages = Math.ceil(sortedData.length / recordsPerPage);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = sortedData.slice(
        indexOfFirstRecord,
        indexOfLastRecord
    );

    const requestSort = (key: string) => {
        let direction: "ascending" | "descending" = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

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
        <div className="rounded-md border bg-white">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex justify-end items-center gap-4">
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
                        <div className="flex justify-end items-center gap-4">
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
                    </div>
                </div>
                <div className="flex justify-end items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-2 text-sm"
                            >
                                {recordsPerPage}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {[10, 25, 50, 100].map((size) => (
                                <DropdownMenuItem
                                    key={size}
                                    onClick={() => {
                                        setRecordsPerPage(size);
                                        setCurrentPage(1);
                                    }}
                                >
                                    {size}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex justify-around items-center border rounded-md overflow-hidden bg-white shadow-sm">
                        <Input
                            placeholder="Search"
                            className="border-none focus:ring-0 focus-visible:ring-0 focus:outline-none px-3 py-2 w-40 sm:w-45"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            variant="ghost"
                            className="rounded-none rounded-r-md bg-gray-200"
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5 text-gray-500" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px]"></TableHead>
                            <TableHead
                                onClick={() => requestSort("profile.name")}
                                className="cursor-pointer"
                            >
                                Profile{" "}
                                {sortConfig?.key === "profile.name" &&
                                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("contact.email")}
                                className="cursor-pointer"
                            >
                                Contact{" "}
                                {sortConfig?.key === "contact.email" &&
                                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("status")}
                                className="cursor-pointer"
                            >
                                Status{" "}
                                {sortConfig?.key === "status" &&
                                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("sessions.total")}
                                className="cursor-pointer"
                            >
                                Sessions{" "}
                                {sortConfig?.key === "sessions.total" &&
                                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("assessments")}
                                className="cursor-pointer"
                            >
                                Assessments{" "}
                                {sortConfig?.key === "assessments" &&
                                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("orgLinked")}
                                className="cursor-pointer"
                            >
                                Org Linked{" "}
                                {sortConfig?.key === "orgLinked" &&
                                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("lastActive")}
                                className="cursor-pointer"
                            >
                                Last Active / DOJ{" "}
                                {sortConfig?.key === "lastActive" &&
                                    (sortConfig.direction === "ascending" ? "↑" : "↓")}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentRecords.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedUsers.includes(user.id.toString())}
                                        onCheckedChange={() => toggleSelectUser(user.id.toString())}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <div className="h-18 w-18 rounded-full bg-gray-200 overflow-hidden">
                                            <img
                                                src={user.profile.photo}
                                                alt={user.profile.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-start items-center">
                                                <div className="font-medium">{user.profile.name}</div>
                                                <div className="flex items-center gap-1 ">
                                                    {user.profile.gender === "M" ? (
                                                        <Mars className="h-4" />
                                                    ) : (
                                                        <Venus className="h-4" />
                                                    )}
                                                </div>
                                                <div>
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs font-light"
                                                        >
                                                            {user.profile.type}
                                                        </Badge>
                                                    </div>
                                            </div>
                                            <div className="flex justify-start items-center gap-2">
                                                <div className="text-gray-500 text-xs">
                                                    {user.specialty}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-start items-center gap-2">
                                                    <div className="text-xs text-gray-900 italic">
                                                        {`@${user.profile.userid}`}
                                                    </div>
                                                </div>

                                                <div className="flex justify-start gap-2 mt-1">
                                                    <Button
                                                        variant="text"
                                                        size="xs"
                                                    // onClick={() => navigate(`/user-details/${user.id}`)}
                                                    >
                                                        View
                                                        <span className="sr-only">View</span>
                                                    </Button>
                                                    <Separator
                                                        orientation="vertical"
                                                        thickness="2px"
                                                        length="100px"
                                                    />
                                                    <Button variant="text" size="xs">
                                                        History
                                                        <span className="sr-only">Chat</span>
                                                    </Button>
                                                    <Separator
                                                        orientation="vertical"
                                                        thickness="2px"
                                                        length="80px"
                                                    />
                                                    <Button variant="text" size="xs">
                                                        Flag
                                                        <span className="sr-only">Flag</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.contact.email}</div>
                                    <div className="text-xs text-gray-500">
                                        {user.contact.phone}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        <div>{`${user.sessions.total}`}</div>
                                        <div className="text-xs text-gray-400">{`${user.sessions.completed} Completed`}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.assessments}</div>
                                </TableCell>
                                <TableCell>{user.orgLinked}</TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.lastActive}</div>
                                    <div className="text-xs text-gray-500">{user.joined}</div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between border-t p-4 flex-wrap gap-2">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">
                        Showing {indexOfFirstRecord + 1}-
                        {Math.min(indexOfLastRecord, sortedData.length)} of{" "}
                        {sortedData.length} explorers
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}
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
    );
}
