import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserPlus, MessageSquare, Calendar, ClipboardCheck } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Insights Published",
      value: "468",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Approval",
      value: "23",
      icon: UserCheck,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      title: "Categories",
      value: "312",
      icon: UserPlus,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      title: "New Signups (This Month)",
      value: "1,038",
      icon: UserPlus,
      color: "text-indigo-500",
      bgColor: "bg-indigo-100",
    },
    {
      title: "Total Enquiries",
      value: "642",
      icon: MessageSquare,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Users with Sessions Booked",
      value: "1,205",
      icon: Calendar,
      color: "text-pink-500",
      bgColor: "bg-pink-100",
    },
    {
      title: "Users Completed ACE Test",
      value: "3,785",
      icon: ClipboardCheck,
      color: "text-teal-500",
      bgColor: "bg-teal-100",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-md font-medium">{stat.title}</CardTitle>
            <div className={`${stat.bgColor} rounded-full p-2`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
