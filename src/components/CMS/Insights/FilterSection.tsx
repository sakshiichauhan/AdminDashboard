import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterSectionProps {
  filters: {
    search: string;
    status: string[];
    category: string;
    tags: string[];
    dateRange: { from?: Date; to?: Date };
    authorRole: string[];
  };
  onFilterChange: (key: string, value: any) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, onFilterChange }) => {
  const statusOptions = ['Published', 'Draft', 'Pending', 'Archived'];
  const categoryOptions = ['Careers', 'Exams', 'Skills', 'Colleges', 'Trends'];
  const tagOptions = ['AI', 'Communication', 'NEET', 'Resume', 'Coding', 'MBBS', 'Automation', 'HR'];
  const authorRoleOptions = ['Admin', 'Coach', 'Contributor'];

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    onFilterChange('status', newStatus);
  };

  const handleAuthorRoleChange = (role: string, checked: boolean) => {
    const newRoles = checked 
      ? [...filters.authorRole, role]
      : filters.authorRole.filter(r => r !== role);
    onFilterChange('authorRole', newRoles);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange('tags', newTags);
  };

  const clearAllFilters = () => {
    onFilterChange('search', '');
    onFilterChange('status', []);
    onFilterChange('category', '');
    onFilterChange('tags', []);
    onFilterChange('dateRange', { from: undefined, to: undefined });
    onFilterChange('authorRole', []);
  };

  return (
    <Card className="mb-8 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🔍 Filters & Search
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by Title / Author / Tag"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Status Checkboxes */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
          <div className="flex flex-wrap gap-4">
            {statusOptions.map((status) => (
              <div key={status} className="flex items-center space-x-2">
                <Checkbox
                  id={status}
                  checked={filters.status.includes(status)}
                  onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                />
                <label htmlFor={status} className="text-sm text-gray-600">
                  {status}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Category and Author Role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
            <Select value={filters.category} onValueChange={(value) => onFilterChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryOptions.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Author Role</label>
            <div className="flex flex-wrap gap-4">
              {authorRoleOptions.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={role}
                    checked={filters.authorRole.includes(role)}
                    onCheckedChange={(checked) => handleAuthorRoleChange(role, checked as boolean)}
                  />
                  <label htmlFor={role} className="text-sm text-gray-600">
                    {role}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tagOptions.map((tag) => (
              <Badge
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                {filters.tags.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Date Range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full md:w-[300px] justify-start text-left font-normal",
                  !filters.dateRange.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                      {format(filters.dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>📅 Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange.from}
                selected={filters.dateRange.from ? filters.dateRange : undefined}
                onSelect={(range) => onFilterChange('dateRange', range || { from: undefined, to: undefined })}
                numberOfMonths={2}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Clear Filters */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={clearAllFilters} className="text-gray-600">
            Clear All Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterSection;
