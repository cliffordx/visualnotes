import React, { useRef, useEffect, useState, useCallback } from 'react';


const WhiteboardCanvas = ({ 
  activeTool, 
  onElementCreate, 
  elements, 
  selectedElement,
  onElementSelect,
  zoomLevel,
  onZoomChange,
  panOffset,
  onPanChange
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Mock whiteboard elements
  const mockElements = [
    {
      id: 1,
      type: 'card',
      x: 200,
      y: 150,
      width: 280,
      height: 180,
      content: {
        title: 'Research Methodology',
        description: `Key principles for conducting systematic research:\n\n• Define clear research questions\n• Choose appropriate methodology\n• Ensure data validity and reliability\n• Document all procedures`,
        tags: ['Research', 'Methodology']
      }
    },
    {
      id: 2,
      type: 'card',
      x: 550,
      y: 200,
      width: 280,
      height: 160,
      content: {
        title: 'Data Collection Methods',
        description: `Primary data collection approaches:\n\n• Surveys and questionnaires\n• Interviews (structured/unstructured)\n• Observations\n• Experiments`,
        tags: ['Data', 'Collection']
      }
    },
    {
      id: 3,
      type: 'sticky',
      x: 350,
      y: 400,
      width: 200,
      height: 120,
      content: {
        text: 'Remember to validate findings with multiple sources',
        color: '#FEF3C7'
      }
    },
    {
      id: 4,
      type: 'text',
      x: 150,
      y: 50,
      width: 400,
      height: 60,
      content: {
        text: 'Research Framework Overview',
        fontSize: 24,
        fontWeight: 'bold'
      }
    },
    {
      id: 5,
      type: 'arrow',
      x1: 480,
      y1: 240,
      x2: 550,
      y2: 280,
      strokeWidth: 2,
      color: '#4A9B8E'
    }
  ];

  const handleMouseDown = useCallback((e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
    const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;

    if (activeTool === 'select') {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (activeTool === 'pen') {
      setIsDrawing(true);
      setCurrentPath([{ x, y }]);
    } else if (activeTool === 'text') {
      onElementCreate({
        type: 'text',
        x,
        y,
        width: 200,
        height: 40,
        content: { text: 'New text', fontSize: 16 }
      });
    } else if (activeTool === 'sticky') {
      onElementCreate({
        type: 'sticky',
        x,
        y,
        width: 200,
        height: 120,
        content: { text: 'New note', color: '#FEF3C7' }
      });
    }
  }, [activeTool, zoomLevel, panOffset, onElementCreate]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && activeTool === 'select') {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      onPanChange({
        x: panOffset.x + deltaX,
        y: panOffset.y + deltaY
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (isDrawing && activeTool === 'pen') {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - panOffset.x) / zoomLevel;
      const y = (e.clientY - rect.top - panOffset.y) / zoomLevel;
      setCurrentPath(prev => [...prev, { x, y }]);
    }
  }, [isDragging, isDrawing, activeTool, dragStart, panOffset, zoomLevel, onPanChange]);

  const handleMouseUp = useCallback(() => {
    if (isDrawing && currentPath.length > 1) {
      onElementCreate({
        type: 'path',
        path: currentPath,
        strokeWidth: 2,
        color: '#000000'
      });
    }
    setIsDrawing(false);
    setIsDragging(false);
    setCurrentPath([]);
  }, [isDrawing, currentPath, onElementCreate]);

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(3, zoomLevel * delta));
    onZoomChange(newZoom);
  }, [zoomLevel, onZoomChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false });
      return () => canvas.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const renderElement = (element) => {
    const style = {
      position: 'absolute',
      left: element.x * zoomLevel,
      top: element.y * zoomLevel,
      transform: `scale(${zoomLevel})`,
      transformOrigin: 'top left'
    };

    switch (element.type) {
      case 'card':
        return (
          <div
            key={element.id}
            style={style}
            className="bg-green-50 border border-green-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onElementSelect(element.id)}
          >
            <div className="bg-white rounded p-3 shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">{element.content.title}</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line mb-2">
                {element.content.description}
              </p>
              <div className="flex flex-wrap gap-1">
                {element.content.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'sticky':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              backgroundColor: element.content.color,
              width: element.width,
              height: element.height
            }}
            className="border border-yellow-300 rounded-lg p-3 cursor-pointer shadow-sm"
            onClick={() => onElementSelect(element.id)}
          >
            <p className="text-sm text-gray-800">{element.content.text}</p>
          </div>
        );

      case 'text':
        return (
          <div
            key={element.id}
            style={{
              ...style,
              fontSize: element.content.fontSize,
              fontWeight: element.content.fontWeight
            }}
            className="text-foreground cursor-pointer"
            onClick={() => onElementSelect(element.id)}
          >
            {element.content.text}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex-1 relative overflow-hidden bg-gray-50"
      style={{ cursor: activeTool === 'select' ? 'grab' : 'crosshair' }}
    >
      <div
        ref={canvasRef}
        className="w-full h-full relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px)`
        }}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e7eb 1px, transparent 1px),
              linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
            `,
            backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`
          }}
        />

        {/* Render Elements */}
        {mockElements.map(renderElement)}

        {/* Current Drawing Path */}
        {isDrawing && currentPath.length > 1 && (
          <svg className="absolute inset-0 pointer-events-none">
            <path
              d={`M ${currentPath.map(p => `${p.x * zoomLevel},${p.y * zoomLevel}`).join(' L ')}`}
              stroke="#000000"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {/* Minimap */}
      <div className="absolute bottom-4 right-4 w-48 h-32 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-full bg-gray-100 relative">
          <div className="absolute inset-0 bg-primary/20 border-2 border-primary rounded" 
               style={{
                 left: `${-panOffset.x / 10}px`,
                 top: `${-panOffset.y / 10}px`,
                 width: `${100 / zoomLevel}%`,
                 height: `${100 / zoomLevel}%`
               }}
          />
          {mockElements.map((element, index) => (
            <div
              key={index}
              className="absolute bg-primary/60 rounded"
              style={{
                left: element.x / 10,
                top: element.y / 10,
                width: (element.width || 20) / 10,
                height: (element.height || 20) / 10
              }}
            />
          ))}
        </div>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg px-3 py-2 shadow-lg">
        <span className="text-sm font-mono text-muted-foreground">
          {Math.round(zoomLevel * 100)}%
        </span>
      </div>
    </div>
  );
};

export default WhiteboardCanvas;