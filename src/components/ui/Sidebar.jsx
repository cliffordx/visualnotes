import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard-main-workspace', icon: 'LayoutDashboard' },
    { label: 'Inbox', path: '/inbox', icon: 'Inbox', badge: 38 },
    { label: 'Journal', path: '/journal', icon: 'BookOpen' },
    { label: 'Card Library', path: '/card-library', icon: 'Library' },
  ];

  const projects = [
    { 
      id: 1, 
      name: 'Research Methodology', 
      cardCount: 24, 
      whiteboardCount: 3, 
      lastModified: '2 hours ago',
      color: '#4A9B8E'
    },
    { 
      id: 2, 
      name: 'Literature Review', 
      cardCount: 18, 
      whiteboardCount: 2, 
      lastModified: '1 day ago',
      color: '#059669'
    },
    { 
      id: 3, 
      name: 'Data Analysis', 
      cardCount: 31, 
      whiteboardCount: 5, 
      lastModified: '3 days ago',
      color: '#10B981'
    },
  ];

  const currentUser = {
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@university.edu',
    avatar: '/assets/images/avatar.jpg'
  };

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleProjectNavigation = (projectId) => {
    window.location.href = `/project-detail-view?id=${projectId}`;
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    window.location.href = '/authentication-login-register';
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Backdrop for mobile */}
      {isExpanded && window.innerWidth < 1024 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-backdrop lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-muted border-r border-border z-sidebar
        transition-transform duration-300 ease-out
        ${isExpanded ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-sidebar
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-sidebar-padding py-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="BookOpen" size={20} color="white" />
              </div>
              <span className="font-heading font-semibold text-heading-md text-foreground">
                VisualNotes
              </span>
            </div>
          </div>

          {/* Global Search */}
          <div className="px-sidebar-padding py-4 border-b border-border">
            <Input
              type="search"
              placeholder="Search across all content..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full"
            />
          </div>

          {/* Main Navigation */}
          <nav className="px-sidebar-padding py-4 space-y-2">
            {navigationItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                iconName={item.icon}
                iconPosition="left"
                iconSize={16}
                fullWidth
                className="justify-start text-nav h-nav-item"
              >
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-mono">
                    {item.badge}
                  </span>
                )}
              </Button>
            ))}
          </nav>

          {/* Projects Section */}
          <div className="flex-1 px-sidebar-padding py-4 border-t border-border overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-medium text-heading-sm text-foreground">
                Projects
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation('/project-detail-view')}
                className="w-6 h-6"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>
            
            <div className="space-y-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-3 rounded-lg border border-border bg-card hover:bg-muted/50 cursor-pointer transition-colors duration-150"
                  onClick={() => handleProjectNavigation(project.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: project.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-nav-project text-foreground truncate">
                        {project.name}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-caption text-muted-foreground font-mono">
                          {project.cardCount} cards
                        </span>
                        <span className="text-caption text-muted-foreground font-mono">
                          {project.whiteboardCount} boards
                        </span>
                      </div>
                      <p className="text-caption text-muted-foreground mt-1">
                        {project.lastModified}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile */}
          <div className="px-sidebar-padding py-4 border-t border-border relative">
            <Button
              variant="ghost"
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              fullWidth
              className="justify-start h-auto p-3"
            >
              <div className="flex items-center space-x-3 w-full">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-nav text-foreground truncate">{currentUser.name}</p>
                  <p className="text-caption text-muted-foreground truncate">{currentUser.email}</p>
                </div>
                <Icon 
                  name={isProfileDropdownOpen ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-muted-foreground flex-shrink-0"
                />
              </div>
            </Button>

            {/* Profile Dropdown */}
            {isProfileDropdownOpen && (
              <div className="absolute bottom-full left-sidebar-padding right-sidebar-padding mb-2 bg-popover border border-border rounded-lg shadow-elevation-2 z-dropdown">
                <div className="py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/profile-and-settings')}
                    iconName="Settings"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="justify-start px-3 text-nav"
                  >
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavigation('/help')}
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="justify-start px-3 text-nav"
                  >
                    Help
                  </Button>
                  <div className="border-t border-border my-1" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="justify-start px-3 text-nav text-destructive hover:text-destructive"
                  >
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <Button
        variant="default"
        size="icon"
        onClick={() => setIsExpanded(true)}
        className={`
          fixed top-4 left-4 z-dropdown lg:hidden
          ${isExpanded ? 'hidden' : 'flex'}
        `}
      >
        <Icon name="Menu" size={20} />
      </Button>
    </>
  );
};

export default Sidebar;