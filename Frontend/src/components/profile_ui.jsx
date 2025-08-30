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
  <header className="bg-white/20 backdrop-blur-md border-white/30 border-b">
    <div className="flex justify-between items-center mx-auto px-4 py-4 max-w-4xl container">
      <div className="flex items-center space-x-3">
        <UserCircle className="w-8 h-8 text-black" />
        <h1 className="font-bold text-black text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Profile
        </h1>
      </div>
      
      {!isEditing && (
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 bg-white/30 hover:bg-white/40 focus:ring-opacity-50 backdrop-blur-md px-4 py-2 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          aria-label="Edit Profile"
        >
          <Edit3 className="w-4 h-4 text-black" />
          <span className="font-medium text-black">Edit Profile</span>
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
  <div className="bg-white/30 shadow-xl backdrop-blur-md p-8 border border-white/40 rounded-3xl">
    <div className="space-y-6 text-center">
      <Avatar 
        src={profileData.avatar_url} 
        alt={`${profileData.name}'s avatar`}
        preview={avatarPreview}
      />
      
      <div className="space-y-4">
        <h2 className="font-bold text-black text-3xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {profileData.name}
        </h2>
        
        {profileData.bio && (
          <div className="flex justify-center items-start space-x-3 mx-auto max-w-2xl">
            <Quote className="flex-shrink-0 mt-1 w-5 h-5 text-gray-700" />
            <p className="text-gray-700 text-center leading-relaxed">
              {profileData.bio}
            </p>
          </div>
        )}
        
        <div className="gap-4 grid md:grid-cols-2 mt-8">
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
  <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-sm p-4 rounded-xl">
    <Icon className="flex-shrink-0 w-5 h-5 text-black" />
    <div className="min-w-0">
      <p className="font-medium text-gray-600 text-sm">{label}</p>
      <p className="font-semibold text-black truncate">{value}</p>
    </div>
  </div>
);

// Address Card Component
export const AddressCard = ({ profileData }) => (
  <div className="bg-white/30 shadow-xl backdrop-blur-md p-8 border border-white/40 rounded-3xl">
    <h3 className="mb-6 font-bold text-black text-2xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      Address Information
    </h3>
    
    <div className="gap-4 grid md:grid-cols-2">
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
    <label className="block font-semibold text-black text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <Icon className="top-1/2 left-3 absolute w-5 h-5 text-gray-500 -translate-y-1/2 transform" />
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
  <div className="space-y-4 text-center">
    <Avatar 
      src={currentSrc}
      alt="Profile avatar"
      preview={preview}
    />
    
    <div className="space-y-2">
      <label className="block font-semibold text-black text-sm">
        Profile Photo
      </label>
      <div className="flex justify-center">
        <label className="flex items-center space-x-2 bg-white/30 hover:bg-white/40 focus-within:ring-opacity-50 backdrop-blur-md px-4 py-2 border border-white/40 rounded-xl focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200 cursor-pointer">
          <Upload className="w-4 h-4 text-black" />
          <span className="font-medium text-black">Upload Photo</span>
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
  <div className="flex justify-center space-x-4">
    <button
      onClick={onSave}
      className="flex items-center space-x-2 bg-green-500/30 hover:bg-green-500/40 focus:ring-opacity-50 backdrop-blur-md px-6 py-3 border border-green-400/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200"
      aria-label="Save changes"
    >
      <Save className="w-5 h-5 text-black" />
      <span className="font-semibold text-black">Save Changes</span>
    </button>
    
    <button
      onClick={onCancel}
      className="flex items-center space-x-2 bg-red-500/30 hover:bg-red-500/40 focus:ring-opacity-50 backdrop-blur-md px-6 py-3 border border-red-400/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200"
      aria-label="Cancel editing"
    >
      <X className="w-5 h-5 text-black" />
      <span className="font-semibold text-black">Cancel</span>
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
  <div className="space-y-8 bg-white/30 shadow-xl backdrop-blur-md p-8 border border-white/40 rounded-3xl">
    <div className="text-center">
      <h2 className="mb-2 font-bold text-black text-3xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Edit Profile
      </h2>
      <p className="text-gray-700">Update your profile information</p>
    </div>
    
    <AvatarUpload
      currentSrc={formData.avatar_url}
      preview={avatarPreview}
      onChange={onAvatarChange}
    />
    
    <div className="gap-6 grid md:grid-cols-2">
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
  <footer className="bg-white/20 backdrop-blur-md mt-16 py-6 border-white/30 border-t">
    <div className="mx-auto px-4 max-w-4xl text-center container">
      <p className="text-black/70 text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        © 2025 Modern Dashboard. Built with care for exceptional user experiences.
      </p>
    </div>
  </footer>
);