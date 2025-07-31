import React from 'react';
import Button from '../../../components/ui/Button';

const AuthFooter = () => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (type) => {
    if (type === 'privacy') {
      alert('Privacy Policy would open in a new window.');
    } else if (type === 'terms') {
      alert('Terms of Service would open in a new window.');
    } else if (type === 'help') {
      alert('Help Center would open with support resources.');
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <Button
          variant="link"
          size="sm"
          onClick={() => handleLinkClick('privacy')}
          className="text-muted-foreground hover:text-foreground p-0 h-auto"
        >
          Privacy Policy
        </Button>
        
        <span className="text-border">•</span>
        
        <Button
          variant="link"
          size="sm"
          onClick={() => handleLinkClick('terms')}
          className="text-muted-foreground hover:text-foreground p-0 h-auto"
        >
          Terms of Service
        </Button>
        
        <span className="text-border">•</span>
        
        <Button
          variant="link"
          size="sm"
          onClick={() => handleLinkClick('help')}
          className="text-muted-foreground hover:text-foreground p-0 h-auto"
        >
          Help Center
        </Button>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {currentYear} VisualNotes. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthFooter;