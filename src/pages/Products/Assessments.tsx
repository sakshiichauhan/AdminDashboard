import { useState } from "react"
import { Users, FileCheck2, FileText, Clock, CheckCircle2, Plus, Brain, ChartArea, Download, Filter, X, Bell, Eye, MessageSquare, Flag, ChevronLeft, ChevronRight  } from "lucide-react"
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { CardContent, CardTitle } from "@/components/ui/card"
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { assessmentsTable } from "@/Data"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const stats = [
    {
        title: "Total Assessments",
        value: "128",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        title: "Active Assessments",
        value: "87",
        icon: FileCheck2,
        color: "text-green-500",
        bgColor: "bg-green-100",
    },
    {
        title: "Assessments Taken",
        value: "8,947",
        icon: FileText,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
    },
    {
        title: "In Progress",
        value: "563",
        icon: Clock,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
    },
    {
        title: "Completed Reports Generated",
        value: "6,482",
        icon: CheckCircle2,
        color: "text-emerald-500",
        bgColor: "bg-emerald-100",
    },
]

export default function Assessments() {
    const [filtersOpen, setFiltersOpen] = useState<Boolean>(false);
    return (
        <div className="p-6">
            {/* cards */}
            <StatCard />
            {/* Action buttons */}
            <div className="flex justify-end flex-col md:flex-row gap-2 mt-6">
                <Button>
                    <Plus />
                    Create New Assessment
                </Button>
                <Button>
                    <Brain />
                    Manage Questions
                </Button>
                <Button>
                    <ChartArea />
                    View Results
                </Button>
                <Button>
                    <Download />
                    Export Reports
                </Button>
            </div>
            {/* Filter */}
            <div>
                {filtersOpen && <AdvancedFilters />}
                <div className="flex justify-end mt-4">
                    <Button
                        variant="outline"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                        className="flex items-center gap-2"
                    >
                        <Filter className="h-4 w-4" />
                        {filtersOpen ? "Hide Filter" : "Show Filters"}
                    </Button>
                </div>
            </div>
            {/* Table */}
            <div className="mt-6">
                <AssessmentTable />
            </div>
        </div>
    );
}

function StatCard() {
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

function AdvancedFilters() {
    return (
        <div className="p-4">
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Assessment Name</label>
                            <Input placeholder="Search by name" className="mt-2" />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium">Target Group</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="career" />
                                    <label htmlFor="sixToEight" className="text-sm">
                                        6-8
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="nineToTen" />
                                    <label htmlFor="nineToTen" className="text-sm">
                                        9-10
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="elevenToTwelfth" />
                                    <label htmlFor="elevenToTwelfth" className="text-sm">
                                        11-12
                                    </label>
                                </div>
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
                                    <Checkbox id="professional" />
                                    <label htmlFor="professional" className="text-sm">
                                        Professional
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Categories</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="career" />
                                    <label htmlFor="career" className="text-sm">
                                        Career
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="aptitude" />
                                    <label htmlFor="aptitude" className="text-sm">
                                        Aptitude
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="personality" />
                                    <label htmlFor="personality" className="text-sm">
                                        Personality
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="skills" />
                                    <label htmlFor="skills" className="text-sm">
                                        Skills
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="other" />
                                    <label htmlFor="other" className="text-sm">
                                        Others
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
                                    <Checkbox id="draft" />
                                    <label htmlFor="draft" className="text-sm">
                                        Draft
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Created By</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="coach" />
                                    <label htmlFor="coach" className="text-sm">
                                        Coach
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="adminName" />
                                    <label htmlFor="adminName" className="text-sm">
                                        Admin Name
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Date Range</label>
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

function AssessmentTable() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const navigate = useNavigate();
    const recordsPerPage = 5

    // Calculate pagination data
    const totalPages = Math.ceil(assessmentsTable.length / recordsPerPage)
    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    const currentRecords = assessmentsTable.slice(indexOfFirstRecord, indexOfLastRecord)

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
                            <TableHead>Name</TableHead>
                            <TableHead>Target Group</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created On</TableHead>
                            <TableHead>Attempts</TableHead>
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
                                <TableCell>{user.targetGroup}</TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.category}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {user.createdOn}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {user.attempts}
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
                    Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, assessmentsTable.length)} of {assessmentsTable.length} explorers
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
