import { 
  ArrowLeft, 
  AlertCircle, 
  Edit3, 
  MapPin, 
  AlignLeft, 
  User, 
  EyeOff, 
  Image, 
  Upload, 
  Trash2, 
  Send, 
  Check, 
  X,
  Tag,
  Construction,
  Lightbulb,
  Droplets,
  Shield,
  AlertTriangle
} from 'lucide-react';

// Header Component
export const Header = () => (
  <header className="top-0 z-50 sticky bg-white/10 backdrop-blur-md border-white/20 border-b">
    <div className="flex justify-between items-center mx-auto px-4 py-4 container">
      <div className="flex items-center gap-3">
        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
          <AlertCircle className="w-6 h-6 text-black" />
        </div>
        <h1 className="font-bold text-black text-2xl">CivicTrack</h1>
      </div>
      <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full text-black transition-all duration-200">
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </button>
    </div>
  </header>
);

// Form Card Container
export const FormCard = ({ children }) => (
  <div className="bg-white/20 shadow-2xl backdrop-blur-lg p-8 md:p-12 border border-white/30 rounded-3xl">
    {children}
  </div>
);

// Status Badge
export const StatusBadge = () => (
  <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 border border-green-500/30 rounded-full">
    <div className="bg-green-500 rounded-full w-2 h-2 animate-pulse"></div>
    <span className="font-semibold text-black">Status: Reported</span>
    <span className="text-black/60 text-sm">• Just now</span>
  </div>
);

// Icon Component with Dynamic Icons
const DynamicIcon = ({ name, className }) => {
  const icons = {
    Edit3, MapPin, AlignLeft, User, EyeOff, Image, Upload, Trash2, Tag,
    Construction, Lightbulb, Droplets, Shield, AlertTriangle
  };
  
  const IconComponent = icons[name] || Tag;
  return <IconComponent className={className} />;
};

// Input Field Component
export const InputField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required, 
  maxLength,
  icon = "Edit3" 
}) => (
  <div className="space-y-2">
    <label className="block font-semibold text-black text-lg">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="top-1/2 left-4 absolute -translate-y-1/2 transform">
        <DynamicIcon name={icon} className="w-5 h-5 text-black/60" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full pl-12 pr-4 py-4 bg-white/30 backdrop-blur-sm rounded-2xl border ${
          error ? 'border-red-500/50' : 'border-white/30'
        } text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 font-medium`}
      />
      {maxLength && (
        <div className="top-1/2 right-4 absolute text-black/50 text-sm -translate-y-1/2 transform">
          {value.length}/{maxLength}
        </div>
      )}
    </div>
    {error && <p className="font-medium text-red-500 text-sm">{error}</p>}
  </div>
);

export const DropdownField = ({
  label,
  value,
  options,
  onChange,
  error,
  required,
  loading = false
}) => (
  <div className="space-y-2">
    <label className="block font-semibold text-black text-lg">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="top-1/2 left-4 absolute -translate-y-1/2 transform">
        <Tag className="w-5 h-5 text-black/60" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={loading || !options || options.length === 0}
        className={`w-full pl-12 pr-4 py-4 bg-white/30 backdrop-blur-sm rounded-2xl border ${error ? 'border-red-500/50' : 'border-white/30'
          } text-black focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 font-medium appearance-none cursor-pointer`}
      >
        {loading ? (
          <option value="">Loading categories...</option>
        ) : options && options.length > 0 ? (
          [<option value="" key="">Select a category</option>,
          ...options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))]
        ) : (
          <option value="">No categories available</option>
        )}
      </select>
      <div className="top-1/2 right-4 absolute -translate-y-1/2 pointer-events-none transform">
        <svg className="w-5 h-5 text-black/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && <p className="font-medium text-red-500 text-sm">{error}</p>}
  </div>
);


// TextArea Field Component
export const TextAreaField = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required, 
  maxLength = 500 
}) => (
  <div className="space-y-2">
    <label className="block font-semibold text-black text-lg">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <div className="top-4 left-4 absolute">
        <AlignLeft className="w-5 h-5 text-black/60" />
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={4}
        className={`w-full pl-12 pr-4 py-4 bg-white/30 backdrop-blur-sm rounded-2xl border ${
          error ? 'border-red-500/50' : 'border-white/30'
        } text-black placeholder-black/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200 font-medium resize-none`}
      />
      <div className="right-4 bottom-4 absolute text-black/50 text-sm">
        {value.length}/{maxLength}
      </div>
    </div>
    {error && <p className="font-medium text-red-500 text-sm">{error}</p>}
  </div>
);

// Toggle Field Component
export const ToggleField = ({ 
  label, 
  value, 
  onChange, 
  description 
}) => (
  <div className="space-y-2">
    <label className="block font-semibold text-black text-lg">{label}</label>
    <div className="flex items-center gap-4 bg-white/30 backdrop-blur-sm p-4 border border-white/30 rounded-2xl">
      <div className="flex items-center gap-3">
        {value ? (
          <User className="w-6 h-6 text-black" />
        ) : (
          <EyeOff className="w-6 h-6 text-black" />
        )}
        <span className="font-medium text-black">
          {value ? 'Verified Report' : 'Anonymous Report'}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
          value ? 'bg-blue-500' : 'bg-black/20'
        }`}
      >
        <span
          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
            value ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
    {description && <p className="text-black/70 text-sm">{description}</p>}
  </div>
);

// Image Upload Section
export const ImageUploadSection = ({ 
  images, 
  onUpload, 
  onRemove, 
  fileInputRef 
}) => (
  <div className="space-y-4">
    <label className="block font-semibold text-black text-lg">
      Attach Images <span className="font-normal text-black/60">(Optional, up to 5)</span>
    </label>
    
    {/* Upload Area */}
    <div 
      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-8 border-2 border-white/40 border-dashed rounded-2xl text-center transition-all duration-200 cursor-pointer"
      onClick={() => fileInputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        onUpload(files);
      }}
    >
      <div className="space-y-4">
        <div className="inline-flex bg-white/20 p-4 rounded-full">
          <Upload className="w-8 h-8 text-black" />
        </div>
        <div>
          <p className="font-semibold text-black text-lg">Click to upload or drag and drop</p>
          <p className="text-black/60">PNG, JPG up to 5MB each</p>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/jpg"
        onChange={(e) => onUpload(e.target.files)}
        className="hidden"
      />
    </div>

    {/* Image Previews */}
    {images.length > 0 && (
      <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {images.map((image) => (
          <div key={image.id} className="group relative">
            <div className="bg-white/20 backdrop-blur-sm p-2 border border-white/30 rounded-2xl">
              <img
                src={image.preview}
                alt={image.name}
                className="rounded-xl w-full h-24 object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(image.id)}
                className="-top-2 -right-2 absolute bg-red-500 hover:bg-red-600 opacity-0 group-hover:opacity-100 p-1.5 rounded-full text-white transition-opacity duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Submit Button Component
export const SubmitButton = ({ 
  isSubmitting, 
  isValid, 
  text,
  onClick 
}) => (
  <div className="pt-6">
    <button
      type="submit"
      onClick={onClick}
      disabled={!isValid || isSubmitting}
      className={`w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-200 flex items-center justify-center gap-3 ${
        isValid && !isSubmitting
          ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
          : 'bg-black/20 text-black/50 cursor-not-allowed'
      }`}
    >
      {isSubmitting ? (
        <>
          <div className="border-2 border-white/30 border-t-white rounded-full w-6 h-6 animate-spin"></div>
          Submitting...
        </>
      ) : (
        <>
          <Send className="w-6 h-6" />
          {text}
        </>
      )}
    </button>
  </div>
);

// Toast Component
export const Toast = ({ message, type, onClose }) => (
  <div className="right-6 bottom-6 z-50 fixed animate-fade-in">
    <div className={`px-6 py-4 rounded-2xl backdrop-blur-lg border shadow-2xl flex items-center gap-3 ${
      type === 'success' 
        ? 'bg-green-500/90 border-green-400/50 text-white' 
        : 'bg-red-500/90 border-red-400/50 text-white'
    }`}>
      {type === 'success' ? (
        <Check className="w-5 h-5" />
      ) : (
        <X className="w-5 h-5" />
      )}
      <span className="font-semibold">{message}</span>
      <button onClick={onClose} className="hover:opacity-70 ml-2">
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);

// Footer Component
export const Footer = () => (
  <footer className="py-8 text-center">
    <div className="bg-white/10 backdrop-blur-sm mx-auto px-6 py-4 rounded-2xl max-w-md">
      <p className="font-medium text-black/70">
        Helping build better communities, one report at a time
      </p>
    </div>
  </footer>
);