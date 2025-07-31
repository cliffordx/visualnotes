import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const ContentCard = ({ 
  item, 
  isSelected, 
  onSelect, 
  onEdit, 
  onDelete, 
  onDuplicate,
  viewMode = 'grid' 
}) => {
  const [showActions, setShowActions] = useState(false);

  const handleCardClick = () => {
    if (item.type === 'card') {
      window.location.href = `/card-editor?id=${item.id}`;
    } else {
      window.location.href = `/whiteboard-interface?id=${item.id}`;
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (viewMode === 'list') {
    return (
      <div className={`
        flex items-center p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all duration-150
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}>
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(item.id, e.target.checked)}
          className="mr-4"
        />
        
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <div className="flex-shrink-0">
            {item.type === 'card' ? (
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-accent" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="PenTool" size={20} className="text-primary" />
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground truncate cursor-pointer hover:text-primary" onClick={handleCardClick}>
              {item.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{item.preview}</p>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-xs text-muted-foreground">{formatDate(item.lastModified)}</span>
              {item.tags && item.tags.length > 0 && (
                <div className="flex items-center space-x-1">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{item.tags.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="w-8 h-8"
          >
            <Icon name="Edit2" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDuplicate}
            className="w-8 h-8"
          >
            <Icon name="Copy" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="w-8 h-8 text-destructive hover:text-destructive"
          >
            <Icon name="Trash2" size={14} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`
        relative group bg-accent/5 rounded-lg p-3 transition-all duration-150 hover:shadow-md cursor-pointer
        ${isSelected ? 'ring-2 ring-primary' : ''}
      `}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Selection Checkbox */}
      <div className="absolute top-2 left-2 z-10">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(item.id, e.target.checked)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>

      {/* Content Type Icon */}
      <div className="absolute top-2 right-2 z-10">
        {item.type === 'card' ? (
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="FileText" size={12} color="white" />
          </div>
        ) : (
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Icon name="PenTool" size={12} color="white" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="bg-card rounded-lg p-4 min-h-[200px] flex flex-col" onClick={handleCardClick}>
        {item.type === 'whiteboard' && item.thumbnail ? (
          <div className="flex-1 mb-3">
            <Image
              src={item.thumbnail}
              alt={`${item.title} thumbnail`}
              className="w-full h-32 object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="flex-1 mb-3">
            <div className="text-sm text-foreground line-clamp-6">
              {item.content || item.preview}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="font-medium text-foreground truncate">{item.title}</h3>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                  {tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-muted-foreground">+{item.tags.length - 3}</span>
              )}
            </div>
          )}
          
          <div className="text-xs text-muted-foreground">
            {formatDate(item.lastModified)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="absolute bottom-2 right-2 flex items-center space-x-1 bg-card border border-border rounded-lg shadow-lg p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="w-7 h-7"
          >
            <Icon name="Edit2" size={12} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="w-7 h-7"
          >
            <Icon name="Copy" size={12} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="w-7 h-7 text-destructive hover:text-destructive"
          >
            <Icon name="Trash2" size={12} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentCard;