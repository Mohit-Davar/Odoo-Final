import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
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
import { getUserProfile, updateUserProfile } from '@/api/users.js';
import { User, Phone, Upload } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);

  // Fetch profile
  const { data: profileData, isLoading, isError, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  const { control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: profileData || {},
  });

  const watchedAvatar = watch('avatar_url');

  // Reset form when profileData changes
  useEffect(() => {
    if (profileData) {
      reset(profileData);
      setAvatarPreview(null);
    }
  }, [profileData, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data);
      setIsEditing(false);
      setAvatarPreview(null);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) return; // 5MB max

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      setAvatarPreview(result);
      setValue('avatar_url', result);
    };
    reader.readAsDataURL(file);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center gap-2 bg-black min-h-screen">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-white">Loading profile...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center bg-black min-h-screen">
        <Card className="bg-zinc-900 border border-zinc-800 max-w-md">
          <CardBody className="p-8 text-center">
            <p className="mb-4 text-red-400">Error loading profile</p>
            <p className="text-zinc-400 text-sm">{error?.message}</p>
            <Button color="primary" className="bg-red-600 hover:bg-red-700 mt-4" onPress={() => window.location.reload()}>
              Retry
            </Button>
          </CardBody>
        </Card>
      </div>
    );

  if (!profileData) return null;

  return (
    <div className="min-h-screen">
      <main className="mx-auto px-6 py-8 max-w-4xl">
        {!isEditing ? (
          <Card className="bg-zinc-900 px-10 py-6 border border-zinc-800">
            <CardHeader className="flex justify-between items-start pb-0">
              <div className="flex items-center gap-4">
                <Avatar src={profileData.avatar_url} name={profileData.name} size="lg" className="w-16 h-16" />
                <div>
                  <h1 className="font-bold text-white text-2xl">{profileData.name}</h1>
                  <p className="text-zinc-400">{profileData.email}</p>
                </div>
              </div>
              <Button
                color="primary"
                variant="flat"
                size="sm"
                onPress={() => setIsEditing(true)}
                className="bg-red-600 text-white"
              >
                Edit
              </Button>
            </CardHeader>
            <CardBody className="space-y-4 pt-6">
              <div>
                <h3 className="flex items-center gap-2 mb-2 font-semibold text-white">
                  <User size={16} /> About
                </h3>
                <p className="text-zinc-300 leading-relaxed">{profileData.bio}</p>
              </div>
              <Divider className="bg-zinc-800" />
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-zinc-500" />
                <span className="text-zinc-300">{profileData.phone}</span>
              </div>
            </CardBody>
          </Card>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
              <Card className="bg-zinc-900 px-10 py-6 border border-zinc-800">
              <CardHeader className="flex justify-between items-center">
                <h2 className="font-bold text-white text-xl">Edit Profile</h2>
                <div className="flex gap-2">
                  <Button variant="flat" size="sm" onPress={() => { setIsEditing(false); reset(profileData); }} className="bg-zinc-800 text-zinc-300">
                    Cancel
                  </Button>
                  <Button color="primary" size="sm" type="submit" className="bg-red-600 text-white">
                    Save
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar src={avatarPreview || watchedAvatar} name={profileData.name} size="lg" className="w-20 h-20" />
                  <input type="file" accept="image/*" id="avatar-upload" className="hidden" onChange={handleAvatarChange} />
                  <label htmlFor="avatar-upload" className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-white cursor-pointer">
                    <Upload size={16} />
                    Change Avatar
                  </label>
                  <p className="mt-1 text-zinc-500 text-xs">Max 5MB, JPG/PNG only</p>
                </div>
                <Divider className="bg-zinc-800" />
                <div className="space-y-4">
                  <Controller name="name" control={control} render={({ field }) => <Input label="Full Name" {...field} />} />
                  <Controller name="email" control={control} render={({ field }) => <Input label="Email" type="email" {...field} />} />
                  <Controller name="bio" control={control} render={({ field }) => <Textarea label="Bio" {...field} minRows={3} />} />
                  <Controller name="phone" control={control} render={({ field }) => <Input label="Phone Number" {...field} />} />
                </div>
              </CardBody>
            </Card>
          </form>
        )}
      </main>
    </div>
  );
};

export default Profile;