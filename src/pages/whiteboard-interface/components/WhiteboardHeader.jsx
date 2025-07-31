import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WhiteboardHeader = ({ 
  whiteboardTitle, 
  onTitleChange, 
  saveStatus, 
  onSave,
  onShare,
  onSettings 
}) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(whiteboardTitle);

  const handleTitleSubmit = () => {
    onTitleChange(tempTitle);
    setIsEditing(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(whiteboardTitle);
    setIsEditing(false);
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case 'saved': return 'text-success';
      case 'saving': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saved': return 'All changes saved';
      case 'saving': return 'Saving...';
      case 'error': return 'Save failed';
      default: return 'Unsaved changes';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard-main-workspace')}
            className="w-8 h-8"
          >
            <Icon name="ArrowLeft" size={18} />
          </Button>

          {/* Project Context */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="FolderOpen" size={16} />
            <span>Research Methodology</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">Whiteboard</span>
          </div>
        </div>

        {/* Center Section - Title */}
        <div className="flex-1 flex justify-center max-w-md">
          {isEditing ? (
            <div className="flex items-center space-x-2 w-full">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSubmit();
                  if (e.key === 'Escape') handleTitleCancel();
                }}
                className="flex-1 px-3 py-1 text-center bg-background border border-border rounded text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleTitleSubmit}
                className="w-6 h-6"
              >
                <Icon name="Check" size={14} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleTitleCancel}
                className="w-6 h-6"
              >
                <Icon name="X" size={14} />
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-foreground font-medium hover:bg-muted rounded transition-colors"
            >
              {whiteboardTitle}
            </button>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Save Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              saveStatus === 'saved' ? 'bg-success' :
              saveStatus === 'saving' ? 'bg-warning animate-pulse' :
              saveStatus === 'error' ? 'bg-destructive' : 'bg-muted-foreground'
            }`} />
            <span className={`text-xs ${getSaveStatusColor()}`}>
              {getSaveStatusText()}
            </span>
          </div>

          {/* Collaboration Indicators */}
          <div className="flex items-center space-x-1">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 bg-primary rounded-full border-2 border-card flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-medium">SC</span>
              </div>
              <div className="w-6 h-6 bg-accent rounded-full border-2 border-card flex items-center justify-center">
                <span className="text-xs text-accent-foreground font-medium">MR</span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">2 active</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={onShare}
              className="w-8 h-8"
              title="Share whiteboard"
            >
              <Icon name="Share" size={16} />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={onSettings}
              className="w-8 h-8"
              title="Whiteboard settings"
            >
              <Icon name="Settings" size={16} />
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={onSave}
              iconName="Save"
              iconPosition="left"
              iconSize={14}
              className="ml-2"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WhiteboardHeader;