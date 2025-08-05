import {
  ClipboardList,
  CheckCircle,
  FileText,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  Pen,

  Play,
  Trash,
} from "lucide-react";
import { Bell, Download, X } from "lucide-react"
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
import { SurveysTableData } from "@/Data";

const stats = [
  {
    title: "Total Surveys",
    value: SurveysTableData.length.toString(),
    icon: ClipboardList,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Surveys",
    value: SurveysTableData.filter(
      (s) => s.status === "Active"
    ).length.toString(),
    icon: CheckCircle,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Responses",
    value: SurveysTableData.reduce(
      (sum, survey) => sum + survey.responses,
      0
    ).toLocaleString(),
    icon: BarChart2,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Draft Surveys",
    value: SurveysTableData.filter(
      (s) => s.status === "Draft"
    ).length.toString(),
    icon: FileText,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
];

export default function Surveys() {
  const [selectedSurveys, setSelectedSurveys] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(SurveysTableData.length / recordsPerPage);
  const indexLast = page * recordsPerPage;
  const indexFirst = indexLast - recordsPerPage;
  const currentRecords = SurveysTableData.slice(indexFirst, indexLast);

  const toggleSelectAll = () => {
    if (selectedSurveys.length === currentRecords.length) {
      setSelectedSurveys([]);
    } else {
      setSelectedSurveys(currentRecords.map((survey) => survey.title));
    }
  };

  const toggleSelectSurvey = (title: string) => {
    if (selectedSurveys.includes(title)) {
      setSelectedSurveys(selectedSurveys.filter((t) => t !== title));
    } else {
      setSelectedSurveys([...selectedSurveys, title]);
    }
  };

  const actionToIcon = {
    Edit: <Pen className="h-4 w-4" />,
    Results: <BarChart2 className="h-4 w-4" />,
    Close: <X className="h-4 w-4" />,
    Activate: <Play className="h-4 w-4" />,
    Delete: <Trash className="h-4 w-4" />,
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

      {/* Surveys Table */}
      <div className="mt-6">
        <h2 className="heading-title">Surveys</h2>

        {/* Selection Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="select-all"
              checked={selectedSurveys.length === currentRecords.length && currentRecords.length > 0}
              onCheckedChange={toggleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
            {selectedSurveys.length > 0 && (
              <Badge variant="outline" className="ml-2">
                {selectedSurveys.length} selected
              </Badge>
            )}
          </div>

          {selectedSurveys.length > 0 && (
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
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectedSurveys.length === currentRecords.length && currentRecords.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Audience</TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((survey) => (
                <TableRow key={survey.title}>
                  <TableCell>
                    <Checkbox
                      checked={selectedSurveys.includes(survey.title)}
                      onCheckedChange={() => toggleSelectSurvey(survey.title)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{survey.title}</TableCell>
                  <TableCell>{survey.createdBy}</TableCell>
                  <TableCell>{survey.for}</TableCell>
                  <TableCell>{survey.questions}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {survey.responses.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={survey.status === "Active" ? "secondary" : "outline"}
                      className={
                        survey.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {survey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{survey.lastUpdated}</TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {survey.actions.map((action, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="icon"
                          title={action}
                          className={
                            action === "Results"
                              ? "text-[#000000]"
                              : action === "Close"
                                ? "text-[#000000]"
                                : action === "Activate"
                                  ? "text-[#000000]"
                                  : action === "Delete"
                                    ? "text-[#000000]"
                                    : ""
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
            {Math.min(indexLast, SurveysTableData.length)} of{" "}
            {SurveysTableData.length} surveys
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
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
