import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DataSection = () => {
  const [storageUsage] = useState({
    used: 2.4,
    total: 10,
    breakdown: {
      cards: 1.2,
      whiteboards: 0.8,
      attachments: 0.3,
      other: 0.1
    }
  });

  const [exportFormat, setExportFormat] = useState('json');
  const [exportOptions, setExportOptions] = useState({
    includeCards: true,
    includeWhiteboards: true,
    includeComments: false,
    includeAttachments: true,
    includeMetadata: true
  });

  const [autoBackup, setAutoBackup] = useState({
    enabled: true,
    frequency: 'weekly',
    retentionDays: 30
  });

  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const exportFormatOptions = [
    { value: 'json', label: 'JSON', description: 'Machine-readable format for developers' },
    { value: 'csv', label: 'CSV', description: 'Spreadsheet-compatible format' },
    { value: 'pdf', label: 'PDF', description: 'Human-readable document format' },
    { value: 'markdown', label: 'Markdown', description: 'Text format with formatting' }
  ];

  const backupFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  const retentionOptions = [
    { value: 7, label: '7 days' },
    { value: 30, label: '30 days' },
    { value: 90, label: '90 days' },
    { value: 365, label: '1 year' }
  ];

  const handleExportOptionChange = (key, checked) => {
    setExportOptions(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  const handleExportData = () => {
    console.log('Exporting data with options:', { exportFormat, exportOptions });
    // Mock export process
    alert(`Export started! Your data will be downloaded as ${exportFormat.toUpperCase()} format.`);
  };

  const handleBackupSettingChange = (key, value) => {
    setAutoBackup(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== 'DELETE MY ACCOUNT') {
      alert('Please type "DELETE MY ACCOUNT" to confirm');
      return;
    }
    
    console.log('Account deletion requested');
    setShowDeleteModal(false);
    alert('Account deletion request submitted. You will receive a confirmation email.');
  };

  const getStoragePercentage = () => {
    return (storageUsage.used / storageUsage.total) * 100;
  };

  const getStorageColor = () => {
    const percentage = getStoragePercentage();
    if (percentage > 90) return 'bg-destructive';
    if (percentage > 75) return 'bg-warning';
    return 'bg-primary';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Data Management</h2>
        <p className="text-muted-foreground mt-1">
          Manage your data, exports, backups, and account deletion
        </p>
      </div>

      {/* Storage Usage */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="HardDrive" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Storage Usage</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                {storageUsage.used} GB of {storageUsage.total} GB used
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(getStoragePercentage())}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getStorageColor()}`}
                style={{ width: `${getStoragePercentage()}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="FileText" size={16} color="white" />
              </div>
              <p className="text-sm font-medium text-foreground">{storageUsage.breakdown.cards} GB</p>
              <p className="text-xs text-muted-foreground">Cards</p>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="PenTool" size={16} color="white" />
              </div>
              <p className="text-sm font-medium text-foreground">{storageUsage.breakdown.whiteboards} GB</p>
              <p className="text-xs text-muted-foreground">Whiteboards</p>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="Paperclip" size={16} color="white" />
              </div>
              <p className="text-sm font-medium text-foreground">{storageUsage.breakdown.attachments} GB</p>
              <p className="text-xs text-muted-foreground">Attachments</p>
            </div>
            
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name="MoreHorizontal" size={16} color="white" />
              </div>
              <p className="text-sm font-medium text-foreground">{storageUsage.breakdown.other} GB</p>
              <p className="text-xs text-muted-foreground">Other</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Download" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Export Data</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Download a copy of your data in various formats
        </p>
        
        <div className="space-y-6">
          <Select
            label="Export Format"
            description="Choose the format for your exported data"
            options={exportFormatOptions}
            value={exportFormat}
            onChange={setExportFormat}
            className="max-w-xs"
          />
          
          <div>
            <h4 className="font-medium text-foreground mb-3">What to include</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Checkbox
                label="Cards"
                description="All your note cards and content"
                checked={exportOptions.includeCards}
                onChange={(e) => handleExportOptionChange('includeCards', e.target.checked)}
              />
              <Checkbox
                label="Whiteboards"
                description="Whiteboard layouts and content"
                checked={exportOptions.includeWhiteboards}
                onChange={(e) => handleExportOptionChange('includeWhiteboards', e.target.checked)}
              />
              <Checkbox
                label="Comments"
                description="Comments and collaboration data"
                checked={exportOptions.includeComments}
                onChange={(e) => handleExportOptionChange('includeComments', e.target.checked)}
              />
              <Checkbox
                label="Attachments"
                description="Files and images attached to cards"
                checked={exportOptions.includeAttachments}
                onChange={(e) => handleExportOptionChange('includeAttachments', e.target.checked)}
              />
              <Checkbox
                label="Metadata"
                description="Creation dates, tags, and other metadata"
                checked={exportOptions.includeMetadata}
                onChange={(e) => handleExportOptionChange('includeMetadata', e.target.checked)}
              />
            </div>
          </div>
          
          <Button
            variant="default"
            onClick={handleExportData}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export My Data
          </Button>
        </div>
      </div>

      {/* Auto Backup */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="Shield" size={20} className="text-primary" />
          <h3 className="text-lg font-medium text-foreground">Automatic Backups</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Automatically backup your data to prevent loss
        </p>
        
        <div className="space-y-4">
          <Checkbox
            label="Enable Automatic Backups"
            description="Regularly backup your data to secure storage"
            checked={autoBackup.enabled}
            onChange={(e) => handleBackupSettingChange('enabled', e.target.checked)}
          />
          
          {autoBackup.enabled && (
            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Backup Frequency"
                options={backupFrequencyOptions}
                value={autoBackup.frequency}
                onChange={(value) => handleBackupSettingChange('frequency', value)}
              />
              
              <Select
                label="Retention Period"
                description="How long to keep backup copies"
                options={retentionOptions}
                value={autoBackup.retentionDays}
                onChange={(value) => handleBackupSettingChange('retentionDays', value)}
              />
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium text-foreground mb-2">Recent Backups</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Last backup</span>
              <span className="text-foreground">January 20, 2025 at 3:00 AM</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Backup size</span>
              <span className="text-foreground">2.4 GB</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="text-success flex items-center">
                <Icon name="CheckCircle" size={14} className="mr-1" />
                Successful
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="AlertTriangle" size={20} className="text-destructive" />
          <h3 className="text-lg font-medium text-foreground">Delete Account</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        
        <div className="space-y-4">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">What will be deleted:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• All your cards and whiteboards</li>
              <li>• Project data and collaborations</li>
              <li>• Account settings and preferences</li>
              <li>• Backup copies and exports</li>
              <li>• All associated metadata</li>
            </ul>
          </div>
          
          <Button
            variant="destructive"
            onClick={() => setShowDeleteModal(true)}
            iconName="Trash2"
            iconPosition="left"
            iconSize={16}
          >
            Delete My Account
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <Icon name="AlertTriangle" size={24} className="text-destructive" />
              <h3 className="text-lg font-medium text-foreground">Confirm Account Deletion</h3>
            </div>
            
            <p className="text-sm text-muted-foreground mb-4">
              This action is permanent and cannot be undone. All your data will be permanently deleted.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Type "DELETE MY ACCOUNT" to confirm:
              </label>
              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                placeholder="DELETE MY ACCOUNT"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmation('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== 'DELETE MY ACCOUNT'}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSection;