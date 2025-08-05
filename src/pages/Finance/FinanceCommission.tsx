import { Building2, UserCheck, Globe, Clock, Link, MessageSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Download, Filter, ChevronRight, ChevronLeft, Eye, Bell } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FinanceCommissionsTableData } from "@/Data";

const FinanceCommissionStats = [
  {
    title: "Total Commissions Earned",
    value: "1438",
    icon: Building2,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Coaches with Commissions",
    value: "456",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Pending Payouts",
    value: "982",
    icon: Globe,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Pending Approvals",
    value: "12",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Session Commissions",
    value: "182",
    icon: Link,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    title: "Product Commissions",
    value: "720+",
    icon: MessageSquare,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  }
];

export default function FinanceCommissions() {
  const [showFilter, setShowFilter] = useState(false);

  return <div className="p-6">
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <h1 className="text-2xl font-bold">Finance Commissions</h1>
      <div className="flex gap-2">
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button>Bulk Actions</Button>
      </div>
    </div>
    <div>
      <div>
        <FinanceCommissionCard />
        {showFilter && <FinanceCommissionFilter />}
        <div className="flex justify-end mt-4 p-4">
          <Button
            variant="outline"
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilter ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        <FinanceCommissionsTable />
      </div>
    </div>
  </div>
}

function FinanceCommissionCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2 py-1">
      {FinanceCommissionStats.map((stat, index) => (
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
  )
}

function FinanceCommissionFilter() {
  return (
    <div className="p-4">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search by Name / Code / Role</label>
              <Input placeholder="Search by name, code or role" className="mt-2" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Commission Type</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="Session" />
                  <label htmlFor="Session" className="text-sm">
                    Session
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="Referral" />
                  <label htmlFor="Referral" className="text-sm">
                    Referral
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="Campaign" />
                  <label htmlFor="Campaign" className="text-sm">
                    Campaign
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="paid" />
                  <label htmlFor="paid" className="text-sm">
                    Paid
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending" />
                  <label htmlFor="pending" className="text-sm">
                    Pending
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="cancelled" />
                  <label htmlFor="cancelled" className="text-sm">
                    Cancelled
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="mt-2">
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
    </div>
  )
}
function FinanceCommissionsTable() {
  const [selectedCommissions, setSelectedCommissions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(FinanceCommissionsTableData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = FinanceCommissionsTableData.slice(indexOfFirstRecord, indexOfLastRecord);

  const toggleSelectAll = () => {
    if (selectedCommissions.length === currentRecords.length) {
      setSelectedCommissions([]);
    } else {
      setSelectedCommissions(currentRecords.map(commission => commission["Linked Session/Order"]));
    }
  };

  const toggleSelectCommission = (sessionId: string) => {
    if (selectedCommissions.includes(sessionId)) {
      setSelectedCommissions(selectedCommissions.filter(id => id !== sessionId));
    } else {
      setSelectedCommissions([...selectedCommissions, sessionId]);
    }
  };

  return (
    <div className="rounded-md border bg-white p-5">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all-commissions"
            checked={selectedCommissions.length === currentRecords.length && currentRecords.length > 0}
            onCheckedChange={toggleSelectAll}
          />
          <label htmlFor="select-all-commissions" className="text-sm font-medium">
            Select All
          </label>
          {selectedCommissions.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {selectedCommissions.length} selected
            </Badge>
          )}
        </div>

        {selectedCommissions.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Selected
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Send Notifications
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Commission Type</TableHead>
              <TableHead>Linked Session/Order</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date Earned</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((commission) => (
              <TableRow key={commission["Linked Session/Order"]}>
                <TableCell>
                  <Checkbox
                    checked={selectedCommissions.includes(commission["Linked Session/Order"])}
                    onCheckedChange={() => toggleSelectCommission(commission["Linked Session/Order"])}
                  />
                </TableCell>
                <TableCell className="font-medium">{commission.Name}</TableCell>
                <TableCell>{commission.Role}</TableCell>
                <TableCell>{commission["Commission Type"]}</TableCell>
                <TableCell>{commission["Linked Session/Order"]}</TableCell>
                <TableCell>{commission.Amount}</TableCell>
                <TableCell>{commission["Date Earned"]}</TableCell>
                <TableCell>
                  <Badge
                    variant={commission.Status === "Paid" ? "secondary" : "outline"}
                    className={
                      commission.Status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : commission.Status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {commission.Status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    {commission.Actions.includes("View") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View Details"
                        className="text-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {commission.Actions.includes("Invoice") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Download Invoice"
                        className="text-purple-500"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, FinanceCommissionsTableData.length)} of {FinanceCommissionsTableData.length} commissions
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}