import { Building2, UserCheck, Globe, Clock, Link, MessageSquare, Check } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Download, Filter, ChevronRight, ChevronLeft, Eye, Bell, X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FinancePayoutsTableData } from "@/Data";

const FinancePayoutStats = [
  {
    title: "Total Requests Received",
    value: "134",
    icon: Building2,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Approved Requests",
    value: "105",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Approved Withdrawals",
    value: "₹5,400",
    icon: Globe,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Pending Requests",
    value: "12",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Pending Withdrawals",
    value: " ₹3,200",
    icon: Link,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    title: "Rejected Requests",
    value: "8",
    icon: MessageSquare,
    color: "text-indigo-500",
    bgColor: "bg-indigo-100",
  }

];

export default function FinancePayouts() {
  const [showFilter, setShowFilter] = useState(false);

  return <div className="p-6">
    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <h1 className="text-2xl font-bold">Finance Payouts</h1>
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
        <FinancePayoutCard />
        {showFilter && <FinancePayoutFilter />}
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
        <FinancePayoutsTable />
      </div>
    </div>
  </div>
}

function FinancePayoutCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-2 py-1">
      {FinancePayoutStats.map((stat, index) => (
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
function FinancePayoutFilter() {
  return (
    <div className="p-4">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search by Name / Request ID</label>
              <Input placeholder="Search by name or request ID" className="mt-2" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="pending" />
                  <label htmlFor="pending" className="text-sm">
                    Pending
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="approved" />
                  <label htmlFor="approved" className="text-sm">
                    Approved
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rejected" />
                  <label htmlFor="rejected" className="text-sm">
                    Rejected
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Amount Range</label>
              <div className="flex gap-2 mt-2">
                <Input placeholder="₹ From" className="w-full" />
                <Input placeholder="₹ To" className="w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Date Range</label>
              <div className="mt-2">
                <DatePickerWithRange />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-2">
            <Button variant="outline">Reset</Button>
            <Button>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FinancePayoutsTable() {
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(FinancePayoutsTableData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = FinancePayoutsTableData.slice(indexOfFirstRecord, indexOfLastRecord);

  const toggleSelectAll = () => {
    if (selectedPayouts.length === currentRecords.length) {
      setSelectedPayouts([]);
    } else {
      setSelectedPayouts(currentRecords.map(payout => payout["Request ID"]));
    }
  };

  const toggleSelectPayout = (requestId: string) => {
    if (selectedPayouts.includes(requestId)) {
      setSelectedPayouts(selectedPayouts.filter(id => id !== requestId));
    } else {
      setSelectedPayouts([...selectedPayouts, requestId]);
    }
  };

  return (
    <div className="rounded-md border bg-white p-5">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all-payouts"
            checked={selectedPayouts.length === currentRecords.length && currentRecords.length > 0}
            onCheckedChange={toggleSelectAll}
          />
          <label htmlFor="select-all-payouts" className="text-sm font-medium">
            Select All
          </label>
          {selectedPayouts.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {selectedPayouts.length} selected
            </Badge>
          )}
        </div>

        {selectedPayouts.length > 0 && (
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
              <TableHead>Request ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Partner Balance</TableHead>
              <TableHead>Approval Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((payout) => (
              <TableRow key={payout["Request ID"]}>
                <TableCell>
                  <Checkbox
                    checked={selectedPayouts.includes(payout["Request ID"])}
                    onCheckedChange={() => toggleSelectPayout(payout["Request ID"])}
                  />
                </TableCell>
                <TableCell className="font-medium">{payout.Name}</TableCell>
                <TableCell>{payout["Request ID"]}</TableCell>
                <TableCell>{payout.Amount}</TableCell>
                <TableCell>{payout["Partner Balance"]}</TableCell>
                <TableCell>
                  <Badge variant="outline">{payout["Approval Type"]}</Badge>
                </TableCell>
                <TableCell>{payout.Date}</TableCell>
                <TableCell>
                  <Badge
                    variant={payout.Status === "Approved" ? "secondary" : "outline"}
                    className={
                      payout.Status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : payout.Status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {payout.Status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[200px] truncate">{payout.Notes}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    {payout.Actions.includes("View") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="View Details"
                        className="text-blue-500"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {payout.Actions.includes("Download") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Download"
                        className="text-purple-500"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                    {payout.Actions.includes("Approve") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Approve"
                        className="text-green-500"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    {payout.Actions.includes("Reject") && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Reject"
                        className="text-red-500"
                      >
                        <X className="h-4 w-4" />
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
          Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, FinancePayoutsTableData.length)} of {FinancePayoutsTableData.length} payouts
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