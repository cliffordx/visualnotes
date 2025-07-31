import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ProjectSidebar = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('tags');
  const [newTag, setNewTag] = useState('');

  const projectTags = [
    { name: 'Research', count: 12, color: '#4A9B8E' },
    { name: 'Important', count: 8, color: '#EF4444' },
    { name: 'Draft', count: 15, color: '#F59E0B' },
    { name: 'Review', count: 6, color: '#8B5CF6' },
    { name: 'Completed', count: 9, color: '#10B981' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'card_created',
      title: 'New card: "Literature Review Framework"',
      timestamp: '2 hours ago',
      user: 'You'
    },
    {
      id: 2,
      type: 'whiteboard_updated',
      title: 'Updated whiteboard: "Research Methodology"',
      timestamp: '4 hours ago',
      user: 'You'
    },
    {
      id: 3,
      type: 'card_tagged',
      title: 'Tagged 3 cards with "Important"',
      timestamp: '1 day ago',
      user: 'You'
    },
    {
      id: 4,
      type: 'project_shared',
      title: 'Shared project with Dr. Johnson',
      timestamp: '2 days ago',
      user: 'You'
    }
  ];

  const collaborators = [
    {
      id: 1,
      name: 'Dr. Michael Johnson',
      email: 'mjohnson@university.edu',
      role: 'Editor',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'swilliams@university.edu',
      role: 'Viewer',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      lastActive: '1 day ago'
    }
  ];

  const tabs = [
    { id: 'tags', label: 'Tags', icon: 'Tag' },
    { id: 'activity', label: 'Activity', icon: 'Clock' },
    { id: 'sharing', label: 'Sharing', icon: 'Users' }
  ];

  const handleAddTag = () => {
    if (newTag.trim()) {
      // Add tag logic here
      setNewTag('');
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'card_created': return 'FileText';
      case 'whiteboard_updated': return 'PenTool';
      case 'card_tagged': return 'Tag';
      case 'project_shared': return 'Share';
      default: return 'Circle';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">Project Tools</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-8 h-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors
                ${activeTab === tab.id 
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'tags' && (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="font-medium text-foreground mb-3">Project Tags</h3>
                <div className="space-y-2">
                  {projectTags.map((tag, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: tag.color }}
                        />
                        <span className="text-sm text-foreground">{tag.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {tag.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-3">Add New Tag</h3>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Tag name"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddTag}
                    iconName="Plus"
                    iconSize={14}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon name={getActivityIcon(activity.type)} size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">{activity.user}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sharing' && (
            <div className="p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground">Collaborators</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="UserPlus"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Invite
                  </Button>
                </div>
                <div className="space-y-3">
                  {collaborators.map((collaborator) => (
                    <div key={collaborator.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{collaborator.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{collaborator.email}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                            {collaborator.role}
                          </span>
                          <span className="text-xs text-muted-foreground">{collaborator.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-foreground mb-3">Share Settings</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Link"
                    iconPosition="left"
                    iconSize={14}
                    fullWidth
                    className="justify-start"
                  >
                    Copy Share Link
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    iconSize={14}
                    fullWidth
                    className="justify-start"
                  >
                    Share via Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    iconPosition="left"
                    iconSize={14}
                    fullWidth
                    className="justify-start"
                  >
                    Export Project
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectSidebar;