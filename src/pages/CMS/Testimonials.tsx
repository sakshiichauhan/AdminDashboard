import {
  Users,
  Building2,
  UserPlus,

  Check,

  Pen,
  Archive,
  Eye,
  ChevronLeft,
  ChevronRight,
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
import { testimonialsData } from "@/Data";

const stats = [
  {
    title: "Total Testimonials",
    value: testimonialsData.length.toString(),
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Pending Approval",
    value: testimonialsData.filter(t => t.status === "Pending").length.toString(),
    icon: Building2,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Published",
    value: testimonialsData.filter(t => t.status === "Published").length.toString(),
    icon: Check,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Video Testimonials",
    value: testimonialsData.filter(t => t.type === "Video").length.toString(),
    icon: UserPlus,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
];

export default function Testimonials() {
  const [selectedTestimonials, setSelectedTestimonials] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(testimonialsData.length / recordsPerPage);
  const indexLast = page * recordsPerPage;
  const indexFirst = indexLast - recordsPerPage;
  const currentRecords = testimonialsData.slice(indexFirst, indexLast);

  const toggleSelectAll = () => {
    if (selectedTestimonials.length === currentRecords.length) {
      setSelectedTestimonials([]);
    } else {
      setSelectedTestimonials(currentRecords.map(t => t.id));
    }
  };

  const toggleSelectTestimonial = (id: string) => {
    if (selectedTestimonials.includes(id)) {
      setSelectedTestimonials(selectedTestimonials.filter(i => i !== id));
    } else {
      setSelectedTestimonials([...selectedTestimonials, id]);
    }
  };

  const actionToIcon = {
    "Edit": <Pen className="h-4 w-4" />,
    "Archive": <Archive className="h-4 w-4" />,
    "View Video": <Eye className="h-4 w-4" />,
    "Review": <Eye className="h-4 w-4" />,
    "Publish": <Check className="h-4 w-4" />,
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

      {/* Testimonials Table */}
      <div className="mt-6">
        <h2 className="heading-title">Testimonials</h2>
        <div className="overflow-x-auto mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedTestimonials.length === currentRecords.length &&
                      currentRecords.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>For</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedTestimonials.includes(testimonial.id)}
                      onCheckedChange={() => toggleSelectTestimonial(testimonial.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={`/${testimonial.picture}`}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{testimonial.name}</TableCell>
                  <TableCell>{testimonial.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{testimonial.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{testimonial.audience}</Badge>
                  </TableCell>
                  <TableCell>{testimonial.type}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {testimonial.contentPreview}
                  </TableCell>
                  <TableCell>{testimonial.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={testimonial.status === "Published" ? "secondary" : "outline"}
                      className={
                        testimonial.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {testimonial.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {testimonial.actions.map((action, index) => (
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
            {Math.min(indexLast, testimonialsData.length)} of{" "}
            {testimonialsData.length} testimonials
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