import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SecuritySection = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);

  const activeSessions = [
    {
      id: 1,
      device: 'MacBook Pro',
      browser: 'Chrome 119.0',
      location: 'New York, NY',
      ipAddress: '192.168.1.100',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'iPhone 15 Pro',
      browser: 'Safari Mobile',
      location: 'New York, NY',
      ipAddress: '192.168.1.101',
      lastActive: '1 hour ago',
      current: false
    },
    {
      id: 3,
      device: 'iPad Air',
      browser: 'Safari',
      location: 'Boston, MA',
      ipAddress: '10.0.0.45',
      lastActive: '3 days ago',
      current: false
    }
  ];

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // Mock password change
    console.log('Password changed successfully');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true);
    setShowQRCode(true);
    // Generate mock backup codes
    setBackupCodes([
      'A1B2-C3D4-E5F6',
      'G7H8-I9J0-K1L2',
      'M3N4-O5P6-Q7R8',
      'S9T0-U1V2-W3X4',
      'Y5Z6-A7B8-C9D0'
    ]);
  };

  const handleDisable2FA = () => {
    setTwoFactorEnabled(false);
    setShowQRCode(false);
    setBackupCodes([]);
  };

  const handleTerminateSession = (sessionId) => {
    console.log('Terminating session:', sessionId);
  };

  const getDeviceIcon = (device) => {
    if (device.includes('iPhone') || device.includes('Android')) return 'Smartphone';
    if (device.includes('iPad') || device.includes('Tablet')) return 'Tablet';
    return 'Monitor';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Account Security</h2>
        <p className="text-muted-foreground mt-1">
          Manage your password, two-factor authentication, and active sessions
        </p>
      </div>

      {/* Password Change */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
            description="Must be at least 8 characters with uppercase, lowercase, and numbers"
            required
          />
          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
            required
          />
          <Button
            variant="default"
            onClick={handlePasswordSubmit}
            iconName="Lock"
            iconPosition="left"
            iconSize={16}
            disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
          >
            Update Password
          </Button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium text-foreground">Two-Factor Authentication</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Add an extra layer of security to your account
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-success' : 'text-muted-foreground'}`}>
              {twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
            <div className={`w-3 h-3 rounded-full ${twoFactorEnabled ? 'bg-success' : 'bg-muted-foreground'}`} />
          </div>
        </div>

        {!twoFactorEnabled ? (
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone in addition to your password.
            </p>
            <Button
              variant="default"
              onClick={handleEnable2FA}
              iconName="Shield"
              iconPosition="left"
              iconSize={16}
            >
              Enable Two-Factor Authentication
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {showQRCode && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Setup Instructions</h4>
                <ol className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>1. Install an authenticator app (Google Authenticator, Authy, etc.)</li>
                  <li>2. Scan the QR code below with your authenticator app</li>
                  <li>3. Enter the 6-digit code from your app to verify</li>
                </ol>
                <div className="bg-white rounded-lg p-4 w-48 h-48 flex items-center justify-center mx-auto mb-4">
                  <Icon name="QrCode" size={120} className="text-foreground" />
                </div>
                <Input
                  label="Verification Code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  className="max-w-xs mx-auto"
                />
              </div>
            )}

            {backupCodes.length > 0 && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2 flex items-center">
                  <Icon name="AlertTriangle" size={16} className="mr-2 text-warning" />
                  Backup Codes
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Save these backup codes in a safe place. You can use them to access your account if you lose your phone.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="bg-muted px-3 py-2 rounded border">
                      {code}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowQRCode(!showQRCode)}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
              >
                Regenerate Codes
              </Button>
              <Button
                variant="destructive"
                onClick={handleDisable2FA}
                iconName="ShieldOff"
                iconPosition="left"
                iconSize={16}
              >
                Disable 2FA
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Active Sessions</h3>
        <p className="text-sm text-muted-foreground mb-6">
          These are the devices that are currently signed in to your account. Remove any sessions that you do not recognize.
        </p>
        
        <div className="space-y-4">
          {activeSessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Icon name={getDeviceIcon(session.device)} size={20} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{session.device}</h4>
                    {session.current && (
                      <span className="bg-success text-success-foreground text-xs px-2 py-1 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{session.browser}</p>
                  <p className="text-sm text-muted-foreground">
                    {session.location} • {session.ipAddress} • {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTerminateSession(session.id)}
                  className="text-destructive hover:text-destructive"
                >
                  Terminate
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="destructive"
            iconName="LogOut"
            iconPosition="left"
            iconSize={16}
          >
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;