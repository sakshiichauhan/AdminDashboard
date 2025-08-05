import { Users, Building2, UserPlus, MessageSquare, Check, Plus } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { CoachProfileData, OrganisationProfiles, GoogleMapListings, FormsSubmittedData } from "@/Data";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsContent, TabsTrigger } from "@radix-ui/react-tabs";

const stats = [
    {
        title: "Coaches Profiles",
        value: "34",
        icon: Users,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        title: "Organisation Profile",
        value: "12",
        icon: Building2,
        color: "text-green-500",
        bgColor: "bg-green-100",
    },
    {
        title: "Map Listing",
        value: "7",
        icon: UserPlus,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
    },
    {
        title: "Form Data Submission",
        value: "15",
        icon: MessageSquare,
        color: "text-yellow-500",
        bgColor: "bg-yellow-100",
    },
]


export default function Approvals() {

    const [activeTab, setActiveTab] = useState("coach-Profile");
    const [selectedUsers, setSelectedUsers] = useState<String[]>([]);
    const [coachPage, setCoachPage] = useState(1);
    const [orgPage, setOrgPage] = useState(1);
    const [mapPage, setMapPage] = useState(1);
    const [formPage, setFormPage] = useState(1);
    const recordsPerPage = 5;

    // Coach pagination
    const coachTotalPages = Math.ceil(CoachProfileData.length / recordsPerPage);
    const coachIndexLast = coachPage * recordsPerPage;
    const coachIndexFirst = coachIndexLast - recordsPerPage;
    const coachRecords = CoachProfileData.slice(coachIndexFirst, coachIndexLast);

    // Organization pagination
    const orgTotalPages = Math.ceil(OrganisationProfiles.length / recordsPerPage);
    const orgIndexLast = orgPage * recordsPerPage;
    const orgIndexFirst = orgIndexLast - recordsPerPage;
    const orgRecords = OrganisationProfiles.slice(orgIndexFirst, orgIndexLast);

    // Map pagination
    const mapTotalPages = Math.ceil(GoogleMapListings.length / recordsPerPage);
    const mapIndexLast = mapPage * recordsPerPage;
    const mapIndexFirst = mapIndexLast - recordsPerPage;
    const mapRecords = GoogleMapListings.slice(mapIndexFirst, mapIndexLast);

    // Form pagination
    const formTotalPages = Math.ceil(FormsSubmittedData.length / recordsPerPage);
    const formIndexLast = formPage * recordsPerPage;
    const formIndexFirst = formIndexLast - recordsPerPage;
    const formRecords = FormsSubmittedData.slice(formIndexFirst, formIndexLast);

    const toggleSelectAll = () => {
        if (selectedUsers.length === CoachProfileData.length) {
            setSelectedUsers([])
        } else {
            setSelectedUsers(CoachProfileData.map((user) => user.id.toString()))
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
        <div className="p-4">
            {/* Cards */}
            <h1 className="heading-title">Overview Stats (Pending Approvals) </h1>
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
            {/* Tables */}
            <div className="md:col-span-3 mt-6 cursor-pointer p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full h-12 grid-cols-4 gap-2 bg-gray-100 p-1 rounded-lg">
                        <TabsTrigger
                            value="coach-Profile"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'coach-Profile'
                                ? 'bg-white/90 shadow-sm text-black font-semibold'
                                : 'text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            Coach Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="coach-Organisation"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'coach-Organisation'
                                ? 'bg-white shadow-sm text-black font-semibold'
                                : 'text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            Organisation
                        </TabsTrigger>
                        <TabsTrigger
                            value="coach-googleMap"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'coach-googleMap'
                                ? 'bg-white shadow-sm text-black font-semibold'
                                : 'text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            Google Map
                        </TabsTrigger>
                        <TabsTrigger
                            value="coach-form"
                            className={`px-4 py-2 rounded-md transition-all ${activeTab === 'coach-form'
                                ? 'bg-white shadow-sm text-black font-semibold'
                                : 'text-gray-900 hover:bg-gray-200'
                                }`}
                        >
                            Form Data
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="coach-Profile" className="mt-4">
                        <div>
                            <h2 className="heading-title">Coach Profile - Pending</h2>
                            <div>
                                <div className="overflow-x-auto mt-2">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[50px]">
                                                    <Checkbox
                                                        checked={selectedUsers.length === CoachProfileData.length}
                                                        onCheckedChange={toggleSelectAll}
                                                    />
                                                </TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Phone</TableHead>
                                                <TableHead>Speciality</TableHead>
                                                <TableHead>Submitted</TableHead>
                                                <TableHead className="text-center">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {coachRecords.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <Checkbox
                                                            checked={selectedUsers.includes(user.id.toString())}
                                                            onCheckedChange={() => toggleSelectUser(user.id.toString())}
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-3">
                                                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                                                <img
                                                                    // src={user.photo || "/placeholder.svg"}
                                                                    alt={user.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">{user.name}</div>
                                                                {/* <div className="text-xs text-gray-500">{user.gender}</div> */}
                                                            </div>
                                                        </div>
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="text-sm">{user.email}</div>
                                                        <Badge variant="outline">{user.phone}</Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">{user.phone}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {user.speciality}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="text-sm">
                                                            {user.submitted}
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
                                                                <Check className="h-4 w-4" />
                                                                <span className="sr-only">Chat</span>
                                                            </Button>
                                                            <Button variant="ghost" size="icon">
                                                                <Plus className="h-4 w-4 rotate-45" />
                                                                <span className="sr-only">Flag</span>
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                {/* Coach Pagination */}
                                <div className="flex items-center justify-between border-t p-4">
                                    <div className="text-sm text-gray-500">
                                        Showing {coachIndexFirst + 1}-{Math.min(coachIndexLast, CoachProfileData.length)} of {CoachProfileData.length} coaches
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCoachPage(prev => Math.max(prev - 1, 1))}
                                            disabled={coachPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        {Array.from({ length: coachTotalPages }, (_, i) => i + 1).map(page => (
                                            <Button
                                                key={page}
                                                variant={page === coachPage ? "default" : "outline"}
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => setCoachPage(page)}
                                            >
                                                {page}
                                            </Button>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => setCoachPage(prev => Math.min(prev + 1, coachTotalPages))}
                                            disabled={coachPage === coachTotalPages}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="coach-Organisation" className="mt-4">
                        <h2 className="heading-title">Organisation Profiles - Pending Approvals</h2>
                        <div>
                            <div className="overflow-x-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                <Checkbox
                                                    checked={selectedUsers.length === OrganisationProfiles.length}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead>Organisation</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Contact</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Submitted</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orgRecords.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedUsers.includes(user.id.toString())}
                                                        onCheckedChange={() => toggleSelectUser(user.id.toString())}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                                            <img
                                                                // src={user.photo || "/placeholder.svg"}
                                                                alt={user.organisation}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{user.organisation}</div>
                                                            {/* <div className="text-xs text-gray-500">{user.gender}</div> */}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">{user.location}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{user.contact}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.type}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.submitted}
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
                                                            <Check className="h-4 w-4" />
                                                            <span className="sr-only">Chat</span>
                                                        </Button>
                                                        <Button variant="ghost" size="icon">
                                                            <Plus className="h-4 w-4 rotate-45" />
                                                            <span className="sr-only">Flag</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {/* Organization Pagination */}
                            <div className="flex items-center justify-between border-t p-4">
                                <div className="text-sm text-gray-500">
                                    Showing {orgIndexFirst + 1}-{Math.min(orgIndexLast, OrganisationProfiles.length)} of {OrganisationProfiles.length} organizations
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setOrgPage(prev => Math.max(prev - 1, 1))}
                                        disabled={orgPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    {Array.from({ length: orgTotalPages }, (_, i) => i + 1).map(page => (
                                        <Button
                                            key={page}
                                            variant={page === orgPage ? "default" : "outline"}
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => setOrgPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setOrgPage(prev => Math.min(prev + 1, orgTotalPages))}
                                        disabled={orgPage === orgTotalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="coach-googleMap" className="mt-4">
                        {/* Google */}
                        <h2 className="heading-title">Google Map Listing - Approval Needed</h2>
                        <div>
                            <div className="overflow-x-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                <Checkbox
                                                    checked={selectedUsers.length === GoogleMapListings.length}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead>Listing</TableHead>
                                            <TableHead>Address</TableHead>
                                            <TableHead>Linked Org</TableHead>
                                            <TableHead>Submitted</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {mapRecords.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedUsers.includes(user.id.toString())}
                                                        onCheckedChange={() => toggleSelectUser(user.id.toString())}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                                            <img
                                                                // src={user.photo || "/placeholder.svg"}
                                                                alt={user.listing}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{user.address}</div>
                                                            {/* <div className="text-xs text-gray-500">{user.gender}</div> */}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">{user.linked_org}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{user.submitted}</div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.submitted}
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
                                                            <Check className="h-4 w-4" />
                                                            <span className="sr-only">Chat</span>
                                                        </Button>
                                                        <Button variant="ghost" size="icon">
                                                            <Plus className="h-4 w-4 rotate-45" />
                                                            <span className="sr-only">Flag</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {/* Map Pagination */}
                            <div className="flex items-center justify-between border-t p-4">
                                <div className="text-sm text-gray-500">
                                    Showing {mapIndexFirst + 1}-{Math.min(mapIndexLast, GoogleMapListings.length)} of {GoogleMapListings.length} listings
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setMapPage(prev => Math.max(prev - 1, 1))}
                                        disabled={mapPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    {Array.from({ length: mapTotalPages }, (_, i) => i + 1).map(page => (
                                        <Button
                                            key={page}
                                            variant={page === mapPage ? "default" : "outline"}
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => setMapPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setMapPage(prev => Math.min(prev + 1, mapTotalPages))}
                                        disabled={mapPage === mapTotalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="coach-form" className="mt-4">
                        {/* Form */}
                        <h2 className="heading-title">Form Data - User Submitted Entries</h2>
                        <div>
                            <div className="overflow-x-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">
                                                <Checkbox
                                                    checked={selectedUsers.length === FormsSubmittedData.length}
                                                    onCheckedChange={toggleSelectAll}
                                                />
                                            </TableHead>
                                            <TableHead>User</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Location</TableHead>
                                            <TableHead>Submitted</TableHead>
                                            <TableHead className="text-center">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {formRecords.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedUsers.includes(user.id.toString())}
                                                        onCheckedChange={() => toggleSelectUser(user.id.toString())}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                                            <img
                                                                // src={user.photo || "/placeholder.svg"}
                                                                alt={user.user}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium">{user.user}</div>
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-sm">{user.type}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{user.name}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.location}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">
                                                        {user.submitted}
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
                                                            <Check className="h-4 w-4" />
                                                            <span className="sr-only">Chat</span>
                                                        </Button>
                                                        <Button variant="ghost" size="icon">
                                                            <Plus className="h-4 w-4 rotate-45" />
                                                            <span className="sr-only">Flag</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            {/* Form Pagination */}
                            <div className="flex items-center justify-between border-t p-4">
                                <div className="text-sm text-gray-500">
                                    Showing {formIndexFirst + 1}-{Math.min(formIndexLast, FormsSubmittedData.length)} of {FormsSubmittedData.length} forms
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setFormPage(prev => Math.max(prev - 1, 1))}
                                        disabled={formPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    {Array.from({ length: formTotalPages }, (_, i) => i + 1).map(page => (
                                        <Button
                                            key={page}
                                            variant={page === formPage ? "default" : "outline"}
                                            size="sm"
                                            className="h-8 w-8 p-0"
                                            onClick={() => setFormPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setFormPage(prev => Math.min(prev + 1, formTotalPages))}
                                        disabled={formPage === formTotalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}