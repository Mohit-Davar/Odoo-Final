import React, { useState, useRef } from 'react';
import {
  Header,
  FormCard,
  InputField,
  DropdownField,
  TextAreaField,
  ToggleField,
  ImageUploadSection,
  SubmitButton,
  Toast,
  Footer,
  StatusBadge
} from '@/components/report_ui';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ISSUE_CATEGORIES = [
  { value: 'roads', label: 'Roads', icon: 'Construction' },
  { value: 'lighting', label: 'Lighting', icon: 'Lightbulb' },
  { value: 'water-supply', label: 'Water Supply', icon: 'Droplets' },
  { value: 'cleanliness', label: 'Cleanliness', icon: 'Trash2' },
  { value: 'public-safety', label: 'Public Safety', icon: 'Shield' },
  { value: 'obstructions', label: 'Obstructions', icon: 'AlertTriangle' }
];

const CreateIssue = () => {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    verified: true,
    images: []
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    
    if (formData.title.length > 100) newErrors.title = 'Title must be under 100 characters';
    if (formData.description.length > 500) newErrors.description = 'Description must be under 500 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = (files) => {
    const validFiles = [];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    Array.from(files).forEach(file => {
      if (!allowedTypes.includes(file.type)) {
        showToast('Only JPG and PNG files are allowed', 'error');
        return;
      }
      if (file.size > maxSize) {
        showToast('File size must be under 5MB', 'error');
        return;
      }
      if (formData.images.length + validFiles.length >= 5) {
        showToast('Maximum 5 images allowed', 'error');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          id: Date.now() + Math.random(),
          file,
          preview: e.target.result,
          name: file.name
        };
        validFiles.push(imageData);
        
        if (validFiles.length === Array.from(files).filter(f => 
          allowedTypes.includes(f.type) && f.size <= maxSize
        ).length) {
          setFormData(prev => ({ 
            ...prev, 
            images: [...prev.images, ...validFiles].slice(0, 5)
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageRemove = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('Issue reported successfully!', 'success');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          category: '',
          title: '',
          description: '',
          location: '',
          verified: true,
          images: []
        });
        setErrors({});
      }, 2000);
      
    } catch (error) {
      showToast('Failed to submit issue. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const navigate = useNavigate();

  const handleBack = ()=>{
    navigate('/dashboard'); 
  }

  const isFormValid = formData.category && 
                     formData.title.trim() && 
                     formData.description.trim() && 
                     formData.location.trim() &&
                     Object.keys(errors).length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue via-blue-100 to-cyan-100 font-montserrat"> 
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <FormCard>
        <button onClick={handleBack} className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-black hover:bg-white/30 transition-all duration-200">
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </button>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-black mb-2 flex items-center justify-center gap-3">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="9" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                </div>
                Report an Issue
              </h1>
              <p className="text-black/70 text-lg">Help improve your community by reporting issues</p>
            </div>

            {/* Status Badge */}
            <div className="flex justify-center mb-6">
              <StatusBadge />
            </div>

            {/* Form Fields Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <DropdownField
                label="Category"
                value={formData.category}
                options={ISSUE_CATEGORIES}
                onChange={(value) => handleInputChange('category', value)}
                error={errors.category}
                required
              />

              <InputField
                label="Title"
                value={formData.title}
                onChange={(value) => handleInputChange('title', value)}
                placeholder="Brief description of the issue"
                error={errors.title}
                required
                maxLength={100}
                icon="Edit3"
              />
            </div>

            <InputField
              label="Location"
              value={formData.location}
              onChange={(value) => handleInputChange('location', value)}
              placeholder="Street name, area, or landmark"
              error={errors.location}
              required
              icon="MapPin"
            />

            <TextAreaField
              label="Description"
              value={formData.description}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Provide detailed information about the issue..."
              error={errors.description}
              required
              maxLength={500}
            />

            <ToggleField
              label="Report as Verified"
              value={formData.verified}
              onChange={(value) => handleInputChange('verified', value)}
              description="Include your identity with this report"
            />

            <ImageUploadSection
              images={formData.images}
              onUpload={handleImageUpload}
              onRemove={handleImageRemove}
              fileInputRef={fileInputRef}
            />

            <SubmitButton
              isSubmitting={isSubmitting}
              isValid={isFormValid}
              onClick={handleSubmit}
            />
          </form>
        </FormCard>
      </main>

      <Footer />
      
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default CreateIssue;