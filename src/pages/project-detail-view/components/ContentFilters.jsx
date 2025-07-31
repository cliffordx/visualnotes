import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContentFilters = ({ 
  activeFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  viewMode,
  onViewModeChange 
}) => {
  const filterOptions = [
    { value: 'all', label: 'All Content', icon: 'Grid3X3' },
    { value: 'cards', label: 'Cards Only', icon: 'FileText' },
    { value: 'whiteboards', label: 'Whiteboards Only', icon: 'PenTool' }
  ];

  const sortOptions = [
    { value: 'modified', label: 'Last Modified' },
    { value: 'created', label: 'Date Created' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'type', label: 'Content Type' }
  ];

  const viewModeOptions = [
    { value: 'grid', icon: 'Grid3X3' },
    { value: 'list', icon: 'List' }
  ];

  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Content Type Filters */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {filterOptions.map((filter) => (
              <Button
                key={filter.value}
                variant={activeFilter === filter.value ? "default" : "ghost"}
                size="sm"
                onClick={() => onFilterChange(filter.value)}
                iconName={filter.icon}
                iconPosition="left"
                iconSize={16}
                className="text-sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="w-80">
            <Input
              type="search"
              placeholder="Search within project..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sort Options */}
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by"
            className="w-40"
          />

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            {viewModeOptions.map((mode) => (
              <Button
                key={mode.value}
                variant={viewMode === mode.value ? "default" : "ghost"}
                size="icon"
                onClick={() => onViewModeChange(mode.value)}
                className="w-8 h-8"
              >
                <Icon name={mode.icon} size={16} />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentFilters;