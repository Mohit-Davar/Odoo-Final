import React, { useState, useRef, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  FormCard, InputField, DropdownField, TextAreaField, ToggleField,
  ImageUploadSection, SubmitButton, Toast, Footer, StatusBadge
} from '@/components/report_ui';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createIssue, getIssueCategories } from '@/api/issues';

const geocodeLocation = async (locationString) => {
  if (!locationString.trim()) return null;
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationString)}&limit=1&addressdetails=1`
  );
  if (!response.ok) throw new Error('Geocoding failed');
  const data = await response.json();
  return data.length > 0 ? {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
    display_name: data[0].display_name,
    address: data[0].address
  } : null;
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};

const CreateIssue = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    category: '', title: '', description: '', location: '',
    coordinates: null, verified: true, images: []
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const debouncedLocation = useDebounce(formData.location, 800);

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getIssueCategories,
    onError: () => showToast('Failed to load categories', 'error')
  });

  const submitIssueMutation = useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      showToast('Issue reported successfully!', 'success');
      setFormData({ category: '', title: '', description: '', location: '', coordinates: null, verified: true, images: [] });
    },
    onError: () => showToast('Failed to submit issue', 'error')
  });

  useQuery({
    queryKey: ['geocode', debouncedLocation],
    queryFn: () => geocodeLocation(debouncedLocation),
    enabled: !!debouncedLocation && debouncedLocation.length > 3,
    onSuccess: (data) => {
      if (data) setFormData(prev => ({ ...prev, coordinates: { lat: data.lat, lon: data.lon, display_name: data.display_name } }));
    }
  });

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (formData.title.length > 100) newErrors.title = 'Max 100 chars';
    if (formData.description.length > 500) newErrors.description = 'Max 500 chars';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'location') setFormData(prev => ({ ...prev, coordinates: null }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleImageUpload = (files) => {
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const fileList = Array.from(files);
    if (formData.images.length + fileList.length > 5) return showToast('Max 5 images allowed', 'error');

    fileList.forEach((file, index) => {
      if (!allowedTypes.includes(file.type)) return showToast('Only JPG/PNG allowed', 'error');
      if (file.size > maxSize) return showToast('File must be under 5MB', 'error');

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        const imageData = {
          id: Date.now() + Math.random() + index,
          name: file.name,
          size: file.size,
          type: file.type,
          base64: base64Data,
          preview: base64Data,
        };
        setFormData(prev => ({ ...prev, images: [...prev.images, imageData].slice(0, 5) }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageRemove = (imageId) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter(img => img.id !== imageId) }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return showToast('Please correct form errors', 'error');

    const submissionData = {
      category_id: formData.category,
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.coordinates ? { x: formData.coordinates.lon, y: formData.coordinates.lat } : null,
      address: formData.coordinates?.display_name || '',
      is_anonymous: !formData.verified,
      pseudonym_id: null,
      status_id: 1,
      images: formData.images.map(img => ({ name: img.name, size: img.size, type: img.type, base64: img.base64 }))
    };

    console.log(submissionData)
    submitIssueMutation.mutate(submissionData);
  };

  const isFormValid = formData.category && formData.title.trim() && formData.description.trim() && formData.location.trim() && Object.keys(errors).length === 0;

  return (
    <div className="bg-gradient-to-br from-civic-blue via-blue-100 to-cyan-100 min-h-screen font-montserrat">
      <main className="mx-auto px-4 py-8 max-w-4xl container">
        <FormCard>
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-black">
            <ArrowLeft className="w-4 h-4" /> <span>Back</span>
          </button>
          <form onSubmit={handleSubmit} className="space-y-8">
            <h1 className="font-bold text-black text-3xl text-center">Report an Issue</h1>
            <StatusBadge />
            <div className="gap-6 grid md:grid-cols-2">
              <DropdownField label="Category" value={formData.category} onChange={(v) => handleInputChange('category', v)} options={categoriesQuery.data || []} error={errors.category} required loading={categoriesQuery.isLoading} />
              <InputField label="Title" value={formData.title} onChange={(v) => handleInputChange('title', v)} placeholder="Brief description" error={errors.title} required maxLength={100} />
            </div>
            <InputField label="Location" value={formData.location} onChange={(v) => handleInputChange('location', v)} placeholder="Street or landmark" error={errors.location} required icon="MapPin" />
            {formData.coordinates?.display_name && <div className="bg-gray-100 p-2 rounded text-gray-600 text-sm">Detected: {formData.coordinates.display_name}</div>}
            <TextAreaField label="Description" value={formData.description} onChange={(v) => handleInputChange('description', v)} error={errors.description} required maxLength={500} />
            <ToggleField label="Report as Verified" value={formData.verified} onChange={(v) => handleInputChange('verified', v)} description="Your identity will be attached" />
            <ImageUploadSection images={formData.images} onUpload={handleImageUpload} onRemove={handleImageRemove} fileInputRef={fileInputRef} />
            <SubmitButton isSubmitting={submitIssueMutation.isLoading} isValid={isFormValid} onClick={handleSubmit} />
          </form>
        </FormCard>
      </main>
      <Footer />
      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false, message: '', type: '' })} />}
    </div>
  );
};

export default CreateIssue;
