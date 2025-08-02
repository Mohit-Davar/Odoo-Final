import React, { useState } from 'react';
import { 
  Header, 
  ProfileCard, 
  AddressCard, 
  EditForm, 
  Footer 
} from '@/components/profile_ui';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    avatar_url: '',
    name: 'Sarah Johnson',
    bio: 'Creative designer passionate about creating beautiful, user-centered experiences. Always learning and growing.',
    date_of_birth: '1992-06-15',
    phone_number: '+1 (555) 123-4567',
    address: '123 Creative Street, Suite 456',
    city: 'San Francisco',
    postal_code: '94102',
    country: 'United States'
  });

  const [formData, setFormData] = useState(profileData);
  const [avatarPreview, setAvatarPreview] = useState(null);

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

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
    setAvatarPreview(null);
    // Here you would typically save to backend
    console.log('Profile saved:', formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setFormData(prev => ({
          ...prev,
          avatar_url: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50" 
         style={{ 
           background: 'linear-gradient(135deg, #CAF0F8 0%, #A2D2FF 50%, #BDE0FF 100%)',
           fontFamily: 'Montserrat, sans-serif'
         }}>
      
      <Header isEditing={isEditing} onEdit={handleEdit} />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          
          {!isEditing ? (
            <>
              <ProfileCard 
                profileData={profileData}
                avatarPreview={avatarPreview}
              />
              
              <AddressCard 
                profileData={profileData}
              />
            </>
          ) : (
            <EditForm
              formData={formData}
              avatarPreview={avatarPreview}
              onInputChange={handleInputChange}
              onAvatarChange={handleAvatarChange}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
          
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;