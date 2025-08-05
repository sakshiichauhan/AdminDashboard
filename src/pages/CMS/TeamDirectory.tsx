import {
  Users,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
  Pen,
  Eye,
  User,
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
import { teamDirectoryTableData } from "@/Data";

const stats = [
  {
    title: "Total Team Members",
    value: teamDirectoryTableData.length.toString(),
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Members",
    value: teamDirectoryTableData.filter(m => m.status === "Active").length.toString(),
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Content Team",
    value: teamDirectoryTableData.filter(m => m.role.includes("Content")).length.toString(),
    icon: User,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Inactive Members",
    value: teamDirectoryTableData.filter(m => m.status === "Inactive").length.toString(),
    icon: UserX,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
];

export default function TeamDirectory() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(teamDirectoryTableData.length / recordsPerPage);
  const indexLast = page * recordsPerPage;
  const indexFirst = indexLast - recordsPerPage;
  const currentRecords = teamDirectoryTableData.slice(indexFirst, indexLast);

  const toggleSelectAll = () => {
    if (selectedMembers.length === currentRecords.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(currentRecords.map(m => m.name));
    }
  };

  const toggleSelectMember = (name: string) => {
    if (selectedMembers.includes(name)) {
      setSelectedMembers(selectedMembers.filter(n => n !== name));
    } else {
      setSelectedMembers([...selectedMembers, name]);
    }
  };

  const actionToIcon = {
    "Edit": <Pen className="h-4 w-4" />,
    "Deactivate": <UserX className="h-4 w-4" />,
    "View Profile": <Eye className="h-4 w-4" />,
    "Activate": <UserCheck className="h-4 w-4" />,
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

      {/* Team Directory Table */}
      <div className="mt-6">
        <h2 className="heading-title">Team Directory</h2>
        <div className="overflow-x-auto mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      selectedMembers.length === currentRecords.length &&
                      currentRecords.length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((member) => (
                <TableRow key={member.name}>
                  <TableCell>
                    <Checkbox
                      checked={selectedMembers.includes(member.name)}
                      onCheckedChange={() => toggleSelectMember(member.name)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={member.picture}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <a
                      href="#"
                      className="text-blue-500 hover:text-blue-700 underline"
                    >
                      {member.linkedin}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={member.status === "Active" ? "secondary" : "outline"}
                      className={
                        member.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {member.actions.map((action, index) => (
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
            {Math.min(indexLast, teamDirectoryTableData.length)} of{" "}
            {teamDirectoryTableData.length} members
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