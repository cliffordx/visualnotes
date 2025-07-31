import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WhiteboardSidebar = ({ 
  isOpen, 
  onToggle, 
  activeTab, 
  onTabChange,
  layers,
  onLayerToggle,
  selectedElement,
  onElementUpdate
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'layers', label: 'Layers', icon: 'Layers' },
    { id: 'library', label: 'Library', icon: 'Library' },
    { id: 'properties', label: 'Properties', icon: 'Settings' },
    { id: 'comments', label: 'Comments', icon: 'MessageCircle' }
  ];

  const mockLayers = [
    { id: 1, name: 'Background', visible: true, locked: false, type: 'background' },
    { id: 2, name: 'Cards', visible: true, locked: false, type: 'cards', count: 3 },
    { id: 3, name: 'Annotations', visible: true, locked: false, type: 'annotations', count: 5 },
    { id: 4, name: 'Connections', visible: true, locked: false, type: 'connections', count: 2 }
  ];

  const mockLibraryItems = [
    { id: 1, title: 'Research Methods', type: 'card', tags: ['Research', 'Methodology'] },
    { id: 2, title: 'Data Analysis', type: 'card', tags: ['Data', 'Analysis'] },
    { id: 3, title: 'Literature Review', type: 'card', tags: ['Literature', 'Review'] },
    { id: 4, title: 'Hypothesis Formation', type: 'card', tags: ['Hypothesis', 'Theory'] },
    { id: 5, title: 'Statistical Methods', type: 'card', tags: ['Statistics', 'Methods'] }
  ];

  const mockComments = [
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'SC',
      content: 'Should we add more detail about the data collection process?',
      timestamp: '2 hours ago',
      x: 300,
      y: 200,
      resolved: false
    },
    {
      id: 2,
      author: 'Michael Rodriguez',
      avatar: 'MR',
      content: 'The connection between these concepts could be clearer.',
      timestamp: '4 hours ago',
      x: 500,
      y: 350,
      resolved: true
    },
    {
      id: 3,
      author: 'You',
      avatar: 'YU',
      content: 'Added reference to Smith et al. (2023) for validation.',
      timestamp: '1 day ago',
      x: 400,
      y: 150,
      resolved: false
    }
  ];

  const renderLayersTab = () => (
    <div className="space-y-2">
      {mockLayers.map((layer) => (
        <div key={layer.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onLayerToggle(layer.id)}
              className="w-6 h-6"
            >
              <Icon name={layer.visible ? "Eye" : "EyeOff"} size={14} />
            </Button>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-foreground">{layer.name}</span>
                {layer.count && (
                  <span className="text-xs text-muted-foreground">({layer.count})</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground capitalize">{layer.type}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6"
          >
            <Icon name={layer.locked ? "Lock" : "Unlock"} size={14} />
          </Button>
        </div>
      ))}
    </div>
  );

  const renderLibraryTab = () => (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Search library..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="space-y-2">
        {mockLibraryItems
          .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((item) => (
            <div
              key={item.id}
              className="p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
              draggable
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-50 border border-green-200 rounded flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" size={16} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground truncate">{item.title}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  const renderPropertiesTab = () => (
    <div className="space-y-4">
      {selectedElement ? (
        <>
          <div>
            <h3 className="text-sm font-medium text-foreground mb-2">Element Properties</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Position</label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    type="number"
                    placeholder="X"
                    className="flex-1"
                    value={selectedElement.x || 0}
                  />
                  <Input
                    type="number"
                    placeholder="Y"
                    className="flex-1"
                    value={selectedElement.y || 0}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground">Size</label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    type="number"
                    placeholder="Width"
                    className="flex-1"
                    value={selectedElement.width || 0}
                  />
                  <Input
                    type="number"
                    placeholder="Height"
                    className="flex-1"
                    value={selectedElement.height || 0}
                  />
                </div>
              </div>

              {selectedElement.type === 'text' && (
                <div>
                  <label className="text-xs text-muted-foreground">Font Size</label>
                  <Input
                    type="number"
                    className="mt-1"
                    value={selectedElement.content?.fontSize || 16}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <Icon name="MousePointer" size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Select an element to view properties</p>
        </div>
      )}
    </div>
  );

  const renderCommentsTab = () => (
    <div className="space-y-3">
      {mockComments.map((comment) => (
        <div key={comment.id} className="p-3 border border-border rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-primary-foreground font-medium">{comment.avatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                  Reply
                </Button>
                {!comment.resolved && (
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    Resolve
                  </Button>
                )}
                {comment.resolved && (
                  <span className="text-xs text-success">✓ Resolved</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'layers': return renderLayersTab();
      case 'library': return renderLibraryTab();
      case 'properties': return renderPropertiesTab();
      case 'comments': return renderCommentsTab();
      default: return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed right-0 top-14 bottom-0 w-80 bg-card border-l border-border shadow-lg z-40
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Tab Navigation */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-2 text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="default"
        size="icon"
        onClick={onToggle}
        className={`
          fixed top-20 right-4 z-50 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : 'translate-x-0'}
        `}
      >
        <Icon name={isOpen ? "X" : "PanelRight"} size={20} />
      </Button>
    </>
  );
};

export default WhiteboardSidebar;