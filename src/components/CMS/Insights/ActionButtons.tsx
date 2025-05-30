
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


const ActionButtons = () => {
  const actions = [
    { icon: '➕', label: 'Add New Insight', variant: 'default' as const },
    { icon: '🛠', label: 'Manage Categories & Tags', variant: 'outline' as const },
    { icon: '👥', label: 'Assign Editors', variant: 'outline' as const },
    { icon: '📥', label: 'Import Bulk Content (Excel/CSV)', variant: 'outline' as const },
    { icon: '📤', label: 'Export Insights Data', variant: 'outline' as const }
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
              className="flex items-center gap-2 transition-all hover:scale-105"
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

export default ActionButtons;
