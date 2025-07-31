import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';

const RightPanel = ({ isOpen, onToggle, onNewCard, onNewWhiteboard, onNewProject }) => {
  const [activeTab, setActiveTab] = useState('actions');

  const tabs = [
    { id: 'actions', label: 'Actions', icon: 'Zap' },
    { id: 'activity', label: 'Activity', icon: 'Clock' },
    { id: 'insights', label: 'Insights', icon: 'BarChart3' }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Panel */}
      <div className={`
        fixed right-0 top-0 h-full w-80 bg-background border-l border-border z-50
        transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        lg:relative lg:translate-x-0 lg:w-80 lg:z-auto
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-heading font-medium text-heading-sm text-foreground">
              Workspace Panel
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 py-3 px-4
                  text-body-sm font-medium transition-colors duration-200
                  ${activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <Icon name={tab.icon} size={16} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {activeTab === 'actions' && (
              <QuickActions
                onNewCard={onNewCard}
                onNewWhiteboard={onNewWhiteboard}
                onNewProject={onNewProject}
              />
            )}

            {activeTab === 'activity' && <RecentActivity />}

            {activeTab === 'insights' && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-medium text-heading-sm text-foreground">
                    Workspace Insights
                  </h3>
                  <Icon name="BarChart3" size={16} className="text-muted-foreground" />
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body-sm text-foreground">Most Active Project</span>
                      <Icon name="TrendingUp" size={14} className="text-success" />
                    </div>
                    <p className="font-medium text-foreground">Research Methodology</p>
                    <p className="text-caption text-muted-foreground">24 cards, 3 whiteboards</p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body-sm text-foreground">Weekly Progress</span>
                      <Icon name="Calendar" size={14} className="text-primary" />
                    </div>
                    <p className="font-medium text-foreground">12 new cards</p>
                    <p className="text-caption text-muted-foreground">+20% from last week</p>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-body-sm text-foreground">Knowledge Connections</span>
                      <Icon name="GitBranch" size={14} className="text-accent" />
                    </div>
                    <p className="font-medium text-foreground">47 connections</p>
                    <p className="text-caption text-muted-foreground">Across 3 projects</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button for Desktop */}
      {!isOpen && (
        <Button
          variant="default"
          size="icon"
          onClick={onToggle}
          className="fixed right-4 top-20 z-30 lg:hidden"
        >
          <Icon name="PanelRight" size={20} />
        </Button>
      )}
    </>
  );
};

export default RightPanel;