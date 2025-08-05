import { useState } from "react"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@radix-ui/react-checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Download, Filter } from "lucide-react"
import { DatePickerWithRange } from "@/components/application-component/date-range-picker"
import StatsCards from "@/components/application-component/stats-cards"
import { ExplorerTable } from "@/components/application-component/explorer-table"


export default function Explorer() {
    const [filtersOpen, setFiltersOpen] = useState(false)
    return (
        <div>
            <main className="flex-1 overflow-auto p-6 w-full">
                <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold">Explorers Dashboard</h1>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Download className="h-4 w-4" />
                            Export
                        </Button>
                        <Button>Bulk Actions</Button>
                    </div>
                </div>

                <StatsCards />

                {filtersOpen && <AdvancedFilters />}
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

                <div className="mt-6">
                    {/* <ExplorerTable onViewUser={onViewUser} /> */}
                    <ExplorerTable/>
                </div>
            </main>
        </div>
    )
}


function AdvancedFilters() {
    return (
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
                        <label className="text-sm font-medium">User Type</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="registered" />
                                <label htmlFor="registered" className="text-sm">
                                    Registered
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="enquiry" />
                                <label htmlFor="enquiry" className="text-sm">
                                    Enquiry
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="inactive" />
                                <label htmlFor="inactive" className="text-sm">
                                    Inactive
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Age Group</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="age-10-13" />
                                <label htmlFor="age-10-13" className="text-sm">
                                    10-13
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="age-14-17" />
                                <label htmlFor="age-14-17" className="text-sm">
                                    14-17
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="age-18-25" />
                                <label htmlFor="age-18-25" className="text-sm">
                                    18-25
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="age-25-plus" />
                                <label htmlFor="age-25-plus" className="text-sm">
                                    25+
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Class / Grade</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="class-6-12" />
                                <label htmlFor="class-6-12" className="text-sm">
                                    6-12
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="college" />
                                <label htmlFor="college" className="text-sm">
                                    College
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="graduate" />
                                <label htmlFor="graduate" className="text-sm">
                                    Graduate
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
                        <label className="text-sm font-medium">Test Status</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="test-taken" />
                                <label htmlFor="test-taken" className="text-sm">
                                    Taken
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="test-not-taken" />
                                <label htmlFor="test-not-taken" className="text-sm">
                                    Not Taken
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="test-in-progress" />
                                <label htmlFor="test-in-progress" className="text-sm">
                                    In Progress
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Session Status</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center space-x-1">
                                <Checkbox id="session-booked" />
                                <label htmlFor="session-booked" className="text-sm">
                                    Booked
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="session-completed" />
                                <label htmlFor="session-completed" className="text-sm">
                                    Completed
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="session-missed" />
                                <label htmlFor="session-missed" className="text-sm">
                                    Missed
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="session-none" />
                                <label htmlFor="session-none" className="text-sm">
                                    No Sessions
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Referral Source</label>
                        <div className="flex flex-wrap gap-4 mt-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="source-ba" />
                                <label htmlFor="source-ba" className="text-sm">
                                    BA
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="source-consultant" />
                                <label htmlFor="source-consultant" className="text-sm">
                                    Consultant
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="source-organisation" />
                                <label htmlFor="source-organisation" className="text-sm">
                                    Organisation
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="source-organic" />
                                <label htmlFor="source-organic" className="text-sm">
                                    Organic
                                </label>
                            </div>
                        </div>
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
    )
}
