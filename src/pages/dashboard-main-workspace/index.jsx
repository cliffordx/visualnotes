import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/ui/Sidebar';
import WorkspaceHeader from './components/WorkspaceHeader';
import StatsOverview from './components/StatsOverview';
import ProjectSection from './components/ProjectSection';
import RightPanel from './components/RightPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const DashboardMainWorkspace = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('grid');
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: 'Getting Started',
      cardCount: 14,
      whiteboardCount: 0,
      cards: [
        {
          id: 1,
          title: 'Welcome to VisualNotes',
          type: 'Card',
          preview: 'Learn the basics of organizing your knowledge with visual note-taking techniques and card-based systems.',
          lastModified: '2 hours ago',
          hasAttachments: false
        },
        {
          id: 2,
          title: 'Project Setup Guide',
          type: 'Card',
          preview: 'Step-by-step instructions for creating your first project and organizing your research materials effectively.',
          lastModified: '1 day ago',
          hasAttachments: true
        },
        {
          id: 3,
          title: 'Keyboard Shortcuts',
          type: 'Global Tool',
          preview: 'Master the essential keyboard shortcuts to speed up your workflow and navigate efficiently.',
          lastModified: '2 days ago',
          hasAttachments: false
        },
        {
          id: 4,
          title: 'Collaboration Features',
          type: 'Card',
          preview: 'Discover how to share projects, collaborate with team members, and manage permissions.',
          lastModified: '3 days ago',
          hasAttachments: true
        }
      ]
    },
    {
      id: 2,
      name: 'PARA System',
      cardCount: 4,
      whiteboardCount: 0,
      cards: [
        {
          id: 5,
          title: 'Projects Overview',
          type: 'Card',
          preview: 'Active projects with specific outcomes and deadlines. Track progress and maintain focus on deliverables.',
          lastModified: '1 hour ago',
          hasAttachments: false
        },
        {
          id: 6,
          title: 'Areas of Responsibility',
          type: 'Tag',
          preview: 'Ongoing areas that require maintenance and attention. Health, finances, professional development.',
          lastModified: '4 hours ago',
          hasAttachments: false
        },
        {
          id: 7,
          title: 'Resource Collection',
          type: 'Card',
          preview: 'Valuable resources for future reference. Articles, templates, tools, and reference materials.',
          lastModified: '1 day ago',
          hasAttachments: true
        },
        {
          id: 8,
          title: 'Archive System',
          type: 'Archival System',
          preview: 'Completed projects and inactive materials. Organized for easy retrieval when needed.',
          lastModified: '2 days ago',
          hasAttachments: false
        }
      ]
    },
    {
      id: 3,
      name: 'My Library',
      cardCount: 5,
      whiteboardCount: 1,
      cards: [
        {
          id: 9,
          title: 'Research Methodology',
          type: 'Topic Learning',
          preview: 'Comprehensive notes on qualitative and quantitative research methods, data collection techniques.',
          lastModified: '30 minutes ago',
          hasAttachments: true
        },
        {
          id: 10,
          title: 'Literature Review Process',
          type: 'Project Research',
          preview: 'Systematic approach to conducting literature reviews, source evaluation, and synthesis techniques.',
          lastModified: '2 hours ago',
          hasAttachments: true
        },
        {
          id: 11,
          title: 'Data Analysis Techniques',
          type: 'Card',
          preview: 'Statistical methods, visualization tools, and interpretation strategies for research data.',
          lastModified: '5 hours ago',
          hasAttachments: false
        },
        {
          id: 12,
          title: 'Academic Writing',
          type: 'Card',
          preview: 'Guidelines for scholarly writing, citation styles, and publication strategies.',
          lastModified: '1 day ago',
          hasAttachments: true
        },
        {
          id: 13,
          title: 'Knowledge Mapping',
          type: 'Whiteboard',
          preview: 'Visual representation of concept relationships and knowledge structures.',
          lastModified: '2 days ago',
          hasAttachments: false
        }
      ]
    }
  ];

  // Mock stats data
  const stats = {
    totalCards: 23,
    totalWhiteboards: 1,
    activeProjects: 3,
    connections: 47
  };

  const handleCardClick = (projectId, cardId) => {
    if (cardId) {
      navigate(`/card-editor?project=${projectId}&card=${cardId}`);
    } else {
      navigate(`/card-editor?project=${projectId}`);
    }
  };

  const handleWhiteboardClick = (projectId) => {
    navigate(`/whiteboard-interface?project=${projectId}`);
  };

  const handleNewWhiteboard = () => {
    navigate('/whiteboard-interface');
  };

  const handleNewCard = () => {
    navigate('/card-editor');
  };

  const handleNewProject = () => {
    navigate('/project-detail-view');
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const toggleRightPanel = () => {
    setIsRightPanelOpen(!isRightPanelOpen);
  };

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsRightPanelOpen(true);
      } else {
        setIsRightPanelOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <div className="lg:ml-sidebar">
        <WorkspaceHeader
          onNewWhiteboard={handleNewWhiteboard}
          onViewChange={handleViewChange}
          currentView={currentView}
        />

        <div className="flex">
          {/* Main Content */}
          <div className={`
            flex-1 p-6 transition-all duration-300
            ${isRightPanelOpen ? 'lg:mr-80' : 'mr-0'}
          `}>
            <StatsOverview stats={stats} />

            <div className="space-y-8">
              {projects.map((project) => (
                <ProjectSection
                  key={project.id}
                  project={project}
                  onCardClick={handleCardClick}
                  onWhiteboardClick={handleWhiteboardClick}
                />
              ))}
            </div>

            {/* Empty State for New Users */}
            {projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                  <Icon name="FolderOpen" size={48} className="text-muted-foreground" />
                </div>
                <h2 className="font-heading font-semibold text-heading-lg text-foreground mb-2">
                  Welcome to VisualNotes
                </h2>
                <p className="text-muted-foreground text-body-md mb-6 max-w-md">
                  Start organizing your knowledge by creating your first project or importing existing notes.
                </p>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="default"
                    iconName="Plus"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleNewProject}
                  >
                    Create Project
                  </Button>
                  <Button
                    variant="outline"
                    iconName="FileText"
                    iconPosition="left"
                    iconSize={16}
                    onClick={handleNewCard}
                  >
                    New Card
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <RightPanel
            isOpen={isRightPanelOpen}
            onToggle={toggleRightPanel}
            onNewCard={handleNewCard}
            onNewWhiteboard={handleNewWhiteboard}
            onNewProject={handleNewProject}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainWorkspace;