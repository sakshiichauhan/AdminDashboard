import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoStatsOverview from '@/components/CMS/Insights/Videos/VideoStatsOverview';
import VideoActionButtons from '@/components/CMS/Insights/Videos/VideoActionButtons';
import VideoFilterSection from '@/components/CMS/Insights/Videos/VideoFilterSection';
import VideoTable from '@/components/CMS/Insights/Videos/VideaTable';

const VideoLibrary = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    videoMode: [] as string[],
    mapping: [] as string[],
    audienceFor: [] as string[],
    status: [] as string[],
    dateRange: { from: undefined, to: undefined } as { from?: Date; to?: Date }
  });

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = (items: string[]) => {
    setSelectedItems(items);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Video Library – Admin Desk</h1>
          <p className="text-gray-600">Manage and monitor all video content from your dashboard</p>
        </div>

        {/* Video Stats Overview */}
        <VideoStatsOverview />

        {/* Video Action Buttons */}
        <VideoActionButtons />

        {/* Video Filters */}
        <VideoFilterSection filters={filters} onFilterChange={handleFilterChange} />

        {/* Video Library Table */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                📋 Video Library
              </h2>
            </div>
            <VideoTable 
              selectedItems={selectedItems}
              onSelectItem={handleSelectItem}
              onSelectAll={handleSelectAll}
            />
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <Card className="mt-6 border-blue-200 bg-blue-50 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedItems.length} video(s) selected
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
                    ✅ Publish Selected
                  </Button>
                  <Button size="sm" variant="outline" className="text-gray-700 border-gray-200 hover:bg-gray-50">
                    🗃 Archive Selected
                  </Button>
                  <Button size="sm" variant="outline" className="text-blue-700 border-blue-200 hover:bg-blue-50">
                    📤 Export Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoLibrary;