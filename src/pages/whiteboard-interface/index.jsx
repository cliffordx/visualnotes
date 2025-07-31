import React, { useState, useCallback } from 'react';
import WhiteboardHeader from './components/WhiteboardHeader';
import WhiteboardToolbar from './components/WhiteboardToolbar';
import WhiteboardCanvas from './components/WhiteboardCanvas';
import WhiteboardSidebar from './components/WhiteboardSidebar';

const WhiteboardInterface = () => {
  // Whiteboard state
  const [whiteboardTitle, setWhiteboardTitle] = useState('Research Framework Overview');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error', 'unsaved'
  const [activeTool, setActiveTool] = useState('select');
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('layers');

  // History for undo/redo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Handlers
  const handleTitleChange = useCallback((newTitle) => {
    setWhiteboardTitle(newTitle);
    setSaveStatus('unsaved');
  }, []);

  const handleSave = useCallback(() => {
    setSaveStatus('saving');
    // Simulate save operation
    setTimeout(() => {
      setSaveStatus('saved');
    }, 1000);
  }, []);

  const handleShare = useCallback(() => {
    // Implement share functionality
    console.log('Share whiteboard');
  }, []);

  const handleSettings = useCallback(() => {
    // Implement settings functionality
    console.log('Open settings');
  }, []);

  const handleToolChange = useCallback((tool) => {
    setActiveTool(tool);
  }, []);

  const handleElementCreate = useCallback((element) => {
    const newElement = {
      ...element,
      id: Date.now() + Math.random()
    };
    setElements(prev => [...prev, newElement]);
    setSaveStatus('unsaved');
  }, []);

  const handleElementSelect = useCallback((elementId) => {
    const element = elements.find(el => el.id === elementId);
    setSelectedElement(element);
  }, [elements]);

  const handleElementUpdate = useCallback((elementId, updates) => {
    setElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, ...updates } : el
    ));
    setSaveStatus('unsaved');
  }, []);

  const handleUndo = useCallback(() => {
    if (canUndo && historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setElements(history[historyIndex - 1]);
      setCanRedo(true);
      if (historyIndex - 1 === 0) {
        setCanUndo(false);
      }
    }
  }, [canUndo, historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (canRedo && historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setElements(history[historyIndex + 1]);
      setCanUndo(true);
      if (historyIndex + 1 === history.length - 1) {
        setCanRedo(false);
      }
    }
  }, [canRedo, historyIndex, history]);

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(3, prev * 1.2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(0.1, prev / 1.2));
  }, []);

  const handleResetZoom = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleZoomChange = useCallback((newZoom) => {
    setZoomLevel(newZoom);
  }, []);

  const handlePanChange = useCallback((newOffset) => {
    setPanOffset(newOffset);
  }, []);

  const handleSidebarToggle = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  const handleLayerToggle = useCallback((layerId) => {
    // Implement layer visibility toggle
    console.log('Toggle layer:', layerId);
  }, []);

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <WhiteboardHeader
        whiteboardTitle={whiteboardTitle}
        onTitleChange={handleTitleChange}
        saveStatus={saveStatus}
        onSave={handleSave}
        onShare={handleShare}
        onSettings={handleSettings}
      />

      {/* Main Content */}
      <div className="flex h-full pt-14">
        {/* Left Toolbar */}
        <WhiteboardToolbar
          activeTool={activeTool}
          onToolChange={handleToolChange}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetZoom={handleResetZoom}
          canUndo={canUndo}
          canRedo={canRedo}
          zoomLevel={zoomLevel}
        />

        {/* Canvas */}
        <WhiteboardCanvas
          activeTool={activeTool}
          onElementCreate={handleElementCreate}
          elements={elements}
          selectedElement={selectedElement}
          onElementSelect={handleElementSelect}
          zoomLevel={zoomLevel}
          onZoomChange={handleZoomChange}
          panOffset={panOffset}
          onPanChange={handlePanChange}
        />

        {/* Right Sidebar */}
        <WhiteboardSidebar
          isOpen={isSidebarOpen}
          onToggle={handleSidebarToggle}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          layers={[]}
          onLayerToggle={handleLayerToggle}
          selectedElement={selectedElement}
          onElementUpdate={handleElementUpdate}
        />
      </div>
    </div>
  );
};

export default WhiteboardInterface;