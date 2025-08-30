import { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '@/api/users.js';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Avatar,
  Divider,
  Spinner,
} from '@heroui/react';
import {
  Edit3,
  User,
  Phone,
  Upload,
} from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  const [formData, setFormData] = useState(profileData);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Update profile data when API data is loaded
  useEffect(() => {
    if (data) {
      setProfileData(data);
      setFormData(data);
    }
  }, [data]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(profileData);
    setAvatarPreview(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profileData);
    setAvatarPreview(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile(formData);
      setProfileData(formData);
      setIsEditing(false);
      setAvatarPreview(null);
    } catch (error) {
      console.error('Error saving profile:', error);
      // Add toast notification here
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        console.error('File size too large');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData((prev) => ({
          ...prev,
          avatar_url: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center bg-black min-h-screen">
        <div className="text-center">
          <Spinner size="lg" color="primary" />
          <p className="mt-4 text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center bg-black min-h-screen">
        <Card className="bg-zinc-900 border border-zinc-800 max-w-md">
          <CardBody className="p-8 text-center">
            <p className="mb-4 text-red-400">Error loading profile</p>
            <p className="text-zinc-400 text-sm">{error?.message}</p>
            <Button
              color="primary"
              className="bg-red-600 hover:bg-red-700 mt-4"
              onPress={() => window.location.reload()}
            >
              Retry
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!profileData) {
    return null;
  }


  const ProfileViewCard = () => (
    <Card className="bg-zinc-900 border border-zinc-800">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start w-full">
          <div className="flex items-center gap-4">
            <Avatar
              src={profileData?.avatar_url}
              name={profileData?.name}
              size="lg"
              className="w-16 h-16"
            />
            <div>
              <h1 className="font-bold text-white text-2xl">{profileData?.name}</h1>
              <p className="text-zinc-400">{profileData?.email}</p>
            </div>
          </div>
          <Button
            color="primary"
            variant="flat"
            size="sm"
            startContent={<Edit3 size={16} />}
            onPress={handleEdit}
            className="bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 text-red-400"
          >
            Edit Profile
          </Button>
        </div>
      </CardHeader>

      <CardBody className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="flex items-center gap-2 mb-2 font-semibold text-white">
              <User size={16} /> About
            </h3>
            <p className="text-zinc-300 leading-relaxed">{profileData.bio}</p>
          </div>

          <Divider className="bg-zinc-800" />

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-zinc-500" />
              <span className="text-zinc-300">{profileData.phone_number}</span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );

  const ProfileEditForm = () => (
    <Card className="bg-zinc-900 border border-zinc-800">
      <CardHeader>
        <div className="flex justify-between items-center w-full">
          <h2 className="font-bold text-white text-xl">Edit</h2>
          <div className="flex gap-2">
            <Button
              color="default"
              variant="flat"
              size="sm"
              onPress={handleCancel}
              className="bg-zinc-800 text-zinc-300"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              size="sm"
              onPress={handleSave}
              isLoading={isSaving}
              className="bg-red-600 text-white"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="space-y-6">
        {/* Avatar Upload Section */}
        <div className="flex flex-col items-center gap-4">
          <Avatar
            src={avatarPreview || formData.avatar_url}
            name={formData.name}
            size="lg"
            className="w-20 h-20"
          />
          <div className="text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-white transition-colors cursor-pointer"
            >
              <Upload size={16} />
              Change Avatar
            </label>
            <p className="mt-1 text-zinc-500 text-xs">Max 5MB, JPG/PNG only</p>
          </div>
        </div>

        <Divider className="bg-zinc-800" />

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Personal Information</h3>

          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <Textarea
            label="Bio"
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            minRows={3}
          />

          <div className="gap-4 grid grid-cols-1">
            <Input
              label="Phone Number"
              value={formData.phone_number}
              onChange={(e) => handleInputChange('phone_number', e.target.value)}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <main className="mx-auto px-6 py-8 max-w-4xl">
        <div className="space-y-6">
          {isEditing ? <ProfileEditForm /> : <ProfileViewCard />}
        </div>
      </main>
    </div>
  );
};

export default Profile;