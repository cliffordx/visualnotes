import React from 'react';
import Button from '../../../components/ui/Button';

const AuthTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      <Button
        variant={activeTab === 'login' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onTabChange('login')}
        fullWidth
        className="rounded-md"
      >
        Sign In
      </Button>
      <Button
        variant={activeTab === 'register' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onTabChange('register')}
        fullWidth
        className="rounded-md"
      >
        Create Account
      </Button>
    </div>
  );
};

export default AuthTabs;