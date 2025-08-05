import { useState } from "react"
import { Bell, Download, X } from "lucide-react"
import { Eye, MessageSquare, Flag, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
// import type { User } from "@/components/dashboard-page"
// import { useNavigate } from "react-router-dom"
import { mockUsers } from "@/Data"

// interface ExplorerTableProps {
//     onViewUser: (user: User) => void;
// }

export function ExplorerTable() {
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    // const navigate = useNavigate();
    const recordsPerPage = 5

    // Calculate pagination data
    const totalPages = Math.ceil(mockUsers.length / recordsPerPage)
    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    const currentRecords = mockUsers.slice(indexOfFirstRecord, indexOfLastRecord)

    const toggleSelectAll = () => {
        if (selectedUsers.length === currentRecords.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(currentRecords.map((user) => user.id))
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
                            <TableHead>Profile</TableHead>
                            <TableHead>User Type</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Profile Stage</TableHead>
                            <TableHead>Assessments</TableHead>
                            <TableHead>Sessions</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>DOJ / Last Login</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentRecords.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedUsers.includes(user.id)}
                                        onCheckedChange={() => toggleSelectUser(user.id)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                            <img
                                                src={user.photo || "/placeholder.svg"}
                                                alt={user.name}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.gender}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{user.userType}</TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.email}</div>
                                    <div className="text-xs text-gray-500">{user.phone}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.profileStage}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {user.assessments.completed}/{user.assessments.total} Complete
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm">
                                        {user.sessions.total} ({user.sessions.missed} Missed)
                                    </div>
                                </TableCell>
                                <TableCell>{user.source}</TableCell>
                                <TableCell>
                                    <div className="text-sm">{user.joinDate}</div>
                                    <div className="text-xs text-gray-500">{user.lastLogin}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                    //@ts-ignore
                                        variant={user.status === "Active" ? "success" : "secondary"}
                                        className={user.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                                    >
                                        {user.status}
                                    </Badge>
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
                    Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, mockUsers.length)} of {mockUsers.length} explorers
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


