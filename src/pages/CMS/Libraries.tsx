import {
  Book,
  Calendar,
  Award,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Pen,
  Archive,
  Check,
  CalendarDays,
} from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  LibraryTableData,
  ExamsTableData,
  ScholarshipsTableData,
  NGOsTableData,
} from "@/Data";

interface BaseResource {
  title: string;
  tags: string[];
  for: string;
  source: string;
  status: string;
  actions: string[];
}

interface LibraryResource extends BaseResource {
  lastUpdated: string;
}

interface NGOResource extends BaseResource {
  lastUpdated: string;
}

interface DateBasedResource extends BaseResource {
  upcomingDate: string;
}

type ResourceItem = LibraryResource | NGOResource | DateBasedResource;

// Define tab structure
const tabs = [
  { id: "library", label: "Library", icon: Book },
  { id: "exams", label: "Exams", icon: Calendar },
  { id: "scholarships", label: "Scholarships", icon: Award },
  { id: "ngos", label: "NGOs", icon: Handshake },
];

// Define stats structure for each tab
const getStats = (activeTab: string) => {
  let data: any[] = [];

  switch (activeTab) {
    case "library":
      data = LibraryTableData;
      break;
    case "exams":
      data = ExamsTableData;
      break;
    case "scholarships":
      data = ScholarshipsTableData;
      break;
    case "ngos":
      data = NGOsTableData;
      break;
  }

  return [
    {
      title: "Total Entries",
      value: data.length.toString(),
      icon: Book,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Published",
      value: data.filter(item => item.status === "Published").length.toString(),
      icon: Check,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Draft",
      value: data.filter(item => item.status === "Draft").length.toString(),
      icon: Pen,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Pending",
      value: data.filter(item => item.status === "Pending").length.toString(),
      icon: Archive,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];
};

export default function Libraries() {
  const [activeTab, setActiveTab] = useState("library");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "library": return LibraryTableData as LibraryResource[];
      case "exams": return ExamsTableData as DateBasedResource[];
      case "scholarships": return ScholarshipsTableData as DateBasedResource[];
      case "ngos": return NGOsTableData as NGOResource[];
      default: return LibraryTableData as LibraryResource[];
    }
  };

  const isLibraryOrNGO = (item: ResourceItem): item is LibraryResource | NGOResource => {
    return 'lastUpdated' in item;
  };

  const isDateBased = (item: ResourceItem): item is DateBasedResource => {
    return 'upcomingDate' in item;
  };

  const currentData = getCurrentData();
  const stats = getStats(activeTab);

  const totalPages = Math.ceil(currentData.length / recordsPerPage);
  const indexLast = page * recordsPerPage;
  const indexFirst = indexLast - recordsPerPage;
  const currentRecords = currentData.slice(indexFirst, indexLast);

  // Reset page and selections when tab changes
  useEffect(() => {
    setPage(1);
    setSelectedItems([]);
  }, [activeTab]);

  const toggleSelectAll = () => {
    if (selectedItems.length === currentRecords.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(currentRecords.map(item => item.title));
    }
  };

  const toggleSelectItem = (title: string) => {
    if (selectedItems.includes(title)) {
      setSelectedItems(selectedItems.filter(t => t !== title));
    } else {
      setSelectedItems([...selectedItems, title]);
    }
  };

  const actionToIcon = {
    "Edit": <Pen className="h-4 w-4" />,
    "Archive": <Archive className="h-4 w-4" />,
    "Publish": <Check className="h-4 w-4" />,
    "Schedule": <CalendarDays className="h-4 w-4" />,
    "Approve": <Check className="h-4 w-4" />,
  };

  return (
    <div className="p-4">
      {/* Tabs Navigation */}


      {/* Stats Cards */}
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
      {/* Tabs Navigation */}
      <div className="flex space-x-4 mb-6 border-b mt-6">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            className={`rounded-b-none ${activeTab === tab.id ? "border-b-2 border-blue-500" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="mr-2 h-4 w-4" />
            {tab.label}
          </Button>
        ))}
      </div>
      {/* Resources Table */}
      <div>
        <h2 className="heading-title">
          {tabs.find(t => t.id === activeTab)?.label} Resources
        </h2>
        <div className="overflow-x-auto mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedItems.length === currentRecords.length &&
                      currentRecords.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>
                  {activeTab === "library" || activeTab === "ngos"
                    ? "Last Updated"
                    : "Upcoming Date"}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((item) => (
                <TableRow key={item.title}>
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.title)}
                      onCheckedChange={() => toggleSelectItem(item.title)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{item.for}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell>
                    {isLibraryOrNGO(item)
                      ? item.lastUpdated ?? "-"
                      : isDateBased(item)
                        ? item.upcomingDate ?? "-"
                        : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === "Published" ? "secondary" : "outline"}
                      className={
                        item.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {item.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="icon"
                          title={action}
                        >
                          {actionToIcon[action as keyof typeof actionToIcon]}
                          <span className="sr-only">{action}</span>
                        </Button>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t p-4">
          <div className="text-sm text-gray-500">
            Showing {indexFirst + 1}-
            {Math.min(indexLast, currentData.length)} of{" "}
            {currentData.length} resources
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}