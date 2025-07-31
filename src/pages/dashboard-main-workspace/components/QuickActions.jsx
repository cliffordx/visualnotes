import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ onNewCard, onNewWhiteboard, onNewProject }) => {
  const quickActionItems = [
    {
      id: 'new-card',
      label: 'New Card',
      icon: 'FileText',
      description: 'Create a new note card',
      action: onNewCard,
      color: 'bg-primary/10 text-primary border-primary/20'
    },
    {
      id: 'new-whiteboard',
      label: 'New Whiteboard',
      icon: 'PenTool',
      description: 'Start a visual workspace',
      action: onNewWhiteboard,
      color: 'bg-accent/10 text-accent border-accent/20'
    },
    {
      id: 'new-project',
      label: 'New Project',
      icon: 'FolderPlus',
      description: 'Organize your work',
      action: onNewProject,
      color: 'bg-success/10 text-success border-success/20'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-medium text-heading-sm text-foreground">
          Quick Actions
        </h3>
        <Icon name="Zap" size={16} className="text-muted-foreground" />
      </div>

      <div className="space-y-3">
        {quickActionItems.map((item) => (
          <button
            key={item.id}
            onClick={item.action}
            className={`
              w-full p-3 rounded-lg border transition-all duration-200
              hover:shadow-sm hover:scale-[1.02] active:scale-[0.98]
              ${item.color}
            `}
          >
            <div className="flex items-center space-x-3">
              <Icon name={item.icon} size={20} />
              <div className="flex-1 text-left">
                <p className="font-medium text-body-sm">{item.label}</p>
                <p className="text-caption opacity-80">{item.description}</p>
              </div>
              <Icon name="ArrowRight" size={16} className="opacity-60" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-caption text-muted-foreground">
          <span>Keyboard shortcuts</span>
          <div className="flex items-center space-x-2">
            <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 bg-muted rounded text-xs">N</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;