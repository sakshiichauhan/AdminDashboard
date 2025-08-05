import {
  ClipboardList,
  CheckCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Card, CardHeader} from "@/components/ui/card";
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
import { FAQsTableData } from "@/Data";

const stats = [
  {
    title: "Total FAQ Pages",
    value: FAQsTableData.length.toString(),
    icon: ClipboardList,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active FAQs",
    value: FAQsTableData.filter(f => f.status === "Active").length.toString(),
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Draft FAQs",
    value: FAQsTableData.filter(f => f.status === "Draft").length.toString(),
    icon: FileText,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Total Questions",
    value: FAQsTableData.reduce((sum, faq) => sum + faq.questions, 0).toString(),
    icon: Eye,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];

export default function FAQSPage() {
  const [selectedFAQs, setSelectedFAQs] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(FAQsTableData.length / recordsPerPage);
  const indexLast = page * recordsPerPage;
  const indexFirst = indexLast - recordsPerPage;
  const currentRecords = FAQsTableData.slice(indexFirst, indexLast);

  const toggleSelectAll = () => {
    if (selectedFAQs.length === currentRecords.length) {
      setSelectedFAQs([]);
    } else {
      setSelectedFAQs(currentRecords.map(faq => faq.pageTitle));
    }
  };

  const toggleSelectFAQ = (pageTitle: string) => {
    if (selectedFAQs.includes(pageTitle)) {
      setSelectedFAQs(selectedFAQs.filter(t => t !== pageTitle));
    } else {
      setSelectedFAQs([...selectedFAQs, pageTitle]);
    }
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

      {/* FAQs Table */}
      <div className="mt-6">
        <h2 className="heading-title">FAQ Pages</h2>
        <div className="overflow-x-auto mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedFAQs.length === currentRecords.length &&
                      currentRecords.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Page Title</TableHead>
                <TableHead>For</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((faq) => (
                <TableRow key={faq.pageTitle}>
                  <TableCell>
                    <Checkbox
                      checked={selectedFAQs.includes(faq.pageTitle)}
                      onCheckedChange={() => toggleSelectFAQ(faq.pageTitle)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{faq.pageTitle}</TableCell>
                  <TableCell>{faq.for}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {faq.questions}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={faq.status === "Active" ? "secondary" : "outline"}
                      className={
                        faq.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {faq.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{faq.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View FAQs <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
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
            {Math.min(indexLast, FAQsTableData.length)} of{" "}
            {FAQsTableData.length} FAQ pages
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