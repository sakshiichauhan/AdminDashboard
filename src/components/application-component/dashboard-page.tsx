// import { useState } from "react"
// import { AdminDashboard } from "@/components/admin-dashboard"
// import { UserProfileView } from "@/components/user-profile-view"

// export function DashboardPage() {
//   const [selectedUser, setSelectedUser] = useState<User | null>(null)

//   return (
//     <div className="h-screen bg-gray-50 dark:bg-gray-900">
//       {selectedUser ? (
//         <UserProfileView user={selectedUser} onClose={() => setSelectedUser(null)} />
//       ) : (
//         <AdminDashboard onViewUser={setSelectedUser} />
//       )}
//     </div>
//   )
// }

// // Types
// export interface User {
//   id: string
//   name: string
//   email: string
//   phone: string
//   photo: string
//   gender: string
//   userType: string
//   profileStage: string
//   assessments: {
//     total: number
//     completed: number
//   }
//   sessions: {
//     total: number
//     missed: number
//   }
//   source: string
//   joinDate: string
//   lastLogin: string
//   status: string
//   age?: number
//   class?: string
//   school?: string
// }
