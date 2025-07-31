import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BreadcrumbNavigation = ({ 
  projectName, 
  cardTitle, 
  onBack, 
  onProjectClick,
  hasUnsavedChanges 
}) => {
  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave? Your changes will be lost.'
      );
      if (confirmed) {
        onBack();
      }
    } else {
      onBack();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center space-x-2">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          iconName="ArrowLeft"
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          Back
        </Button>

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Button
            variant="ghost"
            size="sm"
            onClick={onProjectClick}
            className="text-sm text-muted-foreground hover:text-foreground p-0 h-auto"
          >
            {projectName || 'Unassigned'}
          </Button>
          
          <Icon name="ChevronRight" size={14} />
          
          <span className="text-foreground font-medium">
            {cardTitle || 'Untitled Card'}
          </span>
          
          {hasUnsavedChanges && (
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="Circle" size={6} className="fill-current" />
              <span className="text-xs">Unsaved</span>
            </div>
          )}
        </nav>
      </div>

      {/* Quick Navigation */}
      <div className="hidden md:flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/dashboard-main-workspace'}
          iconName="Home"
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          Dashboard
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = '/project-detail-view'}
          iconName="FolderOpen"
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          Projects
        </Button>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;