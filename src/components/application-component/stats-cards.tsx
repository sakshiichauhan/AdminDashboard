import { Card, CardHeader } from "@/components/ui/card"
import { Users, UserCheck, UserPlus, MessageSquare, Calendar } from "lucide-react"
const stats = [
  {
    title: "Total Users",
    value: "12,457",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Active Learners (30 Days)",
    value: "4,385",
    icon: UserCheck,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "New Signups (This Week)",
    value: "312",
    icon: UserPlus,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
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
]

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 px-2 py-1">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex items-center justify-start">
            <div className={`${stat.bgColor} rounded-full p-2`}>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div className="flex flex-col ml-2">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium">{stat.title}</div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

