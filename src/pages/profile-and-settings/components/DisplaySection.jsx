import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DisplaySection = () => {
  const [theme, setTheme] = useState('light');
  const [cardDensity, setCardDensity] = useState('comfortable');
  const [defaultProjectView, setDefaultProjectView] = useState('grid');
  const [fontSize, setFontSize] = useState('medium');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showCardPreviews, setShowCardPreviews] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compactMode, setCompactMode] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light Theme', description: 'Clean and bright interface' },
    { value: 'dark', label: 'Dark Theme', description: 'Easy on the eyes in low light' },
    { value: 'auto', label: 'Auto', description: 'Matches your system preference' }
  ];

  const densityOptions = [
    { value: 'compact', label: 'Compact', description: 'More cards visible at once' },
    { value: 'comfortable', label: 'Comfortable', description: 'Balanced spacing and readability' },
    { value: 'spacious', label: 'Spacious', description: 'Maximum readability with generous spacing' }
  ];

  const viewOptions = [
    { value: 'grid', label: 'Grid View', description: 'Cards arranged in a grid layout' },
    { value: 'list', label: 'List View', description: 'Cards displayed in a vertical list' },
    { value: 'board', label: 'Board View', description: 'Kanban-style board layout' }
  ];

  const fontSizeOptions = [
    { value: 'small', label: 'Small', description: '14px base font size' },
    { value: 'medium', label: 'Medium', description: '16px base font size' },
    { value: 'large', label: 'Large', description: '18px base font size' },
    { value: 'extra-large', label: 'Extra Large', description: '20px base font size' }
  ];

  useEffect(() => {
    // Apply theme changes to document
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font-size', fontSize);
    document.documentElement.setAttribute('data-density', cardDensity);
    
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  }, [theme, fontSize, cardDensity, highContrast, reducedMotion]);

  const handleSaveSettings = () => {
    const settings = {
      theme,
      cardDensity,
      defaultProjectView,
      fontSize,
      sidebarCollapsed,
      showCardPreviews,
      animationsEnabled,
      highContrast,
      reducedMotion,
      compactMode
    };
    
    localStorage.setItem('displaySettings', JSON.stringify(settings));
    console.log('Display settings saved:', settings);
  };

  const handleResetToDefaults = () => {
    setTheme('light');
    setCardDensity('comfortable');
    setDefaultProjectView('grid');
    setFontSize('medium');
    setSidebarCollapsed(false);
    setShowCardPreviews(true);
    setAnimationsEnabled(true);
    setHighContrast(false);
    setReducedMotion(false);
    setCompactMode(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Display Settings</h2>
          <p className="text-muted-foreground mt-1">
            Customize the appearance and layout of your workspace
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleResetToDefaults}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Reset to Defaults
        </Button>
      </div>

      {/* Theme Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Palette" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Theme & Appearance</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Select
            label="Color Theme"
            description="Choose your preferred color scheme"
            options={themeOptions}
            value={theme}
            onChange={setTheme}
          />
          
          <Select
            label="Font Size"
            description="Adjust text size for better readability"
            options={fontSizeOptions}
            value={fontSize}
            onChange={setFontSize}
          />
        </div>

        {/* Theme Preview */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium text-foreground mb-3">Preview</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themeOptions.map((option) => (
              <div
                key={option.value}
                className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  theme === option.value 
                    ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50'
                }`}
                onClick={() => setTheme(option.value)}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-4 h-4 rounded-full ${
                    option.value === 'light' ? 'bg-white border-2 border-gray-300' :
                    option.value === 'dark'? 'bg-gray-800' : 'bg-gradient-to-r from-white to-gray-800'
                  }`} />
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{option.description}</p>
                {theme === option.value && (
                  <Icon name="Check" size={16} className="absolute top-2 right-2 text-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Layout Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Layout" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Layout & Density</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Select
            label="Card Density"
            description="Control spacing between cards and elements"
            options={densityOptions}
            value={cardDensity}
            onChange={setCardDensity}
          />
          
          <Select
            label="Default Project View"
            description="How projects are displayed by default"
            options={viewOptions}
            value={defaultProjectView}
            onChange={setDefaultProjectView}
          />
        </div>

        <div className="mt-6 space-y-4">
          <Checkbox
            label="Collapsed Sidebar by Default"
            description="Start with sidebar minimized to maximize workspace"
            checked={sidebarCollapsed}
            onChange={(e) => setSidebarCollapsed(e.target.checked)}
          />
          
          <Checkbox
            label="Show Card Previews"
            description="Display content previews when hovering over cards"
            checked={showCardPreviews}
            onChange={(e) => setShowCardPreviews(e.target.checked)}
          />
          
          <Checkbox
            label="Compact Mode"
            description="Reduce padding and margins for more content on screen"
            checked={compactMode}
            onChange={(e) => setCompactMode(e.target.checked)}
          />
        </div>
      </div>

      {/* Animation & Motion */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Zap" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Animation & Motion</h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Animations"
            description="Smooth transitions and hover effects"
            checked={animationsEnabled}
            onChange={(e) => setAnimationsEnabled(e.target.checked)}
          />
          
          <Checkbox
            label="Reduced Motion"
            description="Minimize animations for better accessibility"
            checked={reducedMotion}
            onChange={(e) => setReducedMotion(e.target.checked)}
          />
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Eye" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Accessibility</h3>
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="High Contrast Mode"
            description="Increase contrast for better visibility"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
          />
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Keyboard Shortcuts</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Toggle sidebar</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl + B</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Search</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl + K</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">New card</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl + N</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Toggle theme</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Ctrl + Shift + T</kbd>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Live Preview</h3>
        <div className="bg-muted rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg border border-border p-4">
              <h4 className="font-medium text-foreground mb-2">Sample Card</h4>
              <p className="text-sm text-muted-foreground mb-3">
                This is how your cards will appear with the current settings.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="FileText" size={12} color="white" />
                </div>
                <span className="text-xs text-muted-foreground">Research Note</span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <h4 className="font-medium text-foreground mb-2">Another Card</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Cards adapt to your density and font size preferences.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Lightbulb" size={12} color="white" />
                </div>
                <span className="text-xs text-muted-foreground">Idea</span>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <h4 className="font-medium text-foreground mb-2">Third Card</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Preview how your workspace will look and feel.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                  <Icon name="Star" size={12} color="white" />
                </div>
                <span className="text-xs text-muted-foreground">Important</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={handleSaveSettings}
          iconName="Check"
          iconPosition="left"
          iconSize={16}
        >
          Save Display Settings
        </Button>
      </div>
    </div>
  );
};

export default DisplaySection;