import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProfileSection from './components/ProfileSection';
import SecuritySection from './components/SecuritySection';
import NotificationSection from './components/NotificationSection';
import DisplaySection from './components/DisplaySection';
import DataSection from './components/DataSection';
import BillingSection from './components/BillingSection';

const ProfileAndSettings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const settingsCategories = [
    {
      id: 'profile',
      label: 'Profile Information',
      icon: 'User',
      description: 'Personal details and avatar'
    },
    {
      id: 'security',
      label: 'Account Security',
      icon: 'Shield',
      description: 'Password and authentication'
    },
    {
      id: 'notifications',
      label: 'Notification Preferences',
      icon: 'Bell',
      description: 'Email and push notifications'
    },
    {
      id: 'display',
      label: 'Display Settings',
      icon: 'Monitor',
      description: 'Theme and appearance'
    },
    {
      id: 'data',
      label: 'Data Management',
      icon: 'Database',
      description: 'Export and backup options'
    },
    {
      id: 'billing',
      label: 'Billing & Subscription',
      icon: 'CreditCard',
      description: 'Plans and payment methods'
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'security':
        return <SecuritySection />;
      case 'notifications':
        return <NotificationSection />;
      case 'display':
        return <DisplaySection />;
      case 'data':
        return <DataSection />;
      case 'billing':
        return <BillingSection />;
      default:
        return <ProfileSection />;
    }
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.settings-sidebar')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="lg:ml-sidebar pt-16">
        <div className="flex min-h-screen">
          {/* Settings Navigation Sidebar */}
          <div className={`
            settings-sidebar fixed lg:static inset-y-0 left-0 z-40 w-80 bg-card border-r border-border
            transform transition-transform duration-300 ease-out pt-16 lg:pt-0
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="h-full overflow-y-auto">
              {/* Settings Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-semibold text-foreground">Settings</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage your account and preferences
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </div>

              {/* Settings Categories */}
              <nav className="p-4">
                <div className="space-y-2">
                  {settingsCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeSection === category.id ? "default" : "ghost"}
                      onClick={() => handleSectionChange(category.id)}
                      iconName={category.icon}
                      iconPosition="left"
                      iconSize={18}
                      fullWidth
                      className="justify-start h-auto p-4"
                    >
                      <div className="flex-1 text-left">
                        <div className="font-medium">{category.label}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {category.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </nav>

              {/* Quick Actions */}
              <div className="p-4 border-t border-border mt-auto">
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="HelpCircle"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="justify-start"
                  >
                    Help & Support
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                    iconSize={16}
                    fullWidth
                    className="justify-start"
                  >
                    Send Feedback
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Backdrop */}
          {isMobileMenuOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          {/* Main Content */}
          <div className="flex-1 lg:ml-80">
            {/* Mobile Header */}
            <div className="lg:hidden bg-card border-b border-border p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Icon name="Menu" size={20} />
                </Button>
                <h1 className="text-lg font-semibold text-foreground">
                  {settingsCategories.find(cat => cat.id === activeSection)?.label}
                </h1>
                <div className="w-10" /> {/* Spacer for centering */}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 lg:p-8 max-w-4xl">
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndSettings;