import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileSection = () => {
  const [profileData, setProfileData] = useState({
    firstName: 'Dr. Sarah',
    lastName: 'Chen',
    email: 'sarah.chen@university.edu',
    bio: `Research scientist specializing in cognitive psychology and learning methodologies. Currently working on visual knowledge representation systems and their impact on complex topic comprehension.`,
    timezone: 'America/New_York',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);

  const timezoneOptions = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setShowCropModal(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    // Mock save success
    console.log('Profile saved:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data in real implementation
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Profile Information</h2>
          <p className="text-muted-foreground mt-1">
            Manage your personal information and public profile
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
            iconPosition="left"
            iconSize={16}
          >
            Edit Profile
          </Button>
        )}
      </div>

      {/* Avatar Section */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Profile Picture</h3>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
              <Image
                src={profileData.avatar}
                alt="Profile avatar"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <Button
                variant="default"
                size="icon"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                onClick={() => document.getElementById('avatar-upload').click()}
              >
                <Icon name="Camera" size={14} />
              </Button>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium mb-1">
              Profile Photo
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Upload a professional photo that represents you well. JPG, PNG or GIF. Max size 5MB.
            </p>
            {isEditing && (
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('avatar-upload').click()}
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={14}
                >
                  Upload New
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarUpload}
        />
      </div>

      {/* Personal Information */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-medium text-foreground mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="First Name"
            type="text"
            value={profileData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!isEditing}
            required
          />
          <Input
            label="Last Name"
            type="text"
            value={profileData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!isEditing}
            required
          />
          <div className="md:col-span-2">
            <Input
              label="Email Address"
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              description="This email will be used for account notifications and login"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              value={profileData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              disabled={!isEditing}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              placeholder="Tell us about yourself, your research interests, and expertise..."
            />
            <p className="text-sm text-muted-foreground mt-1">
              Brief description for your profile. Maximum 500 characters.
            </p>
          </div>
          <Select
            label="Timezone"
            options={timezoneOptions}
            value={profileData.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
            disabled={!isEditing}
            description="Used for scheduling and time-based features"
            searchable
          />
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="flex justify-end space-x-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Check"
            iconPosition="left"
            iconSize={16}
          >
            Save Changes
          </Button>
        </div>
      )}

      {/* Crop Modal */}
      {showCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Crop Profile Picture</h3>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
              <Icon name="Image" size={48} className="text-muted-foreground" />
            </div>
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCropModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={() => setShowCropModal(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;