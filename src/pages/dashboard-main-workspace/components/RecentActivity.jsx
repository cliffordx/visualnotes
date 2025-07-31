import React from 'react';
import Icon from '../../../components/AppIcon';


const RecentActivity = () => {
  const recentActivities = [
    {
      id: 1,
      type: 'card_created',
      title: 'Created "Research Methodology Overview"',
      project: 'Research Methodology',
      timestamp: '2 minutes ago',
      icon: 'FileText',
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'whiteboard_updated',
      title: 'Updated whiteboard "Literature Map"',
      project: 'Literature Review',
      timestamp: '15 minutes ago',
      icon: 'PenTool',
      color: 'text-accent'
    },
    {
      id: 3,
      type: 'card_moved',
      title: 'Moved 3 cards to "Data Analysis"',
      project: 'Data Analysis',
      timestamp: '1 hour ago',
      icon: 'Move',
      color: 'text-success'
    },
    {
      id: 4,
      type: 'project_created',
      title: 'Created new project "Thesis Writing"',
      project: 'Thesis Writing',
      timestamp: '2 hours ago',
      icon: 'FolderPlus',
      color: 'text-warning'
    },
    {
      id: 5,
      type: 'card_tagged',
      title: 'Added tags to "Statistical Methods"',
      project: 'Research Methodology',
      timestamp: '3 hours ago',
      icon: 'Tag',
      color: 'text-secondary'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'card_created':
        return 'FileText';
      case 'whiteboard_updated':
        return 'PenTool';
      case 'card_moved':
        return 'Move';
      case 'project_created':
        return 'FolderPlus';
      case 'card_tagged':
        return 'Tag';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-heading-sm text-foreground">
          Recent Activity
        </h3>
        <Icon name="Clock" size={16} className="text-muted-foreground" />
      </div>

      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`
              flex items-center justify-center w-8 h-8 rounded-full
              bg-muted ${activity.color}
            `}>
              <Icon name={getActivityIcon(activity.type)} size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm text-foreground font-medium line-clamp-2">
                {activity.title}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-caption text-muted-foreground">
                  {activity.project}
                </span>
                <span className="text-caption text-muted-foreground">•</span>
                <span className="text-caption text-muted-foreground">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full text-center text-body-sm text-primary hover:text-primary/80 transition-colors">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;