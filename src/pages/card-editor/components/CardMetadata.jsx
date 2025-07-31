import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CardMetadata = ({ 
  title, 
  onTitleChange, 
  selectedProject, 
  onProjectChange, 
  tags, 
  onTagsChange,
  createdAt,
  modifiedAt,
  isCollapsed,
  onToggleCollapse 
}) => {
  const [newTag, setNewTag] = useState('');

  const projectOptions = [
    { value: 'research-methodology', label: 'Research Methodology' },
    { value: 'literature-review', label: 'Literature Review' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'getting-started', label: 'Getting Started' },
    { value: 'para-system', label: 'PARA System' },
    { value: 'my-library', label: 'My Library' },
  ];

  const predefinedTags = [
    'Important', 'Research', 'Todo', 'Reference', 'Idea', 'Question',
    'Summary', 'Quote', 'Definition', 'Example', 'Analysis', 'Insight'
  ];

  const handleAddTag = (tagValue) => {
    if (tagValue && !tags.includes(tagValue)) {
      onTagsChange([...tags, tagValue]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(newTag);
    }
  };

  return (
    <div className="bg-muted border-r border-border">
      {/* Mobile Toggle Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium text-foreground">Card Details</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="h-8 w-8"
        >
          <Icon name={isCollapsed ? "ChevronDown" : "ChevronUp"} size={16} />
        </Button>
      </div>

      {/* Metadata Content */}
      <div className={`${isCollapsed ? 'hidden lg:block' : 'block'} p-4 space-y-6`}>
        {/* Title */}
        <div>
          <Input
            label="Card Title"
            type="text"
            placeholder="Enter card title..."
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
          />
        </div>

        {/* Project Assignment */}
        <div>
          <Select
            label="Project"
            placeholder="Select project..."
            options={projectOptions}
            value={selectedProject}
            onChange={onProjectChange}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tags
          </label>
          
          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                >
                  <span>{tag}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveTag(tag)}
                    className="h-4 w-4 p-0 hover:bg-primary/20"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Tag */}
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Add new tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            
            {/* Predefined Tags */}
            <div className="flex flex-wrap gap-1">
              {predefinedTags.map((tag) => (
                <Button
                  key={tag}
                  variant="ghost"
                  size="xs"
                  onClick={() => handleAddTag(tag)}
                  className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                  disabled={tags.includes(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="space-y-3 pt-4 border-t border-border">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Created
            </label>
            <p className="text-sm text-foreground font-mono">{createdAt}</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Modified
            </label>
            <p className="text-sm text-foreground font-mono">{modifiedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMetadata;