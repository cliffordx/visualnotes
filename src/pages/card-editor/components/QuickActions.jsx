import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ 
  onDuplicate, 
  onMove, 
  onArchive, 
  onShare, 
  onDelete,
  isModified 
}) => {
  const [showMoveDialog, setShowMoveDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [showShareDialog, setShowShareDialog] = useState(false);

  const projectOptions = [
    { value: 'research-methodology', label: 'Research Methodology' },
    { value: 'literature-review', label: 'Literature Review' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'para-system', label: 'PARA System' },
    { value: 'my-library', label: 'My Library' },
  ];

  const handleMove = () => {
    if (selectedProject) {
      onMove(selectedProject);
      setShowMoveDialog(false);
      setSelectedProject('');
    }
  };

  const handleShare = (shareType) => {
    onShare(shareType);
    setShowShareDialog(false);
  };

  return (
    <div className="flex items-center justify-between p-4 border-t border-border bg-muted/50">
      <div className="flex items-center space-x-2">
        {/* Duplicate */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onDuplicate}
          iconName="Copy"
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          Duplicate
        </Button>

        {/* Move */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMoveDialog(!showMoveDialog)}
            iconName="FolderOpen"
            iconPosition="left"
            iconSize={16}
            className="text-sm"
          >
            Move
          </Button>

          {showMoveDialog && (
            <div className="absolute bottom-full left-0 mb-2 bg-popover border border-border rounded-lg shadow-lg p-4 w-64 z-50">
              <h4 className="font-medium text-foreground mb-3">Move to Project</h4>
              <div className="space-y-3">
                <Select
                  placeholder="Select project..."
                  options={projectOptions}
                  value={selectedProject}
                  onChange={setSelectedProject}
                />
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMoveDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleMove}
                    disabled={!selectedProject}
                  >
                    Move
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Archive */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onArchive}
          iconName="Archive"
          iconPosition="left"
          iconSize={16}
          className="text-sm"
        >
          Archive
        </Button>

        {/* Share */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShareDialog(!showShareDialog)}
            iconName="Share2"
            iconPosition="left"
            iconSize={16}
            className="text-sm"
          >
            Share
          </Button>

          {showShareDialog && (
            <div className="absolute bottom-full left-0 mb-2 bg-popover border border-border rounded-lg shadow-lg p-2 w-48 z-50">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('link')}
                iconName="Link"
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start text-sm"
              >
                Copy Link
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('email')}
                iconName="Mail"
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start text-sm"
              >
                Share via Email
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleShare('export')}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start text-sm"
              >
                Export as PDF
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Modified Indicator */}
        {isModified && (
          <div className="flex items-center space-x-1 text-sm text-warning">
            <Icon name="Circle" size={8} className="fill-current" />
            <span>Unsaved changes</span>
          </div>
        )}

        {/* Delete */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onDelete}
          iconName="Trash2"
          iconPosition="left"
          iconSize={16}
          className="text-sm text-destructive hover:text-destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;