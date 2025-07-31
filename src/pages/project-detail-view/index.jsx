import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/ui/Sidebar';
import ProjectHeader from './components/ProjectHeader';
import ContentFilters from './components/ContentFilters';
import ContentCard from './components/ContentCard';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import ProjectSidebar from './components/ProjectSidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ProjectDetailView = () => {
  const [project, setProject] = useState({
    id: 1,
    name: 'Research Methodology',
    description: 'Comprehensive study of research methodologies and their applications in academic research. This project encompasses various approaches to data collection, analysis techniques, and theoretical frameworks.',
    cardCount: 24,
    whiteboardCount: 3,
    lastModified: '2 hours ago',
    color: '#4A9B8E',
    status: 'active'
  });

  const [contentItems, setContentItems] = useState([
    {
      id: 1,
      type: 'card',
      title: 'Literature Review Framework',
      preview: 'A comprehensive framework for conducting systematic literature reviews in academic research...',
      content: `A comprehensive framework for conducting systematic literature reviews in academic research. This framework includes:\n\n1. Search Strategy Development\n2. Inclusion/Exclusion Criteria\n3. Data Extraction Methods\n4. Quality Assessment Tools\n5. Synthesis Techniques`,
      tags: ['research', 'framework', 'literature'],
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: 'whiteboard',
      title: 'Research Process Flow',
      preview: 'Visual representation of the complete research process from conception to publication',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      tags: ['process', 'visual', 'methodology'],
      lastModified: new Date(Date.now() - 4 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      type: 'card',
      title: 'Data Collection Methods',
      preview: 'Overview of quantitative and qualitative data collection techniques...',
      content: `Overview of quantitative and qualitative data collection techniques:\n\nQuantitative Methods:\n• Surveys and questionnaires\n• Experiments\n• Observational studies\n\nQualitative Methods:\n• Interviews\n• Focus groups\n• Ethnographic studies`,
      tags: ['data', 'methods', 'quantitative', 'qualitative'],
      lastModified: new Date(Date.now() - 6 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 4,
      type: 'card',
      title: 'Statistical Analysis Techniques',
      preview: 'Common statistical methods used in research analysis...',
      content: `Common statistical methods used in research analysis:\n\nDescriptive Statistics:\n• Mean, median, mode\n• Standard deviation\n• Frequency distributions\n\nInferential Statistics:\n• T-tests\n• ANOVA\n• Regression analysis\n• Chi-square tests`,
      tags: ['statistics', 'analysis', 'quantitative'],
      lastModified: new Date(Date.now() - 8 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 5,
      type: 'whiteboard',
      title: 'Theoretical Framework Map',
      preview: 'Visual mapping of theoretical concepts and their relationships',
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?w=400&h=300&fit=crop',
      tags: ['theory', 'framework', 'concepts'],
      lastModified: new Date(Date.now() - 12 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    },
    {
      id: 6,
      type: 'card',
      title: 'Research Ethics Guidelines',
      preview: 'Essential ethical considerations for research involving human subjects...',
      content: `Essential ethical considerations for research involving human subjects:\n\n1. Informed Consent\n• Voluntary participation\n• Clear explanation of procedures\n• Right to withdraw\n\n2. Confidentiality and Privacy\n• Data protection\n• Anonymization techniques\n• Secure storage\n\n3. Risk Assessment\n• Minimize harm\n• Risk-benefit analysis`,
      tags: ['ethics', 'guidelines', 'human subjects'],
      lastModified: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('modified');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(false);

  // Filter and sort content
  const filteredContent = contentItems
    .filter(item => {
      if (activeFilter !== 'all' && activeFilter !== item.type + 's') return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return item.title.toLowerCase().includes(query) ||
               item.preview.toLowerCase().includes(query) ||
               (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'modified':
          return new Date(b.lastModified) - new Date(a.lastModified);
        case 'created':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'name':
          return a.title.localeCompare(b.title);
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const handleItemSelect = (itemId, isSelected) => {
    setSelectedItems(prev => 
      isSelected 
        ? [...prev, itemId]
        : prev.filter(id => id !== itemId)
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredContent.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredContent.map(item => item.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedItems.length} items?`)) {
      setContentItems(prev => prev.filter(item => !selectedItems.includes(item.id)));
      setSelectedItems([]);
    }
  };

  const handleBulkTag = (tags) => {
    setContentItems(prev => prev.map(item => 
      selectedItems.includes(item.id)
        ? { ...item, tags: [...new Set([...(item.tags || []), ...tags])] }
        : item
    ));
    setSelectedItems([]);
  };

  const handleBulkMove = (projectId) => {
    // Move items to another project
    console.log('Moving items to project:', projectId);
    setSelectedItems([]);
  };

  const handleBulkArchive = () => {
    if (window.confirm(`Are you sure you want to archive ${selectedItems.length} items?`)) {
      // Archive items logic
      setSelectedItems([]);
    }
  };

  const handleAddCard = () => {
    window.location.href = '/card-editor';
  };

  const handleCreateWhiteboard = () => {
    window.location.href = '/whiteboard-interface';
  };

  const handleProjectUpdate = (updatedProject) => {
    setProject(updatedProject);
  };

  const handleItemEdit = (item) => {
    if (item.type === 'card') {
      window.location.href = `/card-editor?id=${item.id}`;
    } else {
      window.location.href = `/whiteboard-interface?id=${item.id}`;
    }
  };

  const handleItemDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setContentItems(prev => prev.filter(i => i.id !== item.id));
    }
  };

  const handleItemDuplicate = (item) => {
    const duplicatedItem = {
      ...item,
      id: Date.now(),
      title: `${item.title} (Copy)`,
      lastModified: new Date(),
      createdAt: new Date()
    };
    setContentItems(prev => [duplicatedItem, ...prev]);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsProjectSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="ml-sidebar">
        <div className="flex flex-col h-screen">
          {/* Project Header */}
          <ProjectHeader
            project={project}
            onAddCard={handleAddCard}
            onCreateWhiteboard={handleCreateWhiteboard}
            onProjectUpdate={handleProjectUpdate}
          />

          {/* Content Filters */}
          <ContentFilters
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Content Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-semibold text-foreground">
                      {activeFilter === 'all' ? 'All Content' : 
                       activeFilter === 'cards' ? 'Cards' : 'Whiteboards'}
                      <span className="text-muted-foreground ml-2">({filteredContent.length})</span>
                    </h2>
                    
                    {filteredContent.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleSelectAll}
                        iconName={selectedItems.length === filteredContent.length ? "CheckSquare" : "Square"}
                        iconPosition="left"
                        iconSize={16}
                      >
                        {selectedItems.length === filteredContent.length ? 'Deselect All' : 'Select All'}
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsProjectSidebarOpen(true)}
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    className="lg:hidden"
                  >
                    Project Tools
                  </Button>
                </div>

                {/* Content Grid/List */}
                {filteredContent.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Icon name="Search" size={24} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-foreground mb-2">No content found</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      {searchQuery 
                        ? `No items match your search for "${searchQuery}"`
                        : activeFilter === 'cards' ?'No cards in this project yet. Create your first card to get started.'
                          : activeFilter === 'whiteboards' ?'No whiteboards in this project yet. Create your first whiteboard to get started.' :'This project is empty. Add some cards or whiteboards to get started.'
                      }
                    </p>
                    <div className="flex items-center space-x-3 mt-6">
                      <Button
                        variant="default"
                        onClick={handleAddCard}
                        iconName="Plus"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Add Card
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleCreateWhiteboard}
                        iconName="PenTool"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Create Whiteboard
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={
                    viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' :'space-y-4'
                  }>
                    {filteredContent.map((item) => (
                      <ContentCard
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.includes(item.id)}
                        onSelect={handleItemSelect}
                        onEdit={() => handleItemEdit(item)}
                        onDelete={() => handleItemDelete(item)}
                        onDuplicate={() => handleItemDuplicate(item)}
                        viewMode={viewMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        selectedCount={selectedItems.length}
        onClearSelection={handleClearSelection}
        onBulkDelete={handleBulkDelete}
        onBulkTag={handleBulkTag}
        onBulkMove={handleBulkMove}
        onBulkArchive={handleBulkArchive}
      />

      {/* Project Sidebar */}
      <ProjectSidebar
        project={project}
        isOpen={isProjectSidebarOpen}
        onClose={() => setIsProjectSidebarOpen(false)}
      />

      {/* Desktop Project Sidebar Toggle */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsProjectSidebarOpen(true)}
        className="fixed top-20 right-4 z-30 hidden lg:flex"
      >
        <Icon name="Settings" size={20} />
      </Button>
    </div>
  );
};

export default ProjectDetailView;