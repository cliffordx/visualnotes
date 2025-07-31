import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statItems = [
    {
      id: 'total-cards',
      label: 'Total Cards',
      value: stats.totalCards,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12',
      changeType: 'increase'
    },
    {
      id: 'whiteboards',
      label: 'Whiteboards',
      value: stats.totalWhiteboards,
      icon: 'PenTool',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+3',
      changeType: 'increase'
    },
    {
      id: 'projects',
      label: 'Active Projects',
      value: stats.activeProjects,
      icon: 'FolderOpen',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+1',
      changeType: 'increase'
    },
    {
      id: 'connections',
      label: 'Connections',
      value: stats.connections,
      icon: 'GitBranch',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+8',
      changeType: 'increase'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems.map((item) => (
        <div key={item.id} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-lg
              ${item.bgColor}
            `}>
              <Icon name={item.icon} size={24} className={item.color} />
            </div>
            <div className={`
              flex items-center space-x-1 text-caption
              ${item.changeType === 'increase' ? 'text-success' : 'text-destructive'}
            `}>
              <Icon 
                name={item.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
              />
              <span>{item.change}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-heading font-semibold text-heading-lg text-foreground">
              {item.value.toLocaleString()}
            </h3>
            <p className="text-body-sm text-muted-foreground mt-1">
              {item.label}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-caption text-muted-foreground">
              <span>This week</span>
              <span className="font-mono">{item.change} from last week</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;