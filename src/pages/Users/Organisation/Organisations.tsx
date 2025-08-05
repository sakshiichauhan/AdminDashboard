import { Building2, UserCheck, Globe, Clock, Link, MessageSquare, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { ChevronDown, Download, Filter, ChevronRight, ChevronLeft, Flag, Eye, Bell, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { orgTableData } from "@/Data";

const orgStats = [
    {
        title: "Total Organisations",
        value: "1438",
        icon: Building2,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        title: "Claimed Profiles",
        value: "456",
        icon: UserCheck,
        color: "text-green-500",
        bgColor: "bg-green-100",
    },
    {
        title: "Public (Unclaimed)",
        value: "982",
        icon: Globe,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
    },
    {
        title: "Pending Approvals",
        value: "12",
        icon: Clock,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
    },
    {
        title: "Coaches Linked to Orgs",
        value: "182",
        icon: Link,
        color: "text-red-500",
        bgColor: "bg-red-100",
    },
    {
        title: "Sessions via Orgs",
        value: "720+",
        icon: MessageSquare,
        color: "text-indigo-500",
        bgColor: "bg-indigo-100",
    }
];

export default function Organisation() {
    const [showFilter, setShowFilter] = useState(false);

    return <div className="p-6">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-2xl font-bold">Organisation Dashboard</h1>
            <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
                <Button>Bulk Actions</Button>
            </div>
        </div>
        <div>
            <div>
                <OrgCard />
                {showFilter && <OrgFilter />}
                <div className="flex justify-end mt-4 p-4">
                    <Button
                        variant="outline"
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="h-4 w-4" />
                        {showFilter ? "Hide Filters" : "Show Filters"}
                    </Button>
                </div>
                <OrganisationTable />
            </div>
        </div>
    </div>
}

function OrgCard() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2 py-1">
            {orgStats.map((stat, index) => (
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

function OrgFilter() {
    return (
        <div className="p-4">
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Name / Email / Phone</label>
                            <Input placeholder="Search by name, email or phone" className="mt-2" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Type</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="School" />
                                    <label htmlFor="School" className="text-sm">
                                        School
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="Institute" />
                                    <label htmlFor="Institute" className="text-sm">
                                        Institute
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="College" />
                                    <label htmlFor="College" className="text-sm">
                                        College
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="University" />
                                    <label htmlFor="University" className="text-sm">
                                        University
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="NGO" />
                                    <label htmlFor="NGO" className="text-sm">
                                        NGO
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="Corporation" />
                                    <label htmlFor="Corporation" className="text-sm">
                                        Corporation
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Claim Status</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="claimed" />
                                    <label htmlFor="claimed" className="text-sm">
                                        Claimed
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="public" />
                                    <label htmlFor="public" className="text-sm">
                                        Public(Unclaimed)
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pending" />
                                    <label htmlFor="pending" className="text-sm">
                                        Pending
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pendingApproval" />
                                    <label htmlFor="pendingApproval" className="text-sm">
                                        Pending Approval
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Affiliated Coaches</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="yes" />
                                    <label htmlFor="yes" className="text-sm">
                                        Yes
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="no" />
                                    <label htmlFor="no" className="text-sm">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Session Conducted</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="0" />
                                    <label htmlFor="0" className="text-sm">
                                        0
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="1-10" />
                                    <label htmlFor="1-10" className="text-sm">
                                        1-10
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="10+" />
                                    <label htmlFor="10+" className="text-sm">
                                        10+
                                    </label>
                                </div>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium">State / City</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between mt-2">
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
                            <label className="text-sm font-medium">Last Activity</label>
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
    )
}

function OrganisationTable() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const navigate = useNavigate();
    const recordsPerPage = 5

    // Calculate pagination data
    const totalPages = Math.ceil(orgTableData.length / recordsPerPage)
    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    const currentRecords = orgTableData.slice(indexOfFirstRecord, indexOfLastRecord)

    const toggleSelectAll = () => {
        if (selectedUsers.length === currentRecords.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(currentRecords.map((user): string => user.id.toString()))
        }
    }

    const toggleSelectUser = (userId: string) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id !== userId))
        } else {
            setSelectedUsers([...selectedUsers, userId])
        }
    }

    return (
        <div className="rounded-md border bg-white p-5">
            <div className="flex items-center justify-between border-b p-4">
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="select-all"
                        checked={selectedUsers.length === currentRecords.length && currentRecords.length > 0}
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
                            <TableHead>Organisation</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Claimed Status</TableHead>
                            <TableHead>Coaches</TableHead>
                            <TableHead>Sessions</TableHead>
                            <TableHead>Registered / Last Active</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
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
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.contact.email}</div>
                                    <div className="text-xs text-gray-500">{user.contact.phone}</div>
                                </TableCell>
                                <TableCell>{user.location}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.type}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {`${user.sessions}`}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {user.registered}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="inline-flex justify-center items-center">
                                        {user.sessions}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.registered}</div>
                                    <div className="text-xs text-gray-500">{user.lastActive}</div>
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
                                            <Check className="h-4 w-4" />
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
                    Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, orgTableData.length)} of {orgTableData.length} explorers
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
