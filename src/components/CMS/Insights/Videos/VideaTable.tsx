import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
// import { edit, archive, share } from 'lucide-react';

interface VideoTableProps {
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: (items: string[]) => void;
}

const VideoTable: React.FC<VideoTableProps> = ({ selectedItems, onSelectItem, onSelectAll }) => {
  const videoData = [
    {
      id: '1',
      title: 'Success Journey – Aarav Mehta',
      speaker: 'Team Aimshala',
      mode: '9:16',
      category: 'Motivation',
      mapping: 'Success Story',
      audience: '9–12, UG',
      playCount: '12,504',
      videoUrl: '[Watch]',
      status: 'Published'
    },
    {
      id: '2',
      title: 'What is CUET? Explained',
      speaker: 'Riya Malhotra',
      mode: '16:9',
      category: 'Exams',
      mapping: 'Section (Exams)',
      audience: '11–12, UG',
      playCount: '8,234',
      videoUrl: '[Watch]',
      status: 'Published'
    },
    {
      id: '3',
      title: 'Learning From Failures',
      speaker: 'Rahul Sen',
      mode: '16:9',
      category: 'Careers',
      mapping: 'Story',
      audience: 'PG, Professionals',
      playCount: '5,105',
      videoUrl: '[Watch]',
      status: 'Published'
    },
    {
      id: '4',
      title: 'Day in Life of a Coder',
      speaker: 'Dr. Seema Rao',
      mode: '9:16',
      category: 'Skills',
      mapping: 'Instagram Reel',
      audience: 'UG, Career Changer',
      playCount: '6,488',
      videoUrl: '[Watch]',
      status: 'Published'
    }
  ];

  const allIds = videoData.map(item => item.id);
  const isAllSelected = allIds.every(id => selectedItems.includes(id));

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={isAllSelected}
                onCheckedChange={(checked) => {
                  if (checked) {
                    onSelectAll(allIds);
                  } else {
                    onSelectAll([]);
                  }
                }}
              />
            </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Speaker</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Mapping</TableHead>
            <TableHead>For</TableHead>
            <TableHead>Play Count</TableHead>
            <TableHead>Video URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videoData.map((video) => (
            <TableRow key={video.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(video.id)}
                  onCheckedChange={() => onSelectItem(video.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{video.title}</TableCell>
              <TableCell>{video.speaker}</TableCell>
              <TableCell>
                <Badge variant="outline" className={video.mode === '16:9' ? 'text-blue-600' : 'text-purple-600'}>
                  {video.mode}
                </Badge>
              </TableCell>
              <TableCell>{video.category}</TableCell>
              <TableCell>{video.mapping}</TableCell>
              <TableCell>{video.audience}</TableCell>
              <TableCell className="font-semibold text-green-600">{video.playCount}</TableCell>
              <TableCell>
                <Button variant="link" size="sm" className="text-blue-600 p-0">
                  {video.videoUrl}
                </Button>
              </TableCell>
              <TableCell>
                <Badge className="bg-green-100 text-green-800">
                  {video.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="ghost" className="text-blue-600">
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-600">
                    Archive
                  </Button>
                  <Button size="sm" variant="ghost" className="text-green-600">
                    Share
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VideoTable;
