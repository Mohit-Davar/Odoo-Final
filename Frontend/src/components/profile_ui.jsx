import React from 'react';
import { 
  User, 
  Edit3, 
  Quote, 
  Calendar, 
  Phone, 
  MapPin, 
  Building, 
  Mail, 
  Globe,
  Save,
  X,
  Upload,
  UserCircle
} from 'lucide-react';

// Header Component
export const Header = ({ isEditing, onEdit }) => (
  <header className="bg-white/20 backdrop-blur-md border-b border-white/30">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-4xl">
      <div className="flex items-center space-x-3">
        <UserCircle className="w-8 h-8 text-black" />
        <h1 className="text-2xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Profile
        </h1>
      </div>
      
      {!isEditing && (
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 px-4 py-2 bg-white/30 hover:bg-white/40 backdrop-blur-md rounded-xl border border-white/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          aria-label="Edit Profile"
        >
          <Edit3 className="w-4 h-4 text-black" />
          <span className="text-black font-medium">Edit Profile</span>
        </button>
      )}
    </div>
  </header>
);

// Avatar Component
export const Avatar = ({ src, alt, size = 'large', preview = null }) => {
  const sizeClasses = {
    large: 'w-32 h-32',
    medium: 'w-24 h-24',
    small: 'w-16 h-16'
  };

  const displaySrc = preview || src;

  return (
    <div className={`${sizeClasses[size]} mx-auto rounded-full overflow-hidden bg-white/30 backdrop-blur-md border-4 border-white/50 shadow-lg flex items-center justify-center`}>
      {displaySrc ? (
        <img 
          src={displaySrc} 
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className="w-1/2 h-1/2 text-gray-400" />
      )}
    </div>
  );
};

// Profile Card Component
export const ProfileCard = ({ profileData, avatarPreview }) => (
  <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl">
    <div className="text-center space-y-6">
      <Avatar 
        src={profileData.avatar_url} 
        alt={`${profileData.name}'s avatar`}
        preview={avatarPreview}
      />
      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-black" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {profileData.name}
        </h2>
        
        {profileData.bio && (
          <div className="flex items-start justify-center space-x-3 max-w-2xl mx-auto">
            <Quote className="w-5 h-5 text-gray-700 mt-1 flex-shrink-0" />
            <p className="text-gray-700 text-center leading-relaxed">
              {profileData.bio}
            </p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <InfoItem 
            icon={Calendar}
            label="Date of Birth"
            value={new Date(profileData.date_of_birth).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          />
          
          <InfoItem 
            icon={Phone}
            label="Phone Number"
            value={profileData.phone_number}
          />
        </div>
      </div>
    </div>
  </div>
);

// Info Item Component
export const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-3 p-4 bg-white/20 rounded-xl backdrop-blur-sm">
    <Icon className="w-5 h-5 text-black flex-shrink-0" />
    <div className="min-w-0">
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <p className="text-black font-semibold truncate">{value}</p>
    </div>
  </div>
);

// Address Card Component
export const AddressCard = ({ profileData }) => (
  <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl">
    <h3 className="text-2xl font-bold text-black mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      Address Information
    </h3>
    
    <div className="grid md:grid-cols-2 gap-4">
      <InfoItem 
        icon={MapPin}
        label="Address"
        value={profileData.address}
      />
      
      <InfoItem 
        icon={Building}
        label="City"
        value={profileData.city}
      />
      
      <InfoItem 
        icon={Mail}
        label="Postal Code"
        value={profileData.postal_code}
      />
      
      <InfoItem 
        icon={Globe}
        label="Country"
        value={profileData.country}
      />
    </div>
  </div>
);

// Input Field Component
export const InputField = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  required = false,
  multiline = false,
  icon: Icon
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-black">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      )}
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-transparent text-black placeholder-gray-500 resize-none`}
          rows={3}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 focus:border-transparent text-black placeholder-gray-500`}
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        />
      )}
    </div>
  </div>
);

// Avatar Upload Component
export const AvatarUpload = ({ currentSrc, preview, onChange }) => (
  <div className="text-center space-y-4">
    <Avatar 
      src={currentSrc}
      alt="Profile avatar"
      preview={preview}
    />
    
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-black">
        Profile Photo
      </label>
      <div className="flex justify-center">
        <label className="flex items-center space-x-2 px-4 py-2 bg-white/30 hover:bg-white/40 backdrop-blur-md rounded-xl border border-white/40 cursor-pointer transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-opacity-50">
          <Upload className="w-4 h-4 text-black" />
          <span className="text-black font-medium">Upload Photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={onChange}
            className="hidden"
            aria-label="Upload profile photo"
          />
        </label>
      </div>
    </div>
  </div>
);

// Action Buttons Component
export const ActionButtons = ({ onSave, onCancel }) => (
  <div className="flex space-x-4 justify-center">
    <button
      onClick={onSave}
      className="flex items-center space-x-2 px-6 py-3 bg-green-500/30 hover:bg-green-500/40 backdrop-blur-md rounded-xl border border-green-400/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
      aria-label="Save changes"
    >
      <Save className="w-5 h-5 text-black" />
      <span className="text-black font-semibold">Save Changes</span>
    </button>
    
    <button
      onClick={onCancel}
      className="flex items-center space-x-2 px-6 py-3 bg-red-500/30 hover:bg-red-500/40 backdrop-blur-md rounded-xl border border-red-400/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
      aria-label="Cancel editing"
    >
      <X className="w-5 h-5 text-black" />
      <span className="text-black font-semibold">Cancel</span>
    </button>
  </div>
);

// Edit Form Component
export const EditForm = ({ 
  formData, 
  avatarPreview, 
  onInputChange, 
  onAvatarChange, 
  onSave, 
  onCancel 
}) => (
  <div className="bg-white/30 backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-xl space-y-8">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Edit Profile
      </h2>
      <p className="text-gray-700">Update your profile information</p>
    </div>
    
    <AvatarUpload
      currentSrc={formData.avatar_url}
      preview={avatarPreview}
      onChange={onAvatarChange}
    />
    
    <div className="grid md:grid-cols-2 gap-6">
      <InputField
        label="Full Name"
        value={formData.name}
        onChange={(value) => onInputChange('name', value)}
        required
        icon={User}
      />
      
      <InputField
        label="Phone Number"
        value={formData.phone_number}
        onChange={(value) => onInputChange('phone_number', value)}
        type="tel"
        icon={Phone}
      />
      
      <InputField
        label="Date of Birth"
        value={formData.date_of_birth}
        onChange={(value) => onInputChange('date_of_birth', value)}
        type="date"
        icon={Calendar}
      />
      
      <InputField
        label="Country"
        value={formData.country}
        onChange={(value) => onInputChange('country', value)}
        icon={Globe}
      />
      
      <InputField
        label="Address"
        value={formData.address}
        onChange={(value) => onInputChange('address', value)}
        icon={MapPin}
      />
      
      <InputField
        label="City"
        value={formData.city}
        onChange={(value) => onInputChange('city', value)}
        icon={Building}
      />
      
      <InputField
        label="Postal Code"
        value={formData.postal_code}
        onChange={(value) => onInputChange('postal_code', value)}
        icon={Mail}
      />
    </div>
    
    <div className="md:col-span-2">
      <InputField
        label="Bio"
        value={formData.bio}
        onChange={(value) => onInputChange('bio', value)}
        multiline
        icon={Quote}
      />
    </div>
    
    <ActionButtons onSave={onSave} onCancel={onCancel} />
  </div>
);

// Footer Component
export const Footer = () => (
  <footer className="bg-white/20 backdrop-blur-md border-t border-white/30 py-6 mt-16">
    <div className="container mx-auto px-4 text-center max-w-4xl">
      <p className="text-black/70 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        © 2025 Modern Dashboard. Built with care for exceptional user experiences.
      </p>
    </div>
  </footer>
);