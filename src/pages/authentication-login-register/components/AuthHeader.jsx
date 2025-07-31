import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  const getTitle = () => {
    return activeTab === 'login' ? 'Welcome back' : 'Create your account';
  };

  const getSubtitle = () => {
    return activeTab === 'login' ?'Sign in to your VisualNotes workspace' :'Start organizing your knowledge today';
  };

  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
            <Icon name="BookOpen" size={24} color="white" />
          </div>
          <span className="font-heading font-bold text-2xl text-foreground">
            VisualNotes
          </span>
        </div>
      </div>
      
      {/* Title and Subtitle */}
      <div className="space-y-2">
        <h1 className="font-heading font-semibold text-2xl text-foreground">
          {getTitle()}
        </h1>
        <p className="text-muted-foreground">
          {getSubtitle()}
        </p>
      </div>
    </div>
  );
};

export default AuthHeader;