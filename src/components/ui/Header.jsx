import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard-main-workspace', icon: 'LayoutDashboard' },
    { label: 'Projects', path: '/project-detail-view', icon: 'FolderOpen' },
    { label: 'Card Editor', path: '/card-editor', icon: 'FileText' },
    { label: 'Whiteboard', path: '/whiteboard-interface', icon: 'PenTool' },
  ];

  const secondaryItems = [
    { label: 'Profile', path: '/profile-and-settings', icon: 'User' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-sidebar bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="BookOpen" size={20} color="white" />
          </div>
          <span className="font-heading font-semibold text-heading-md text-foreground">
            VisualNotes
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item.path)}
              iconName={item.icon}
              iconPosition="left"
              iconSize={16}
              className="text-nav"
            >
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleNavigation('/profile-and-settings')}
            className={isActive('/profile-and-settings') ? 'bg-muted' : ''}
          >
            <Icon name="User" size={20} />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-6 py-4 space-y-2">
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
                className="justify-start text-nav"
              >
                {item.label}
              </Button>
            ))}
            <div className="pt-2 mt-2 border-t border-border">
              {secondaryItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  iconName={item.icon}
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                  className="justify-start text-nav"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;