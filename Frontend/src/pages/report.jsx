import { useState, useRef, useCallback } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  FormCard, InputField, DropdownField, TextAreaField, ToggleField,
  ImageUploadSection, SubmitButton, Toast, Footer, StatusBadge
} from '@/components/report_ui';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createIssue, getIssueCategories } from '@/api/issues';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { showSuccessToast } from '@/lib/showToast';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CreateIssue = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    category: '', title: '', description: '', location: '',
    coordinates: null, verified: true, images: []
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getIssueCategories,
    onError: () => showToast('Failed to load categories', 'error')
  });

  const submitIssueMutation = useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      showSuccessToast('Issue reported successfully!');
      setFormData({ category: '', title: '', description: '', location: '', coordinates: null, verified: true, images: [] });
    },
    onError: () => showToast('Failed to submit issue', 'error')
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData(prev => ({
          ...prev,
          coordinates: { lat, lon: lng }
        }));
      }
    });
    return null;
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Address is required';
    if (formData.title.length > 100) newErrors.title = 'Max 100 chars';
    if (formData.description.length > 500) newErrors.description = 'Max 500 chars';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      address: formData.location.trim(),
      is_anonymous: !formData.verified,
      pseudonym_id: null,
      status_id: 1,
      images: formData.images.map(img => ({
        name: img.name,
        size: img.size,
        type: img.type,
        base64: img.base64
      }))
    };

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

            <div>
              <label className="block mb-1 font-medium">Select Location on Map</label>
              <MapContainer
                center={formData.coordinates ? [formData.coordinates.lat, formData.coordinates.lon] : [28.6139, 77.2090]}
                zoom={13}
                style={{ height: '300px', borderRadius: '8px' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {formData.coordinates && (
                  <Marker position={[formData.coordinates.lat, formData.coordinates.lon]} />
                )}
                <LocationMarker />
              </MapContainer>
              {formData.coordinates && (
                <div className="bg-gray-100 mt-2 p-2 rounded text-gray-700 text-sm">
                  Coordinates: {formData.coordinates.lat.toFixed(5)}, {formData.coordinates.lon.toFixed(5)}
                </div>
              )}
              <InputField label="Enter Address" value={formData.location} onChange={(v) => handleInputChange('location', v)} error={errors.location} required placeholder="Enter address manually" />
            </div>

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
