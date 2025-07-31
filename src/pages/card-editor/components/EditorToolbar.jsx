import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EditorToolbar = ({ 
  onBold, 
  onItalic, 
  onHeader, 
  onList, 
  onLink, 
  onImage,
  isPreviewMode,
  onTogglePreview,
  saveStatus 
}) => {
  const formatButtons = [
    { icon: 'Bold', action: onBold, tooltip: 'Bold (Ctrl+B)' },
    { icon: 'Italic', action: onItalic, tooltip: 'Italic (Ctrl+I)' },
    { icon: 'Heading', action: onHeader, tooltip: 'Header' },
    { icon: 'List', action: onList, tooltip: 'List' },
    { icon: 'Link', action: onLink, tooltip: 'Link' },
    { icon: 'Image', action: onImage, tooltip: 'Image' },
  ];

  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card">
      <div className="flex items-center space-x-2">
        {formatButtons.map((button) => (
          <Button
            key={button.icon}
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.tooltip}
            className="h-8 w-8 p-0"
          >
            <Icon name={button.icon} size={16} />
          </Button>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        {/* Save Status */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {saveStatus === 'saving' && (
            <>
              <Icon name="Loader2" size={14} className="animate-spin" />
              <span>Saving...</span>
            </>
          )}
          {saveStatus === 'saved' && (
            <>
              <Icon name="Check" size={14} className="text-success" />
              <span>Saved</span>
            </>
          )}
          {saveStatus === 'error' && (
            <>
              <Icon name="AlertCircle" size={14} className="text-error" />
              <span>Error saving</span>
            </>
          )}
        </div>

        {/* Preview Toggle */}
        <Button
          variant={isPreviewMode ? "default" : "outline"}
          size="sm"
          onClick={onTogglePreview}
          iconName={isPreviewMode ? "Edit" : "Eye"}
          iconPosition="left"
          iconSize={16}
        >
          {isPreviewMode ? 'Edit' : 'Preview'}
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;