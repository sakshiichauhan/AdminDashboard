import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface InsightsTableProps {
  type: 'published' | 'drafts' | 'pending' | 'archived';
  selectedItems: string[];
  onSelectItem: (id: string) => void;
  onSelectAll: (items: string[]) => void;
}

const InsightsTable: React.FC<InsightsTableProps> = ({ type, selectedItems, onSelectItem, onSelectAll }) => {
  const getTableData = () => {
    switch (type) {
      case 'published':
        return {
          headers: ['Title', 'Author', 'Category', 'Tags', 'For', 'Views', 'Status', 'Actions'],
          data: [
            {
              id: '1',
              title: 'Future-Proof Careers in 2030',
              author: 'Riya Malhotra',
              category: 'Careers',
              tags: ['AI', 'Automation'],
              for: 'UG, PG, Professionals',
              views: '4,010',
              status: 'Published',
              actions: ['View', 'Edit', 'Archive']
            },
            {
              id: '2',
              title: 'NEET 2025 Prep Guide',
              author: 'Team Aimshala',
              category: 'Exams',
              tags: ['NEET', 'MBBS'],
              for: '11-12, UG',
              views: '2,220',
              status: 'Published',
              actions: ['View', 'Edit', 'Archive']
            }
          ]
        };
      case 'drafts':
        return {
          headers: ['Title', 'Author', 'Category', 'Last Edited', 'Suggested Tags', 'Actions'],
          data: [
            {
              id: '3',
              title: 'Interview Tips for Freshers',
              author: 'Meera Kapoor',
              category: 'Skills',
              lastEdited: '17 May 2025',
              suggestedTags: ['Communication', 'HR'],
              actions: ['Edit', 'Delete']
            }
          ]
        };
      case 'pending':
        return {
          headers: ['Title', 'Author', 'Category', 'Submitted On', 'Assigned Editor', 'Actions'],
          data: [
            {
              id: '4',
              title: 'Women in Tech Leadership',
              author: 'Rahul Sen',
              category: 'Careers',
              submittedOn: '18 May 2025',
              assignedEditor: 'Riya Malhotra',
              actions: ['Review', 'Approve', 'Reject']
            }
          ]
        };
      case 'archived':
        return {
          headers: ['Title', 'Author', 'Category', 'Archived On', 'Reason for Archive', 'Actions'],
          data: [
            {
              id: '5',
              title: 'Scholarships in 2023',
              author: 'Team Aimshala',
              category: 'Colleges',
              archivedOn: '02 Jan 2024',
              reasonForArchive: 'Outdated Deadlines',
              actions: ['Restore', 'Delete']
            }
          ]
        };
      default:
        return { headers: [], data: [] };
    }
  };

  const { headers, data } = getTableData();
  const allIds = data.map(item => item.id);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectAll(allIds);
    } else {
      onSelectAll([]);
    }
  };

  const getActionButtonVariant = (action: string) => {
    switch (action) {
      case 'View':
        return 'outline';
      case 'Edit':
        return 'outline';
      case 'Archive':
        return 'outline';
      case 'Delete':
        return 'destructive';
      case 'Review':
        return 'outline';
      case 'Approve':
        return 'default';
      case 'Reject':
        return 'destructive';
      case 'Restore':
        return 'default';
      default:
        return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12">
                <Checkbox
                  checked={allIds.length > 0 && allIds.every(id => selectedItems.includes(id))}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              {headers.map((header) => (
                <TableHead key={header} className="font-semibold text-gray-700">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => onSelectItem(item.id)}
                  />
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {item.title}
                </TableCell>
                <TableCell className="text-gray-600">
                  {item.author}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {item.category}
                  </Badge>
                </TableCell>
                {type === 'published' && (
                  <>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(item as any).tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {(item as any).for}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {(item as any).views}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor((item as any).status)}>
                        {(item as any).status}
                      </Badge>
                    </TableCell>
                  </>
                )}
                {type === 'drafts' && (
                  <>
                    <TableCell className="text-gray-600">
                      {(item as any).lastEdited}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(item as any).suggestedTags.map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </>
                )}
                {type === 'pending' && (
                  <>
                    <TableCell className="text-gray-600">
                      {(item as any).submittedOn}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {(item as any).assignedEditor}
                    </TableCell>
                  </>
                )}
                {type === 'archived' && (
                  <>
                    <TableCell className="text-gray-600">
                      {(item as any).archivedOn}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {(item as any).reasonForArchive}
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <div className="flex gap-2">
                    {item.actions.map((action) => (
                      <Button
                        key={action}
                        variant={getActionButtonVariant(action) as any}
                        size="sm"
                        className="text-xs"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No insights found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default InsightsTable;