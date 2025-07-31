import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WhiteboardToolbar = ({ 
  activeTool, 
  onToolChange, 
  onUndo, 
  onRedo, 
  onZoomIn, 
  onZoomOut, 
  onResetZoom,
  canUndo,
  canRedo,
  zoomLevel 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const tools = [
    { id: 'select', icon: 'MousePointer', label: 'Select' },
    { id: 'pen', icon: 'Pen', label: 'Draw' },
    { id: 'text', icon: 'Type', label: 'Text' },
    { id: 'rectangle', icon: 'Square', label: 'Rectangle' },
    { id: 'circle', icon: 'Circle', label: 'Circle' },
    { id: 'arrow', icon: 'ArrowRight', label: 'Arrow' },
    { id: 'sticky', icon: 'StickyNote', label: 'Sticky Note' },
    { id: 'card', icon: 'FileText', label: 'Insert Card' }
  ];

  const brushSizes = [2, 4, 8, 16];
  const colors = ['#000000', '#4A9B8E', '#059669', '#10B981', '#EF4444', '#F59E0B', '#3B82F6', '#8B5CF6'];

  return (
    <div className={`fixed left-4 top-20 z-50 bg-card border border-border rounded-lg shadow-lg transition-all duration-300 ${
      isExpanded ? 'w-16' : 'w-12'
    }`}>
      {/* Toggle Button */}
      <div className="p-2 border-b border-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full h-8"
        >
          <Icon name={isExpanded ? "ChevronLeft" : "ChevronRight"} size={16} />
        </Button>
      </div>

      {/* Tools */}
      <div className="p-2 space-y-1">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={activeTool === tool.id ? "default" : "ghost"}
            size="icon"
            onClick={() => onToolChange(tool.id)}
            className="w-full h-10"
            title={tool.label}
          >
            <Icon name={tool.icon} size={18} />
          </Button>
        ))}
      </div>

      {/* Drawing Options */}
      {activeTool === 'pen' && (
        <div className="p-2 border-t border-border space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Brush Size</div>
          <div className="grid grid-cols-2 gap-1">
            {brushSizes.map((size) => (
              <Button
                key={size}
                variant="ghost"
                size="icon"
                className="w-full h-8"
                title={`${size}px`}
              >
                <div 
                  className="bg-foreground rounded-full"
                  style={{ width: size, height: size }}
                />
              </Button>
            ))}
          </div>
          
          <div className="text-xs font-medium text-muted-foreground mb-2">Colors</div>
          <div className="grid grid-cols-4 gap-1">
            {colors.map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-2 border-t border-border space-y-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo}
          className="w-full h-8"
          title="Undo"
        >
          <Icon name="Undo" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRedo}
          disabled={!canRedo}
          className="w-full h-8"
          title="Redo"
        >
          <Icon name="Redo" size={16} />
        </Button>
      </div>

      {/* Zoom Controls */}
      <div className="p-2 border-t border-border space-y-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomIn}
          className="w-full h-8"
          title="Zoom In"
        >
          <Icon name="ZoomIn" size={16} />
        </Button>
        <div className="text-xs text-center text-muted-foreground py-1">
          {Math.round(zoomLevel * 100)}%
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onZoomOut}
          className="w-full h-8"
          title="Zoom Out"
        >
          <Icon name="ZoomOut" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onResetZoom}
          className="w-full h-8"
          title="Reset Zoom"
        >
          <Icon name="RotateCcw" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default WhiteboardToolbar;