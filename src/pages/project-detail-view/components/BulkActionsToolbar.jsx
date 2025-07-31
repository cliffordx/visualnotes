import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsToolbar = ({ 
  selectedCount, 
  onClearSelection, 
  onBulkDelete, 
  onBulkTag, 
  onBulkMove, 
  onBulkArchive 
}) => {
  const [showTagModal, setShowTagModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);

  const availableTags = [
    { value: 'research', label: 'Research' },
    { value: 'important', label: 'Important' },
    { value: 'draft', label: 'Draft' },
    { value: 'review', label: 'Review' },
    { value: 'completed', label: 'Completed' }
  ];

  const availableProjects = [
    { value: 'literature-review', label: 'Literature Review' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'methodology', label: 'Research Methodology' }
  ];

  if (selectedCount === 0) return null;

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-card border border-border rounded-lg shadow-lg px-4 py-3 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="w-px h-6 bg-border" />

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTagModal(true)}
              iconName="Tag"
              iconPosition="left"
              iconSize={14}
            >
              Add Tags
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMoveModal(true)}
              iconName="FolderOpen"
              iconPosition="left"
              iconSize={14}
            >
              Move
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkArchive}
              iconName="Archive"
              iconPosition="left"
              iconSize={14}
            >
              Archive
            </Button>
            
            <Button
              variant="destructive"
              size="sm"
              onClick={onBulkDelete}
              iconName="Trash2"
              iconPosition="left"
              iconSize={14}
            >
              Delete
            </Button>
          </div>

          <div className="w-px h-6 bg-border" />

          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      {/* Tag Modal */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Add Tags</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTagModal(false)}
                  className="w-8 h-8"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <Select
                  label="Select tags to add"
                  options={availableTags}
                  multiple
                  searchable
                  placeholder="Choose tags..."
                  onChange={(tags) => {
                    onBulkTag(tags);
                    setShowTagModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Move Modal */}
      {showMoveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Move Items</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMoveModal(false)}
                  className="w-8 h-8"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
              
              <div className="space-y-4">
                <Select
                  label="Select destination project"
                  options={availableProjects}
                  placeholder="Choose project..."
                  onChange={(projectId) => {
                    onBulkMove(projectId);
                    setShowMoveModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BulkActionsToolbar;