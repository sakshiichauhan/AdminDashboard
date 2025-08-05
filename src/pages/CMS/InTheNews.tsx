import {
  Users,
  Building2,
  UserPlus,
  MessageSquare,
  Check,
  Plus,
  Filter,
} from "lucide-react";
import { Bell, Download, X } from "lucide-react"
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { NewsMentionsData } from "@/Data";
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import type { DateRange } from "react-day-picker";

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
    title: "Total Insights Published",
    value: " 468",
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
    value: " 412",
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
];

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

export default function InTheNews() {
  const [selectedNews, setSelectedNews] = useState<string[]>([]);
  const [newsPage, setNewsPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    source: "",
    status: {
      published: true,
      pending: true,
    },
    dateRange: undefined,
  });
  const recordsPerPage = 5;

  // Apply filters to the data
  const filteredData = useMemo(() => {
    return NewsMentionsData.filter((news) => {
      // Source filter
      if (filters.source && !news.source.toLowerCase().includes(filters.source.toLowerCase())) {
        return false;
      }

      // Status filter
      if (!filters.status.published && news.status === "Published") {
        return false;
      }
      if (!filters.status.pending && news.status === "Pending") {
        return false;
      }

      // Date range filter
      if (filters.dateRange?.from || filters.dateRange?.to) {
        const newsDate = new Date(news.date);
        if (filters.dateRange.from && newsDate < filters.dateRange.from) {
          return false;
        }
        if (filters.dateRange.to && newsDate > filters.dateRange.to) {
          return false;
        }
      }

      return true;
    });
  }, [filters, NewsMentionsData]);

  const newsTotalPages = Math.ceil(filteredData.length / recordsPerPage);
  const newsIndexLast = newsPage * recordsPerPage;
  const newsIndexFirst = newsIndexLast - recordsPerPage;
  const newsRecords = filteredData.slice(newsIndexFirst, newsIndexLast);

  const toggleSelectAll = () => {
    if (selectedNews.length === newsRecords.length) {
      setSelectedNews([]);
    } else {
      setSelectedNews(newsRecords.map((news) => news.id));
    }
  };

  const toggleSelectNews = (newsId: string) => {
    if (selectedNews.includes(newsId)) {
      setSelectedNews(selectedNews.filter((id) => id !== newsId));
    } else {
      setSelectedNews([...selectedNews, newsId]);
    }
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
    setNewsPage(1);
  };

  const handleApplyFilters = () => {
    setNewsPage(1);
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

      {/* Filters section */}
      <div className="flex justify-end mb-6">
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

      {/* News Mentions Table */}
      <div>
        <h2 className="heading-title">News Mentions</h2>

        {/* Selection Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedNews.length === newsRecords.length && newsRecords.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
            {selectedNews.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {selectedNews.length} selected
              </Badge>
            )}
          </div>

          {selectedNews.length > 0 && (
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

        <div className="overflow-x-auto mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsRecords.map((news) => (
                <TableRow key={news.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedNews.includes(news.id)}
                      onCheckedChange={() => toggleSelectNews(news.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={`/placeholder-logo.svg`}
                        alt="Logo"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{news.title}</TableCell>
                  <TableCell>{news.source}</TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      {news.link}
                    </a>
                  </TableCell>
                  <TableCell>{news.clicks}</TableCell>
                  <TableCell>{news.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={news.status === "Published" ? "secondary" : "outline"}
                      className={
                        news.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {news.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {news.actions.map((action, i) => (
                        <Button key={i} variant="ghost" size="sm">
                          {action === "Edit" && <Eye className="h-4 w-4 mr-1" />}
                          {action === "Archive" && <Plus className="h-4 w-4 mr-1 rotate-45" />}
                          {action === "Review" && <Check className="h-4 w-4 mr-1" />}
                          {action}
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
            Showing {newsIndexFirst + 1}-{Math.min(newsIndexLast, NewsMentionsData.length)} of{" "}
            {NewsMentionsData.length} mentions
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNewsPage((prev) => Math.max(prev - 1, 1))}
              disabled={newsPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: newsTotalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === newsPage ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setNewsPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNewsPage((prev) => Math.min(prev + 1, newsTotalPages))}
              disabled={newsPage === newsTotalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
