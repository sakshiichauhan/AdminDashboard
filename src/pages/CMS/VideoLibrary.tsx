import {
  Users,
  Building2,
  UserPlus,
  MessageSquare,
  Check,
  Plus,
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
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { VideoTableData } from "@/Data";

const stats = [
  {
    title: "Total Video",
    value: " 468",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Published Videos",
    value: "193",
    icon: Building2,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    title: "Pending Review",
    value: "22",
    icon: UserPlus,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    title: "Video Formats",
    value: "16:9 (Web)",
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Total Plays Last 30 Days",
    value: "42,310",
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
];

export default function VideoLibrary() {
  const [selectedUsers, setSelectedUsers] = useState<String[]>([]);
  const [videoPage, setVideoPage] = useState(1);

  const recordsPerPage = 5;

  // Video pagination
  const videoTotalPages = Math.ceil(VideoTableData.length / recordsPerPage);
  const videoIndexLast = videoPage * recordsPerPage;
  const videoIndexFirst = videoIndexLast - recordsPerPage;
  const videoRecords = VideoTableData.slice(videoIndexFirst, videoIndexLast);



  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="p-4">
      {/* Cards */}
      <h1 className="heading-title"> Top Overview (Stats Widgets) </h1>
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
      {/* video Table */}
      <div className="mt-6">
        <h2 className="heading-title">Published Insights</h2>
        <div>
          <div className="overflow-x-auto mt-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Speaker</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Mapping</TableHead>
                  <TableHead>For</TableHead>
                  <TableHead>Play Count</TableHead>
                  <TableHead>Video URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videoRecords.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(video.id.toString())}
                        onCheckedChange={() =>
                          toggleSelectUser(video.id.toString())
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                          <img
                            // src={user.photo || "/placeholder.svg"}
                            alt={video.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{video.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{video.speaker}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{video.mode}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{video.category}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{video.mapping}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{video.for}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{video.playCount}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <a
                          href={video.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Watch Video
                        </a>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          video.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {video.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                        // onClick={() => navigate(`/user-details/${user.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Chat</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Plus className="h-4 w-4 rotate-45" />
                          <span className="sr-only">Flag</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>{" "}
          {/* Video Pagination */}
          <div className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-gray-500">
              Showing {videoIndexFirst + 1}-
              {Math.min(videoIndexLast, VideoTableData.length)} of{" "}
              {VideoTableData.length} videos
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setVideoPage((prev) => Math.max(prev - 1, 1))}
                disabled={videoPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: videoTotalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={page === videoPage ? "default" : "outline"}
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => setVideoPage(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setVideoPage((prev) => Math.min(prev + 1, videoTotalPages))
                }
                disabled={videoPage === videoTotalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
