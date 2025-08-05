import {
  BookOpenCheck,
  FileEdit,
  Clock,
  ChevronLeft,
  ChevronRight,
  Pen,
  Eye,
  Archive,
  Check,
  X,
  Trash,
  Bell,
  Download,
  Filter,
  Plus
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { Button } from "@/components/ui/button";
import { Users, Building2, UserPlus, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import type { DateRange } from "react-day-picker"
import {
  PublishedTableData,
  DraftsTableData,
  PendingApprovalTableData,
} from "@/Data";
import { Input } from "@/components/ui/input";

const tabs = [
  { id: "published", label: "Published", icon: BookOpenCheck },
  { id: "drafts", label: "Drafts", icon: FileEdit },
  { id: "pending", label: "Pending Approval", icon: Clock },
];
interface Filters {
  source: string;
  status: {
    published: boolean;
    pending: boolean;
  };
  dateRange: DateRange | undefined;
}

const stats = [
  {
    title: "Total Insights Published:",
    value: "468",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Pending Approval",
    value: "23",
    icon: Building2,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Views Last 30 Days",
    value: "19,320",
    icon: UserPlus,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Total Comments on Insights",
    value: "412",
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
]
function AdvancedFilters({
  filters,
  setFilters,
  onReset,
  onApply
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onReset: () => void;
  onApply: () => void;
}) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Source</label>
            <Input
              placeholder="Search by news source"
              className="mt-2"
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <div className="flex flex-wrap gap-4 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={filters.status.published}
                  onCheckedChange={(checked) =>
                    setFilters({
                      ...filters,
                      status: { ...filters.status, published: checked as boolean }
                    })
                  }
                />
                <label htmlFor="published" className="text-sm">
                  Published
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="pending"
                  checked={filters.status.pending}
                  onCheckedChange={(checked) =>
                    setFilters({
                      ...filters,
                      status: { ...filters.status, pending: checked as boolean }
                    })
                  }
                />
                <label htmlFor="pending" className="text-sm">
                  Pending
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="mt-2">
              <DatePickerWithRange
                value={filters.dateRange}
                onChange={(range) => setFilters({ ...filters, dateRange: range })}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-2">
          <Button variant="outline" onClick={onReset}>Reset</Button>
          <Button onClick={onApply}>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  );
}

interface BaseItem {
  title: string;
  author: string;
  category: string;
  actions: string[];
}

interface PublishedItem extends BaseItem {
  tags: string[];
  for: string;
  views: number;
  status: string;
}

interface DraftItem extends BaseItem {
  lastEdited: string;
  suggestedTags: string[];
}

interface PendingItem extends BaseItem {
  submittedOn: string;
  assignedEditor: string;
}

type ContentItem = PublishedItem | DraftItem | PendingItem;

export default function Insights() {
  const [activeTab, setActiveTab] = useState("published");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    source: "",
    status: {
      published: true,
      pending: true
    },
    dateRange: undefined
  });
  const [page, setPage] = useState(1);
  const handleApplyFilters = () => {
    setFiltersOpen(false);
    console.log("Filters applied:", filters);
  };
  const handleResetFilters = () => {
    setFilters({
      source: "",
      status: {
        published: true,
        pending: true,
      },
      dateRange: undefined,
    });
    console.log("Filters reset");
  }
  const recordsPerPage = 5;

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "published": return PublishedTableData;
      case "drafts": return DraftsTableData;
      case "pending": return PendingApprovalTableData;
      default: return PublishedTableData;
    }
  };

  const currentData = getCurrentData();
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
    "View": <Eye className="h-4 w-4" />,
    "Edit": <Pen className="h-4 w-4" />,
    "Archive": <Archive className="h-4 w-4" />,
    "Delete": <Trash className="h-4 w-4" />,
    "Review": <Eye className="h-4 w-4" />,
    "Approve": <Check className="h-4 w-4" />,
    "Reject": <X className="h-4 w-4" />,
  };

  const isPublishedItem = (item: ContentItem): item is PublishedItem => {
    return 'views' in item;
  };

  const isDraftItem = (item: ContentItem): item is DraftItem => {
    return 'suggestedTags' in item;
  };

  const isPendingItem = (item: ContentItem): item is PendingItem => {
    return 'assignedEditor' in item;
  };

  const getTagsToDisplay = (item: ContentItem): string[] => {
    if (isPublishedItem(item)) return item.tags;
    if (isDraftItem(item)) return item.suggestedTags;
    if (isPendingItem(item)) return [item.assignedEditor];
    return [];
  };

  return (
    <div className="p-4">
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
      <div className="flex justify-end mb-6 mt-6">
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
        <AdvancedFilters
          filters={filters}
          setFilters={setFilters}
          onReset={handleResetFilters}
          onApply={handleApplyFilters}
        />
      )}

      {/* Tabs */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              className={`rounded-b-none rounded-r-lg ${activeTab === tab.id
                ? "border-b-2 border-primary bg-primary text-primary-foreground"
                : "hover:bg-accent hover:text-accent-foreground"
                } transition-colors duration-75`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="h-4 w-15" />
              {tab.label}
            </Button>
          ))}
        </div>
        <Button>
          <Plus className="text-white" />
          <span>Add Insight</span>
        </Button>
      </div>

      {/* Content Section */}
      <div>
        {/* Selection Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedItems.length === currentRecords.length && currentRecords.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
            {selectedItems.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {selectedItems.length} selected
              </Badge>
            )}
          </div>

          {selectedItems.length > 0 && (
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

        {/* Content Table */}
        <div>
          <h2 className="heading-title">
            {tabs.find(t => t.id === activeTab)?.label} Content
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
                  <TableHead>Author</TableHead>
                  {activeTab === "published" && <TableHead>Category</TableHead>}
                  <TableHead>
                    {activeTab === "published"
                      ? "Tags"
                      : activeTab === "drafts"
                        ? "Suggested Tags"
                        : "Assigned Editor"}
                  </TableHead>
                  {activeTab === "published" && <TableHead>Audience</TableHead>}
                  {activeTab === "published" && <TableHead>Views</TableHead>}
                  {activeTab === "drafts" && <TableHead>Last Edited</TableHead>}
                  {activeTab === "pending" && <TableHead>Submitted On</TableHead>}
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(currentRecords as ContentItem[]).map((item) => (
                  <TableRow key={item.title}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.title)}
                        onCheckedChange={() => toggleSelectItem(item.title)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.author}</TableCell>

                    {activeTab === "published" && (
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                    )}

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {getTagsToDisplay(item).map((tag, idx: number) => (
                          <Badge
                            key={idx}
                            variant={
                              activeTab === "pending" ? "secondary" : "outline"
                            }
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>

                    {activeTab === "published" && isPublishedItem(item) && (
                      <TableCell>{item.for}</TableCell>
                    )}

                    {activeTab === "published" && isPublishedItem(item) && (
                      <TableCell>
                        <Badge variant="secondary">
                          {item.views.toLocaleString()}
                        </Badge>
                      </TableCell>
                    )}

                    {activeTab === "drafts" && isDraftItem(item) && (
                      <TableCell>{item.lastEdited}</TableCell>
                    )}

                    {activeTab === "pending" && isPendingItem(item) && (
                      <TableCell>{item.submittedOn}</TableCell>
                    )}

                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {item.actions.map((action, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            title={action}
                            className={
                              action === "View" ? "text-blue-500" :
                                action === "Delete" || action === "Reject" ? "text-[#000000]" :
                                  action === "Approve" ? "text-[#000000]" : ""
                            }
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
              {currentData.length} items
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
    </div>
  );
}