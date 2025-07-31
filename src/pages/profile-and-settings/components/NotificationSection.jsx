import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const NotificationSection = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    projectUpdates: true,
    cardComments: true,
    whiteboardShares: false,
    weeklyDigest: true,
    systemUpdates: true,
    securityAlerts: true,
    collaborationInvites: true,
    deadlineReminders: false
  });

  const [pushNotifications, setPushNotifications] = useState({
    instantMessages: true,
    cardMentions: true,
    projectDeadlines: true,
    systemMaintenance: false,
    newFeatures: false
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    soundEnabled: true,
    desktopNotifications: true,
    badgeCount: true,
    autoMarkRead: false
  });

  const [digestFrequency, setDigestFrequency] = useState('weekly');
  const [quietHours, setQuietHours] = useState({
    enabled: true,
    startTime: '22:00',
    endTime: '08:00'
  });

  const digestOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'never', label: 'Never' }
  ];

  const handleEmailChange = (key, checked) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handlePushChange = (key, checked) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleInAppChange = (key, checked) => {
    setInAppNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleQuietHoursChange = (key, value) => {
    setQuietHours(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleTestNotification = () => {
    // Mock test notification
    alert('Test notification sent! Check your email and push notifications.');
  };

  const handleSaveSettings = () => {
    console.log('Notification settings saved:', {
      emailNotifications,
      pushNotifications,
      inAppNotifications,
      digestFrequency,
      quietHours
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Notification Preferences</h2>
          <p className="text-muted-foreground mt-1">
            Control how and when you receive notifications from VisualNotes
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleTestNotification}
          iconName="Bell"
          iconPosition="left"
          iconSize={16}
        >
          Test Notifications
        </Button>
      </div>

      {/* Email Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Mail" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Email Notifications</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Choose which email notifications you'd like to receive
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Project Updates"
            description="When projects you're involved in are updated"
            checked={emailNotifications.projectUpdates}
            onChange={(e) => handleEmailChange('projectUpdates', e.target.checked)}
          />
          <Checkbox
            label="Card Comments"
            description="When someone comments on your cards"
            checked={emailNotifications.cardComments}
            onChange={(e) => handleEmailChange('cardComments', e.target.checked)}
          />
          <Checkbox
            label="Whiteboard Shares"
            description="When whiteboards are shared with you"
            checked={emailNotifications.whiteboardShares}
            onChange={(e) => handleEmailChange('whiteboardShares', e.target.checked)}
          />
          <Checkbox
            label="Weekly Digest"
            description="Summary of your weekly activity"
            checked={emailNotifications.weeklyDigest}
            onChange={(e) => handleEmailChange('weeklyDigest', e.target.checked)}
          />
          <Checkbox
            label="System Updates"
            description="Important system announcements"
            checked={emailNotifications.systemUpdates}
            onChange={(e) => handleEmailChange('systemUpdates', e.target.checked)}
          />
          <Checkbox
            label="Security Alerts"
            description="Account security notifications"
            checked={emailNotifications.securityAlerts}
            onChange={(e) => handleEmailChange('securityAlerts', e.target.checked)}
          />
          <Checkbox
            label="Collaboration Invites"
            description="When you're invited to collaborate"
            checked={emailNotifications.collaborationInvites}
            onChange={(e) => handleEmailChange('collaborationInvites', e.target.checked)}
          />
          <Checkbox
            label="Deadline Reminders"
            description="Reminders for upcoming deadlines"
            checked={emailNotifications.deadlineReminders}
            onChange={(e) => handleEmailChange('deadlineReminders', e.target.checked)}
          />
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Select
            label="Digest Frequency"
            description="How often you'd like to receive activity summaries"
            options={digestOptions}
            value={digestFrequency}
            onChange={setDigestFrequency}
            className="max-w-xs"
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Smartphone" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Push Notifications</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Receive instant notifications on your devices
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Instant Messages"
            description="Real-time chat messages"
            checked={pushNotifications.instantMessages}
            onChange={(e) => handlePushChange('instantMessages', e.target.checked)}
          />
          <Checkbox
            label="Card Mentions"
            description="When you're mentioned in cards"
            checked={pushNotifications.cardMentions}
            onChange={(e) => handlePushChange('cardMentions', e.target.checked)}
          />
          <Checkbox
            label="Project Deadlines"
            description="Upcoming project deadlines"
            checked={pushNotifications.projectDeadlines}
            onChange={(e) => handlePushChange('projectDeadlines', e.target.checked)}
          />
          <Checkbox
            label="System Maintenance"
            description="Scheduled maintenance notifications"
            checked={pushNotifications.systemMaintenance}
            onChange={(e) => handlePushChange('systemMaintenance', e.target.checked)}
          />
          <Checkbox
            label="New Features"
            description="Announcements about new features"
            checked={pushNotifications.newFeatures}
            onChange={(e) => handlePushChange('newFeatures', e.target.checked)}
          />
        </div>
      </div>

      {/* In-App Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Monitor" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">In-App Notifications</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Control how notifications appear within the application
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Sound Notifications"
            description="Play sound for new notifications"
            checked={inAppNotifications.soundEnabled}
            onChange={(e) => handleInAppChange('soundEnabled', e.target.checked)}
          />
          <Checkbox
            label="Desktop Notifications"
            description="Show browser notifications"
            checked={inAppNotifications.desktopNotifications}
            onChange={(e) => handleInAppChange('desktopNotifications', e.target.checked)}
          />
          <Checkbox
            label="Badge Count"
            description="Show notification count in browser tab"
            checked={inAppNotifications.badgeCount}
            onChange={(e) => handleInAppChange('badgeCount', e.target.checked)}
          />
          <Checkbox
            label="Auto Mark as Read"
            description="Automatically mark notifications as read when viewed"
            checked={inAppNotifications.autoMarkRead}
            onChange={(e) => handleInAppChange('autoMarkRead', e.target.checked)}
          />
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Moon" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Quiet Hours</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Set times when you don't want to receive notifications
        </p>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Quiet Hours"
            description="Pause notifications during specified hours"
            checked={quietHours.enabled}
            onChange={(e) => handleQuietHoursChange('enabled', e.target.checked)}
          />
          
          {quietHours.enabled && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ml-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={quietHours.startTime}
                  onChange={(e) => handleQuietHoursChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={quietHours.endTime}
                  onChange={(e) => handleQuietHoursChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-muted/50 rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Notification Preview</h3>
        <div className="space-y-3">
          <div className="bg-card border border-border rounded-lg p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">New comment on "Research Methodology"</p>
              <p className="text-sm text-muted-foreground">Dr. Johnson added a comment to your card</p>
            </div>
            <span className="text-xs text-muted-foreground">2m ago</span>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
              <Icon name="CheckCircle" size={16} color="white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Project deadline reminder</p>
              <p className="text-sm text-muted-foreground">Literature Review due in 3 days</p>
            </div>
            <span className="text-xs text-muted-foreground">1h ago</span>
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
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};

export default NotificationSection;