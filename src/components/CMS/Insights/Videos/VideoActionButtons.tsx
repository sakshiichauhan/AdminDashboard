
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { upload, film, edit, share, archive } from 'lucide-react';

const VideoActionButtons = () => {
  const actions = [
    { 
      label: 'Upload New Video', 
      icon: '📤', 
      variant: 'default' as const,
      className: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      label: 'Assign to Section', 
      icon: '🎥', 
      variant: 'outline' as const,
      className: 'text-purple-600 border-purple-200 hover:bg-purple-50'
    },
    { 
      label: 'Manage Tags & Categories', 
      icon: '🛠', 
      variant: 'outline' as const,
      className: 'text-gray-600 border-gray-200 hover:bg-gray-50'
    },
    { 
      label: 'Import Bulk Videos', 
      icon: '📥', 
      variant: 'outline' as const,
      className: 'text-green-600 border-green-200 hover:bg-green-50'
    },
    { 
      label: 'Export Video Analytics', 
      icon: '📤', 
      variant: 'outline' as const,
      className: 'text-orange-600 border-orange-200 hover:bg-orange-50'
    }
  ];

  return (
    <Card className="mb-8 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🔻 Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          {actions.map((action, index) => (
            <Button 
              key={index}
              variant={action.variant}
              className={`${action.className} flex items-center gap-2`}
            >
              <span>{action.icon}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoActionButtons;
