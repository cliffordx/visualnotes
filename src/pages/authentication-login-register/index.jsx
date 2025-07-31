import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialAuth from './components/SocialAuth';
import AuthFooter from './components/AuthFooter';

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard-main-workspace');
    }
  }, [navigate]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Main Content */}
      <div className="relative w-full max-w-md">
        {/* Authentication Card */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-8">
          {/* Header */}
          <AuthHeader activeTab={activeTab} />
          
          {/* Tab Navigation */}
          <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          {/* Form Content */}
          <div className="space-y-6">
            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
            
            {/* Social Authentication */}
            <SocialAuth />
          </div>
          
          {/* Footer */}
          <AuthFooter />
        </div>
        
        {/* Trust Signals */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>Privacy Protected</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span>GDPR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;