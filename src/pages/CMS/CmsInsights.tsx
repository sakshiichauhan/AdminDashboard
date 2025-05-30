import { useState } from "react";
import {
  ChevronDown,
  Filter,
  Download,
  Bell,
  Search,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StatsCards } from "@/components/application-component/stats-cards";
import {

  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import  InsightsTable  from "@/components/CMS/Insights/InsightsTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import picture from "@/assets/icon1.png";

export function CmsInsights() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (items: string[]) => {
    setSelectedItems(items);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
       

        <div className="flex flex-col overflow-hidden flex-1">
          <header className="flex h-14 items-center justify-between border-b bg-white px-6 dark:bg-gray-800 w-full">
            <div className="flex items-center md:hidden">
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-4 md:ml-auto">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] pl-8 md:w-[300px]"
                />
              </div>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200">
                      <img
                        src={picture}
                        alt="Admin"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>
                    <span className="hidden md:inline">Admin User</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-2" align="end">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6 w-full">
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">Insights – Admin Desk</h1>
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
                        {/* <div className="mt-6">
                          <InsightsTable 
                            type="published"
                            selectedItems={selectedItems}
                            onSelectItem={handleSelectItem}
                            onSelectAll={handleSelectAll}
                          />
                        </div> */}
                         <Card className="shadow-sm">
          <CardContent className="p-0">
            <Tabs defaultValue="published" className="w-full">
              <div className="border-b border-gray-200 px-6 py-4">
                <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-none lg:inline-flex">
                  <TabsTrigger value="published" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Published Insights
                  </TabsTrigger>
                  <TabsTrigger value="drafts" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Drafts
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Pending Approval
                  </TabsTrigger>
                  <TabsTrigger value="archived" className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                    Archived
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="published" className="p-6">
                <InsightsTable 
                  type="published" 
                  selectedItems={selectedItems}
                  onSelectItem={handleSelectItem}
                  onSelectAll={handleSelectAll}
                />
              </TabsContent>

              <TabsContent value="drafts" className="p-6">
                <InsightsTable 
                  type="drafts" 
                  selectedItems={selectedItems}
                  onSelectItem={handleSelectItem}
                  onSelectAll={handleSelectAll}
                />
              </TabsContent>

              <TabsContent value="pending" className="p-6">
                <InsightsTable 
                  type="pending" 
                  selectedItems={selectedItems}
                  onSelectItem={handleSelectItem}
                  onSelectAll={handleSelectAll}
                />
              </TabsContent>

              <TabsContent value="archived" className="p-6">
                <InsightsTable 
                  type="archived" 
                  selectedItems={selectedItems}
                  onSelectItem={handleSelectItem}
                  onSelectAll={handleSelectAll}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <Card className="mt-6 border-blue-200 bg-blue-50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedItems.length} item(s) selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                    ✅ Approve Selected
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-700 border-red-200 hover:bg-red-50">
                    🗑 Delete Selected
                  </Button>
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50">
                    📤 Export Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
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
            <Input
              placeholder="Search by name, email or phone"
              className="mt-2"
            />
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
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2 ">
          <Button variant="outline">Reset</Button>
          <Button>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}
