import {
  Clock,
  Download,
  Filter,
  ChevronRight,
  ChevronLeft,
  Flag,
  Eye,
  Bell,

  CreditCard,
  FileText,
  IndianRupee
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DatePickerWithRange } from "@/components/application-component/date-range-picker";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { FinancePaymentsTableData } from "@/Data";

const stats = [
  {
    title: "Total Earnings Collected",
    value: "₹7,58,300",
    icon: CreditCard,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Aimshala Earnings (Platform Fee)",
    value: "₹1,79,200",
    icon: FileText,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Total Payouts Made",
    value: "₹4,65,500",
    icon: IndianRupee,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Pending Payouts",
    value: "₹23,000",
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  }
];

export default function FinancePaymentsPage() {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">Payment Transactions</h1>
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
          <FinanceCard />
          {showFilter && <FinanceFilter />}
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
          <FinancePaymentsTable />
        </div>
      </div>
    </div>
  );
}

function FinanceCard() {
  return (
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
  );
}

function FinanceFilter() {
  return (
    <div className="p-4">
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Filter By: User / Coach / Source / Code</label>
              <Input placeholder="Search by user, coach, source or code" className="mt-2" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction Type</label>
              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="earnings" />
                  <label htmlFor="earnings" className="text-sm">
                    Earnings
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="refunds" />
                  <label htmlFor="refunds" className="text-sm">
                    Refunds
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="platform-fee" />
                  <label htmlFor="platform-fee" className="text-sm">
                    Platform Fee
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="payouts" />
                  <label htmlFor="payouts" className="text-sm">
                    Payouts
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

          <div className="mt-8 flex justify-end gap-2">
            <Button variant="outline">Reset</Button>
            <Button>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FinancePaymentsTable() {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const totalPages = Math.ceil(FinancePaymentsTableData.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = FinancePaymentsTableData.slice(indexOfFirstRecord, indexOfLastRecord);

  const toggleSelectAll = () => {
    if (selectedPayments.length === currentRecords.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(currentRecords.map(payment => payment["Order ID"]));
    }
  };

  const toggleSelectPayment = (orderId: string) => {
    if (selectedPayments.includes(orderId)) {
      setSelectedPayments(selectedPayments.filter(id => id !== orderId));
    } else {
      setSelectedPayments([...selectedPayments, orderId]);
    }
  };

  return (
    <div className="rounded-md border bg-white p-5">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="select-all"
            checked={selectedPayments.length === currentRecords.length && currentRecords.length > 0}
            onCheckedChange={toggleSelectAll}
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All
          </label>
          {selectedPayments.length > 0 && (
            <Badge variant="outline" className="ml-2">
              {selectedPayments.length} selected
            </Badge>
          )}
        </div>

        {selectedPayments.length > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Selected
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              Send Receipt
            </Button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>User</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Code Used</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>PG Charges</TableHead>
              <TableHead>Aimshala Earning</TableHead>
              <TableHead>Partner Earning</TableHead>
              <TableHead>Payout Status</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRecords.map((payment) => (
              <TableRow key={payment["Order ID"]}>
                <TableCell>
                  <Checkbox
                    checked={selectedPayments.includes(payment["Order ID"])}
                    onCheckedChange={() => toggleSelectPayment(payment["Order ID"])}
                  />
                </TableCell>
                <TableCell className="font-medium">{payment.User}</TableCell>
                <TableCell>{payment["Order ID"]}</TableCell>
                <TableCell>{payment.Source}</TableCell>
                <TableCell>{payment.Amount}</TableCell>
                <TableCell>
                  <Badge variant="outline">{payment["Code Used"]}</Badge>
                </TableCell>
                <TableCell>{payment["Payment Date"]}</TableCell>
                <TableCell>
                  <Badge
                    variant={payment.Status === "Paid" ? "secondary" : "outline"}
                    className={
                      payment.Status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : payment.Status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {payment.Status}
                  </Badge>
                </TableCell>
                <TableCell>{payment["PG Charges"]}</TableCell>
                <TableCell>{payment["Aimshala Earning"]}</TableCell>
                <TableCell>{payment["Partner Earning"]}</TableCell>
                <TableCell>
                  <Badge
                    variant={payment["Payout Status"] === "Paid" ? "secondary" : "outline"}
                    className={
                      payment["Payout Status"] === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {payment["Payout Status"]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      title="View Details"
                      className="text-blue-500"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Download Invoice"
                      className="text-purple-500"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Flag Issue"
                      className="text-red-500"
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstRecord + 1}-{Math.min(indexOfLastRecord, FinancePaymentsTableData.length)} of {FinancePaymentsTableData.length} payments
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