import {
  ClipboardList,
  CheckCircle,
  FileText,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Pen,

  Play,

  Archive,
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
import { useState } from "react";
import { HelpArticlesTableData } from "@/Data";

const stats = [
  {
    title: "Total Articles",
    value: HelpArticlesTableData.length.toString(),
    icon: ClipboardList,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Published Articles",
    value: HelpArticlesTableData.filter(a => a.status === "Published").length.toString(),
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Draft Articles",
    value: HelpArticlesTableData.filter(a => a.status === "Draft").length.toString(),
    icon: FileText,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Categories",
    value: [...new Set(HelpArticlesTableData.map(a => a.category))].length.toString(),
    icon: BarChart2,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];

export default function HelpArticles() {
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(HelpArticlesTableData.length / recordsPerPage);
  const indexLast = page * recordsPerPage;
  const indexFirst = indexLast - recordsPerPage;
  const currentRecords = HelpArticlesTableData.slice(indexFirst, indexLast);

  const toggleSelectAll = () => {
    if (selectedArticles.length === currentRecords.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(currentRecords.map(article => article.title));
    }
  };

  const toggleSelectArticle = (title: string) => {
    if (selectedArticles.includes(title)) {
      setSelectedArticles(selectedArticles.filter(t => t !== title));
    } else {
      setSelectedArticles([...selectedArticles, title]);
    }
  };

  const actionToIcon = {
    "Edit": <Pen className="h-4 w-4" />,
    "Archive": <Archive className="h-4 w-4" />,
    "Publish": <Play className="h-4 w-4" />,
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

      {/* Articles Table */}
      <div className="mt-6">
        <h2 className="heading-title">Help Articles</h2>
        <div className="overflow-x-auto mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedArticles.length === currentRecords.length &&
                      currentRecords.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>For</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((article) => (
                <TableRow key={article.title}>
                  <TableCell>
                    <Checkbox
                      checked={selectedArticles.includes(article.title)}
                      onCheckedChange={() => toggleSelectArticle(article.title)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {article.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{article.for}</TableCell>
                  <TableCell>{article.author}</TableCell>
                  <TableCell>
                    <Badge
                      variant={article.status === "Published" ? "secondary" : "outline"}
                      className={
                        article.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {article.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="icon"
                          title={action}
                          className={
                            action === "Archive" ? "text-red-500" :
                              action === "Publish" ? "text-green-500" : ""
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
            {Math.min(indexLast, HelpArticlesTableData.length)} of{" "}
            {HelpArticlesTableData.length} articles
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