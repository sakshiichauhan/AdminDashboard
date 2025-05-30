import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoFilterSectionProps {
  filters: {
    search: string;
    videoMode: string[];
    mapping: string[];
    audienceFor: string[];
    status: string[];
    dateRange: { from?: Date; to?: Date };
  };
  onFilterChange: (key: string, value: any) => void;
}

const VideoFilterSection: React.FC<VideoFilterSectionProps> = ({ filters, onFilterChange }) => {
  const videoModeOptions = ['16:9', '9:16'];
  const mappingOptions = ['Story', 'Instagram', 'Success Story', 'Section Page'];
  const audienceOptions = ['6–8', '9–10', '11–12', 'UG', 'PG', 'Professionals'];
  const statusOptions = ['Published', 'Draft', 'Pending', 'Archived'];

  const handleVideoModeChange = (mode: string, checked: boolean) => {
    const newModes = checked 
      ? [...filters.videoMode, mode]
      : filters.videoMode.filter(m => m !== mode);
    onFilterChange('videoMode', newModes);
  };

  const handleMappingChange = (mapping: string, checked: boolean) => {
    const newMappings = checked 
      ? [...filters.mapping, mapping]
      : filters.mapping.filter(m => m !== mapping);
    onFilterChange('mapping', newMappings);
  };

  const handleAudienceChange = (audience: string, checked: boolean) => {
    const newAudience = checked 
      ? [...filters.audienceFor, audience]
      : filters.audienceFor.filter(a => a !== audience);
    onFilterChange('audienceFor', newAudience);
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked 
      ? [...filters.status, status]
      : filters.status.filter(s => s !== status);
    onFilterChange('status', newStatus);
  };

  const clearAllFilters = () => {
    onFilterChange('search', '');
    onFilterChange('videoMode', []);
    onFilterChange('mapping', []);
    onFilterChange('audienceFor', []);
    onFilterChange('status', []);
    onFilterChange('dateRange', { from: undefined, to: undefined });
  };

  return (
    <Card className="mb-8 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🔍 Video Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by Title / Speaker / Tag"
              value={filters.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Video Mode and Mapping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Video Mode</label>
            <div className="flex gap-4">
              {videoModeOptions.map((mode) => (
                <div key={mode} className="flex items-center space-x-2">
                  <Checkbox
                    id={mode}
                    checked={filters.videoMode.includes(mode)}
                    onCheckedChange={(checked) => handleVideoModeChange(mode, checked as boolean)}
                  />
                  <label htmlFor={mode} className="text-sm text-gray-600">
                    {mode}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Mapping</label>
            <div className="flex flex-wrap gap-4">
              {mappingOptions.map((mapping) => (
                <div key={mapping} className="flex items-center space-x-2">
                  <Checkbox
                    id={mapping}
                    checked={filters.mapping.includes(mapping)}
                    onCheckedChange={(checked) => handleMappingChange(mapping, checked as boolean)}
                  />
                  <label htmlFor={mapping} className="text-sm text-gray-600">
                    {mapping}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audience For */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Audience For</label>
          <div className="flex flex-wrap gap-4">
            {audienceOptions.map((audience) => (
              <div key={audience} className="flex items-center space-x-2">
                <Checkbox
                  id={audience}
                  checked={filters.audienceFor.includes(audience)}
                  onCheckedChange={(checked) => handleAudienceChange(audience, checked as boolean)}
                />
                <label htmlFor={audience} className="text-sm text-gray-600">
                  {audience}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
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

        {/* Date Range */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Upload Date Range</label>
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
                  <span>📅 Filter by Upload Date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange.from}
                selected={filters.dateRange.from && filters.dateRange.to 
                  ? { from: filters.dateRange.from, to: filters.dateRange.to }
                  : undefined
                }
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

export default VideoFilterSection;