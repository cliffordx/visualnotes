import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WorkspaceHeader = ({ onNewWhiteboard, onViewChange, currentView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const viewOptions = [
    { id: 'grid', label: 'Grid', icon: 'Grid3X3' },
    { id: 'list', label: 'List', icon: 'List' },
    { id: 'board', label: 'Board', icon: 'Kanban' }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Implement search functionality
  };

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section - Title and Breadcrumb */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="font-heading font-semibold text-heading-xl text-foreground">
              Dashboard
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-body-sm text-muted-foreground">Workspace</span>
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
              <span className="text-body-sm text-foreground">Main</span>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search cards, whiteboards, projects..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Right Section - Actions and Views */}
        <div className="flex items-center space-x-3">
          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewOptions.map((option) => (
              <Button
                key={option.id}
                variant={currentView === option.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onViewChange(option.id)}
                iconName={option.icon}
                iconSize={16}
                className="px-3"
              >
                <span className="hidden sm:inline ml-2">{option.label}</span>
              </Button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
            >
              <span className="hidden sm:inline">New Card</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="PenTool"
              iconPosition="left"
              iconSize={16}
              onClick={onNewWhiteboard}
            >
              <span className="hidden sm:inline">New Whiteboard</span>
            </Button>
          </div>

          {/* More Options */}
          <Button
            variant="ghost"
            size="icon"
            iconName="MoreVertical"
            iconSize={16}
          />
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isSearchFocused && searchQuery && (
        <div className="absolute left-6 right-6 mt-2 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center space-x-2 text-muted-foreground text-body-sm mb-2">
              <Icon name="Search" size={14} />
              <span>Search results for "{searchQuery}"</span>
            </div>
            <div className="space-y-2">
              <div className="p-2 hover:bg-muted rounded cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={16} className="text-primary" />
                  <div>
                    <p className="text-body-sm text-foreground">Research Methodology Overview</p>
                    <p className="text-caption text-muted-foreground">in Research Methodology</p>
                  </div>
                </div>
              </div>
              <div className="p-2 hover:bg-muted rounded cursor-pointer">
                <div className="flex items-center space-x-3">
                  <Icon name="PenTool" size={16} className="text-accent" />
                  <div>
                    <p className="text-body-sm text-foreground">Literature Map</p>
                    <p className="text-caption text-muted-foreground">in Literature Review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceHeader;