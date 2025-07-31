import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectSection = ({ project, onCardClick, onWhiteboardClick }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle card drop logic here
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h2 className="font-heading font-semibold text-heading-lg text-foreground">
            {project.name}
          </h2>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <span className="text-body-sm font-mono">
              {project.cardCount} Cards
            </span>
            <span className="text-body-sm font-mono">
              {project.whiteboardCount} Whiteboards
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
            onClick={() => onCardClick(project.id)}
          >
            Add Card
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="PenTool"
            iconPosition="left"
            iconSize={16}
            onClick={() => onWhiteboardClick(project.id)}
          >
            New Whiteboard
          </Button>
        </div>
      </div>

      <div
        className={`
          min-h-48 p-4 rounded-lg border-2 border-dashed transition-colors duration-200
          ${isDragOver 
            ? 'border-primary bg-primary/5' :'border-border bg-muted/30'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {project.cards.map((card) => (
            <div
              key={card.id}
              className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
              draggable
              onClick={() => onCardClick(project.id, card.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${card.type === 'Whiteboard' ? 'bg-accent/10 text-accent' :
                    card.type === 'Card' ? 'bg-primary/10 text-primary' :
                    card.type === 'Tag'? 'bg-warning/10 text-warning' : 'bg-secondary/10 text-secondary'
                  }
                `}>
                  {card.type}
                </span>
                <Icon 
                  name="MoreHorizontal" 
                  size={16} 
                  className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <h3 className="font-medium text-foreground text-body-sm mb-2 line-clamp-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-caption line-clamp-3">
                {card.preview}
              </p>
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                <span className="text-caption text-muted-foreground">
                  {card.lastModified}
                </span>
                {card.hasAttachments && (
                  <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>

        {project.cards.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon name="FileText" size={48} className="text-muted-foreground mb-4" />
            <h3 className="font-medium text-foreground mb-2">No cards yet</h3>
            <p className="text-muted-foreground text-body-sm mb-4">
              Start by creating your first card or whiteboard
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
                onClick={() => onCardClick(project.id)}
              >
                Create Card
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="PenTool"
                iconPosition="left"
                iconSize={16}
                onClick={() => onWhiteboardClick(project.id)}
              >
                New Whiteboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectSection;