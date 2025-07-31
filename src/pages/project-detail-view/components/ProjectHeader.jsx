import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ProjectHeader = ({ project, onAddCard, onCreateWhiteboard, onProjectUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [showSettings, setShowSettings] = useState(false);

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
    { value: 'completed', label: 'Completed' }
  ];

  const handleSave = () => {
    onProjectUpdate(editedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProject(project);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Project Name"
                value={editedProject.name}
                onChange={(e) => setEditedProject({ ...editedProject, name: e.target.value })}
                className="max-w-md"
              />
              <Input
                label="Description"
                value={editedProject.description}
                onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
                className="max-w-2xl"
              />
              <div className="flex items-center space-x-3">
                <Button variant="default" size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <h1 className="text-2xl font-semibold text-foreground">{project.name}</h1>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="w-6 h-6"
                >
                  <Icon name="Edit2" size={14} />
                </Button>
              </div>
              <p className="text-muted-foreground mb-4 max-w-2xl">{project.description}</p>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Icon name="FileText" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">{project.cardCount} Cards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="PenTool" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground font-medium">{project.whiteboardCount} Whiteboards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last modified {project.lastModified}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Circle" size={8} className={`${project.status === 'active' ? 'text-success' : project.status === 'completed' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-sm text-muted-foreground capitalize">{project.status}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 ml-6">
          <Button
            variant="outline"
            size="sm"
            onClick={onAddCard}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add Card
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onCreateWhiteboard}
            iconName="PenTool"
            iconPosition="left"
            iconSize={16}
          >
            Create Whiteboard
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Icon name="Settings" size={20} />
            </Button>
            
            {showSettings && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 space-y-3">
                  <Select
                    label="Project Status"
                    options={statusOptions}
                    value={project.status}
                    onChange={(value) => onProjectUpdate({ ...project, status: value })}
                  />
                  <div className="border-t border-border pt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Share"
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                      className="justify-start"
                    >
                      Share Project
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                      className="justify-start"
                    >
                      Export Project
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Archive"
                      iconPosition="left"
                      iconSize={16}
                      fullWidth
                      className="justify-start text-warning"
                    >
                      Archive Project
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;