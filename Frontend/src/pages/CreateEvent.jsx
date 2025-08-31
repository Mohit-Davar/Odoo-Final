import React, { useRef, useCallback, useEffect, useMemo } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FormCard,
  DropdownField,
  ToggleField,
  ImageUploadSection,
  SubmitButton,
  Toast,
  Footer,
} from "@/components/ui/Create_Event_UI";
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  MapPin,
  Navigation,
  Search,
  Loader2,
  Clock,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createIssue,
  getIssueCategories,
  getIssueById,
  updateIssue,
} from "@/api/event";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { showSuccessToast } from "@/lib/showToast";
import { debounce } from "lodash";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const currentLocationIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
      <circle cx="12" cy="12" r="3" fill="white"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Time picker component
const TimePicker = ({ value, onChange, label, error, required }) => {
  const formatTime = (date) => {
    if (!date) return "";
    return format(date, "HH:mm");
  };

  const handleTimeChange = (timeString) => {
    if (!timeString) {
      onChange(null);
      return;
    }

    const [hours, minutes] = timeString.split(":").map(Number);
    const newDate = value ? new Date(value) : new Date();
    newDate.setHours(hours, minutes, 0, 0);
    onChange(newDate);
  };

  return (
    <div>
      {label && (
        <label className="block mb-1 font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type="time"
          value={formatTime(value)}
          onChange={(e) => handleTimeChange(e.target.value)}
          className={`w-full p-2 pr-10 border rounded-md ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <Clock className="top-1/2 right-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none transform" />
      </div>
      {error && <p className="mt-1 text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

// Enhanced Date Time Range Picker
const DateTimeRangePicker = ({ value, onChange, error, required }) => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [tempDateRange, setTempDateRange] = React.useState(
    value?.dateRange || { from: undefined, to: undefined }
  );

  const formatDateTime = (date, time) => {
    if (!date) return "";
    if (!time) return format(date, "LLL d, y");
    return `${format(date, "LLL d, y")} at ${format(time, "h:mm a")}`;
  };

  const handleDateRangeChange = (newRange) => {
    setTempDateRange(newRange);

    const updatedValue = {
      ...value,
      dateRange: newRange,
      startTime: newRange?.from ? value?.startTime || new Date() : null,
      endTime: newRange?.to ? value?.endTime || new Date() : null,
    };

    if (newRange?.from && !value?.startTime) {
      const defaultStartTime = new Date();
      defaultStartTime.setHours(9, 0, 0, 0);
      updatedValue.startTime = defaultStartTime;
    }

    if (newRange?.to && !value?.endTime) {
      const defaultEndTime = new Date();
      defaultEndTime.setHours(17, 0, 0, 0);
      updatedValue.endTime = defaultEndTime;
    }

    onChange(updatedValue);

    if (
      newRange?.from &&
      newRange?.to &&
      newRange.from.getTime() !== newRange.to.getTime()
    ) {
      setIsCalendarOpen(false);
    }
  };

  const handleTimeChange = (timeType, newTime) => {
    onChange({
      ...value,
      [timeType]: newTime,
    });
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium text-gray-700">
        Event Date & Time
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className={`w-full text-left p-2 border rounded-md flex justify-between items-center ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <span className="text-gray-700">
            {value?.dateRange?.from
              ? value.dateRange.to
                ? `${format(value.dateRange.from, "LLL d, y")} - ${format(
                    value.dateRange.to,
                    "LLL d, y"
                  )}`
                : format(value.dateRange.from, "LLL d, y")
              : "Select date range"}
          </span>
          <CalendarIcon className="w-4 h-4 text-gray-500" />
        </button>

        {isCalendarOpen && (
          <div className="z-10 absolute bg-white shadow-lg mt-2 border rounded-md">
            <DayPicker
              className="p-4"
              mode="range"
              selected={tempDateRange}
              onSelect={handleDateRangeChange}
              disabled={{ before: new Date() }}
            />
          </div>
        )}
      </div>

      {value?.dateRange?.from && (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <TimePicker
            label="Start Time"
            value={value.startTime}
            onChange={(time) => handleTimeChange("startTime", time)}
            required
          />

          {value?.dateRange?.to && (
            <TimePicker
              label="End Time"
              value={value.endTime}
              onChange={(time) => handleTimeChange("endTime", time)}
              required
            />
          )}
        </div>
      )}

      {value?.dateRange?.from && value?.startTime && (
        <div className="bg-blue-50 p-3 border border-blue-200 rounded-md">
          <div className="text-blue-800 text-sm">
            <div className="font-medium">Event Schedule:</div>
            <div>
              Start: {formatDateTime(value.dateRange.from, value.startTime)}
            </div>
            {value?.dateRange?.to && value?.endTime && (
              <div>
                End: {formatDateTime(value.dateRange.to, value.endTime)}
              </div>
            )}
          </div>
        </div>
      )}

      {error && <p className="mt-1 text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

// Simplified DateTimePicker for Ticket Sales
const TicketDateTimePicker = ({ value, onChange, error }) => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const datePickerRef = React.useRef(null);

  const selectedDate = value ? new Date(value) : undefined;
  const selectedTime = value ? format(new Date(value), "HH:mm") : "";

  const handleDateSelect = (date) => {
    if (!date) return;
    const newDateTime = value ? new Date(value) : new Date();
    newDateTime.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
    onChange(newDateTime);
    setIsCalendarOpen(false);
  };

  const handleTimeChange = (timeString) => {
    if (!timeString) return;
    const [hours, minutes] = timeString.split(":").map(Number);
    const newDateTime = value ? new Date(value) : new Date();
    newDateTime.setHours(hours, minutes, 0, 0);
    onChange(newDateTime);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="gap-2 grid grid-cols-2">
        <button
          type="button"
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className={`w-full text-left p-2 border rounded-md flex justify-between items-center ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <span className="text-gray-700 text-sm">
            {selectedDate ? format(selectedDate, "MMM d, y") : "Select Date"}
          </span>
          <CalendarIcon className="w-4 h-4 text-gray-500" />
        </button>
        <div className="relative">
          <input
            type="time"
            value={selectedTime}
            onChange={(e) => handleTimeChange(e.target.value)}
            className={`w-full p-2 border rounded-md ${
              error ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
      </div>
      {isCalendarOpen && (
        <div ref={datePickerRef} className="z-20 absolute bg-white shadow-lg mt-2 border rounded-md">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={{ before: new Date() }}
          />
        </div>
      )}
      {error && <p className="mt-1 text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

// Predefined list of ticket types
const ticketTypes = [
  { id: '1', name: 'General Admission' },
  { id: '2', name: 'VIP' },
  { id: '3', name: 'Student' },
  { id: '4', name: 'Business' },
  { id: '5', name: 'Lounge' },
  { id: '6', name: 'Backstage' },
  { id: '7', name: 'Group Pass' },
  { id: '8', name: 'Online' },
];

// Component for a single ticket type row
const TicketRow = ({ index, control, remove, errors }) => {
  return (
    <div className="relative space-y-4 bg-gray-50 p-4 border rounded-lg">
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {/* Ticket Type Dropdown */}
            <Controller
                name={`tickets.${index}.ticket_type`}
                control={control}
                rules={{ required: "Ticket type is required" }}
                render={({ field, fieldState }) => (
                    <FormInput label="Ticket Type" error={fieldState.error} required>
                        <select
                          {...field}
                          className={`w-full p-2 border rounded-md bg-white ${fieldState.error ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="" disabled>Select a type...</option>
                            {ticketTypes.map(type => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </FormInput>
                )}
            />
            {/* Price */}
            <Controller
                name={`tickets.${index}.price`}
                control={control}
                rules={{ required: "Price is required", min: { value: 0, message: "Price can't be negative" } }}
                render={({ field, fieldState }) => (
                    <FormInput label="Price (₹)" error={fieldState.error} required>
                        <input {...field} type="number" step="0.01" placeholder="0.00 for free" className={`w-full p-2 border rounded-md ${fieldState.error ? "border-red-500" : "border-gray-300"}`} />
                    </FormInput>
                )}
            />
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
             {/* Quantity */}
            <Controller
                name={`tickets.${index}.quantity`}
                control={control}
                rules={{ required: "Quantity is required", min: { value: 1, message: "Must be at least 1" } }}
                render={({ field, fieldState }) => (
                    <FormInput label="Total Tickets Available" error={fieldState.error} required>
                        <input {...field} type="number" placeholder="e.g., 100" className={`w-full p-2 border rounded-md ${fieldState.error ? "border-red-500" : "border-gray-300"}`} />
                    </FormInput>
                )}
            />
            {/* Max Per User */}
            <Controller
                name={`tickets.${index}.maxPerUser`}
                control={control}
                rules={{ required: "This is required", min: { value: 1, message: "Must be at least 1" } }}
                render={({ field, fieldState }) => (
                    <FormInput label="Max Tickets Per User" error={fieldState.error} required>
                        <input {...field} type="number" placeholder="e.g., 5" className={`w-full p-2 border rounded-md ${fieldState.error ? "border-red-500" : "border-gray-300"}`} />
                    </FormInput>
                )}
            />
        </div>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {/* Sales Start */}
            <Controller
                name={`tickets.${index}.salesStart`}
                control={control}
                rules={{ required: "Sales start date is required" }}
                render={({ field, fieldState }) => (
                    <FormInput label="Sales Start" error={fieldState.error} required>
                        <TicketDateTimePicker value={field.value} onChange={field.onChange} error={fieldState.error} />
                    </FormInput>
                )}
            />
            {/* Sales End */}
            <Controller
                name={`tickets.${index}.salesEnd`}
                control={control}
                rules={{ required: "Sales end date is required" }}
                render={({ field, fieldState }) => (
                    <FormInput label="Sales End" error={fieldState.error} required>
                        <TicketDateTimePicker value={field.value} onChange={field.onChange} error={fieldState.error} />
                    </FormInput>
                )}
            />
        </div>
        <button
            type="button"
            onClick={() => remove(index)}
            className="top-2 right-2 absolute text-gray-400 hover:text-red-600 transition-colors"
            aria-label="Remove Ticket"
        >
            <Trash2 className="w-5 h-5" />
        </button>
    </div>
  );
};

// Custom hooks for location functionality
const useGeolocation = () => {
  const getCurrentLocation = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          const errorMessages = {
            [error.PERMISSION_DENIED]: "Location access denied",
            [error.POSITION_UNAVAILABLE]: "Location unavailable",
            [error.TIMEOUT]: "Location request timed out",
          };
          reject(new Error(errorMessages[error.code] || "Location error"));
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      );
    });
  }, []);

  return { getCurrentLocation };
};

const useLocationSearch = (currentLocation) => {
  const searchLocations = useCallback(
    async (query) => {
      if (!query?.trim() || query.length < 3) return [];

      try {
        const proximity = currentLocation
          ? `&proximity=${currentLocation.lon},${currentLocation.lat}`
          : "";

        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=5&addressdetails=1&countrycodes=in${proximity}`
        );

        if (!response.ok) throw new Error("Search failed");

        const data = await response.json();

        return data
          .map((item) => ({
            id: item.place_id,
            display_name: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            distance: currentLocation
              ? Math.round(
                  Math.sqrt(
                    Math.pow(
                      (parseFloat(item.lat) - currentLocation.lat) * 111,
                      2
                    ) +
                      Math.pow(
                        (parseFloat(item.lon) - currentLocation.lon) * 111,
                        2
                      )
                  )
                )
              : null,
          }))
          .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
      } catch (error) {
        console.error("Location search error:", error);
        throw error;
      }
    },
    [currentLocation]
  );

  return { searchLocations };
};

const useReverseGeocode = () => {
  const reverseGeocode = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`
      );

      if (!response.ok) throw new Error("Reverse geocoding failed");

      const data = await response.json();
      return data.display_name || "";
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return "";
    }
  }, []);

  return { reverseGeocode };
};

// Optimized form components
const FormInput = ({
  label,
  error,
  required,
  className = "",
  children,
  ...props
}) => (
  <div className={className}>
    {label && (
      <label className="block mb-1 font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
    )}
    {children}
    {error && <p className="mt-1 text-red-500 text-xs">{error.message}</p>}
  </div>
);

const LocationSuggestions = ({
  suggestions,
  onSelect,
  isVisible,
  isLoading,
}) => {
  if (!isVisible || (!suggestions.length && !isLoading)) return null;

  return (
    <div className="z-[99999] absolute bg-white shadow-lg mt-1 border border-gray-300 rounded-md w-full max-h-60 overflow-auto">
      {isLoading && (
        <div className="p-3 text-gray-500 text-center">
          <Loader2 className="inline mr-2 w-4 h-4 animate-spin" />
          Searching locations...
        </div>
      )}
      {suggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          onClick={() => onSelect(suggestion)}
          className="hover:bg-gray-50 p-3 border-gray-100 border-b last:border-b-0 w-full text-left transition-colors"
        >
          <div className="flex items-start gap-2">
            <MapPin className="flex-shrink-0 mt-0.5 w-4 h-4 text-gray-500" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-900 text-sm truncate">
                {suggestion.display_name.split(",")[0]}
              </div>
              <div className="text-gray-500 text-xs line-clamp-2">
                {suggestion.display_name}
              </div>
              {suggestion.distance && (
                <div className="mt-1 text-blue-600 text-xs">
                  {suggestion.distance} km away
                </div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

// Utility function to parse existing event data for form
const parseEventForForm = (eventData) => {
  if (!eventData) return {};

  const startDate = eventData.start_date
    ? new Date(eventData.start_date)
    : null;
  const endDate = eventData.end_date ? new Date(eventData.end_date) : null;

  const dateRange = {
    from: startDate,
    to:
      endDate && endDate.getTime() !== startDate?.getTime()
        ? endDate
        : undefined,
  };
  
  // Parse ticket data using ticket_type_id
  const tickets = (eventData.tickets || []).map(ticket => ({
      ticket_type: ticket.ticket_type_id ? ticket.ticket_type_id.toString() : '',
      price: ticket.price || 0,
      quantity: ticket.quantity || 0,
      maxPerUser: ticket.max_per_user || 1,
      salesStart: ticket.sales_start_date ? new Date(ticket.sales_start_date) : null,
      salesEnd: ticket.sales_end_date ? new Date(ticket.sales_end_date) : null,
  }));

  return {
    category: eventData.category_id ? eventData.category_id.toString() : "",
    title: eventData.title || "",
    description: eventData.description || "",
    location: eventData.address || "",
    coordinates: eventData.location
      ? { lat: eventData.location.y, lon: eventData.location.x }
      : null,
    isPublished: eventData.is_published ?? false,
    images: eventData.images || [],
    eventDateTime: {
      dateRange,
      startTime: startDate,
      endTime: endDate,
    },
    tickets: tickets,
  };
};

const CreateEditEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const isEditMode = Boolean(eventId);

  const fileInputRef = useRef(null);
  const mapRef = useRef(null);
  const locationInputRef = useRef(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      category: "",
      title: "",
      description: "",
      location: "",
      coordinates: null,
      isPublished: false,
      images: [],
      eventDateTime: {
        dateRange: { from: undefined, to: undefined },
        startTime: null,
        endTime: null,
      },
      tickets: [],
    },
    mode: "onChange",
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tickets",
  });

  const { getCurrentLocation } = useGeolocation();
  const { searchLocations } = useLocationSearch(watch("currentLocation"));
  const { reverseGeocode } = useReverseGeocode();

  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [isGettingLocation, setIsGettingLocation] = React.useState(false);
  const [locationSuggestions, setLocationSuggestions] = React.useState([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isSearchingLocations, setIsSearchingLocations] = React.useState(false);
  const [toast, setToast] = React.useState({
    show: false,
    message: "",
    type: "",
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getIssueCategories,
    staleTime: 5 * 60 * 1000,
  });

  const eventQuery = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => getIssueById(eventId),
    enabled: isEditMode,
  });

  useEffect(() => {
    if (eventQuery.isSuccess && eventQuery.data) {
      const formData = parseEventForForm(eventQuery.data);
      reset(formData);
    }
  }, [eventQuery.isSuccess, eventQuery.data, reset]);

  const createEventMutation = useMutation({
    mutationFn: createIssue,
    onSuccess: () => {
      showSuccessToast("Event created successfully!");
      reset();
      navigate("/home");
    },
    onError: () => showToast("Failed to create event", "error"),
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ eventId, data }) => updateIssue(eventId, data),
    onSuccess: () => {
      showSuccessToast("Event updated successfully!");
      navigate("/home");
    },
    onError: () => showToast("Failed to update event", "error"),
  });

  const debouncedLocationSearch = useMemo(
    () =>
      debounce(async (query) => {
        if (!query?.trim() || query.length < 3) {
          setLocationSuggestions([]);
          setShowSuggestions(false);
          setIsSearchingLocations(false);
          return;
        }

        setIsSearchingLocations(true);
        try {
          const suggestions = await searchLocations(query);
          setLocationSuggestions(suggestions);
          setShowSuggestions(true);
        } catch (error) {
          showToast("Failed to search locations", "error");
        } finally {
          setIsSearchingLocations(false);
        }
      }, 500),
    [searchLocations]
  );

  const handleGetCurrentLocation = useCallback(async () => {
    setIsGettingLocation(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      setValue("coordinates", location);
      const address = await reverseGeocode(location.lat, location.lon);
      if (address) {
        setValue("location", address);
      }
      showToast("Current location detected!", "success");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsGettingLocation(false);
    }
  }, [getCurrentLocation, reverseGeocode, setValue]);

  const handleSelectSuggestion = useCallback(
    (suggestion) => {
      setValue("location", suggestion.display_name);
      setValue("coordinates", { lat: suggestion.lat, lon: suggestion.lon });
      setShowSuggestions(false);
      setLocationSuggestions([]);
    },
    [setValue]
  );

  const MapClickHandler = React.memo(() => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        const newCoordinates = { lat, lon: lng };
        setValue("coordinates", newCoordinates);
        try {
          const address = await reverseGeocode(lat, lng);
          if (address) {
            setValue("location", address);
          }
        } catch (error) {
          console.error("Error getting address:", error);
        }
      },
    });
    return null;
  });

  const combineDateTime = (date, time) => {
    if (!date || !time) return null;
    const combined = new Date(date);
    combined.setHours(time.getHours(), time.getMinutes(), 0, 0);
    return combined;
  };

  const onSubmit = useCallback(
    async (data) => {
      if (!data.coordinates) {
        showToast("Please select a location on the map", "error");
        return;
      }
      if (!data.eventDateTime.dateRange?.from || !data.eventDateTime.startTime) {
        showToast("Please select event date and start time", "error");
        return;
      }
      if (!data.tickets || data.tickets.length === 0) {
        showToast("Please add at least one ticket type", "error");
        return;
      }

      const startDateTime = combineDateTime(
        data.eventDateTime.dateRange.from,
        data.eventDateTime.startTime
      );
      const endDateTime =
        data.eventDateTime.dateRange.to && data.eventDateTime.endTime
          ? combineDateTime(data.eventDateTime.dateRange.to, data.eventDateTime.endTime)
          : startDateTime;

      // Format ticket data for submission, sending the ID
      const ticketsData = data.tickets.map(ticket => ({
          ticket_type_id: parseInt(ticket.ticket_type, 10),
          price: parseFloat(ticket.price),
          quantity: parseInt(ticket.quantity, 10),
          max_per_user: parseInt(ticket.maxPerUser, 10),
          sales_start_date: ticket.salesStart.toISOString(),
          sales_end_date: ticket.salesEnd.toISOString(),
      }));
      
      const submissionData = {
        category_id: data.category,
        title: data.title.trim(),
        description: data.description.trim(),
        location: { x: data.coordinates.lon, y: data.coordinates.lat },
        address: data.location.trim(),
        start_date: startDateTime.toISOString(),
        end_date: endDateTime.toISOString(),
        is_published: data.isPublished,
        pseudonym_id: null,
        status_id: 1,
        images: data.images.map((img) => ({
          name: img.name,
          size: img.size,
          type: img.type,
          base64: img.base64,
        })),
        tickets: ticketsData,
      };

      if (isEditMode) {
        updateEventMutation.mutate({ eventId, data: submissionData });
      } else {
        createEventMutation.mutate(submissionData);
      }
    },
    [isEditMode, eventId, createEventMutation, updateEventMutation]
  );

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  }, []);

  useEffect(() => {
    return () => debouncedLocationSearch.cancel();
  }, [debouncedLocationSearch]);

  const locationValue = watch("location");
  useEffect(() => {
    debouncedLocationSearch(locationValue);
  }, [locationValue, debouncedLocationSearch]);

  const coordinates = watch("coordinates");
  const eventDateTime = watch("eventDateTime");
  const isLoading = isEditMode ? eventQuery.isLoading : false;
  const isSubmitting = createEventMutation.isLoading || updateEventMutation.isLoading;

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-civic-blue via-blue-100 to-cyan-100 min-h-screen font-montserrat">
        <main className="mx-auto px-4 py-8 max-w-4xl container">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <Loader2 className="mx-auto mb-4 w-8 h-8 text-blue-600 animate-spin" />
              <p className="text-gray-600">Loading event data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen font-montserrat">
      <main className="bg-secondary-text mx-auto px-4 py-8 max-w-4xl container">
        <FormCard>
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h1 className="font-bold text-black text-3xl text-center">
              {isEditMode ? "Edit Event" : "Add New Event"}
            </h1>

            {/* Basic Information */}
            <div className="gap-6 grid md:grid-cols-2">
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "Event name is required",
                  maxLength: { value: 100, message: "Maximum 100 characters" },
                  validate: (value) => value.trim().length > 0 || "Event name cannot be empty",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormInput label="Event Name" error={error} required>
                    <input
                      {...field}
                      type="text"
                      placeholder="Brief event description"
                      className={`w-full p-2 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                      maxLength={100}
                    />
                  </FormInput>
                )}
              />
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field, fieldState: { error } }) => (
                  <FormInput label="Category" error={error} required>
                    <DropdownField
                      {...field}
                      options={categoriesQuery.data || []}
                      error={error}
                      loading={categoriesQuery.isLoading}
                      placeholder="Select category"
                    />
                  </FormInput>
                )}
              />
            </div>

            {/* Date and Time Range */}
            <Controller
              name="eventDateTime"
              control={control}
              rules={{
                required: "Event date and time are required",
                validate: (value) => {
                  if (!value?.dateRange?.from) return "Please select event start date";
                  if (!value?.startTime) return "Please select event start time";
                  if (value.dateRange?.to && !value?.endTime) return "Please select event end time";
                  if (value.dateRange?.to && value.endTime) {
                    const start = combineDateTime(value.dateRange.from, value.startTime);
                    const end = combineDateTime(value.dateRange.to, value.endTime);
                    if (end <= start) return "End date and time must be after start date and time";
                  }
                  return true;
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <DateTimeRangePicker
                  value={field.value}
                  onChange={field.onChange}
                  error={error}
                  required
                />
              )}
            />

            {/* Description */}
            <Controller
              name="description"
              control={control}
              rules={{
                required: "Description is required",
                maxLength: { value: 500, message: "Maximum 500 characters" },
                validate: (value) => value.trim().length > 0 || "Description cannot be empty",
              }}
              render={({ field, fieldState: { error } }) => (
                <FormInput label="Event Description" error={error} required>
                  <textarea
                    {...field}
                    rows={4}
                    placeholder="Describe your event in detail..."
                    className={`w-full p-2 border rounded-md resize-none ${error ? "border-red-500" : "border-gray-300"}`}
                    maxLength={500}
                  />
                  <div className="mt-1 text-gray-500 text-xs">{field.value?.length || 0}/500 characters</div>
                </FormInput>
              )}
            />

            {/* Ticket Types Section */}
            <div className="space-y-4">
              <label className="block font-medium text-gray-700">Ticket Types</label>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <TicketRow
                    key={field.id}
                    index={index}
                    control={control}
                    remove={remove}
                    errors={errors}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => append({ 
                    ticket_type: '', 
                    price: '', 
                    quantity: '', 
                    maxPerUser: '', 
                    salesStart: new Date(), 
                    salesEnd: new Date() 
                })}
                className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                Add Ticket Type
              </button>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <label className="block font-medium text-gray-700">Event Location</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleGetCurrentLocation}
                  disabled={isGettingLocation}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 px-4 py-2 rounded-md font-medium text-white text-sm transition-colors"
                >
                  {isGettingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <Navigation className="w-4 h-4" />}
                  {isGettingLocation ? "Getting Location..." : "Use Current Location"}
                </button>
                {currentLocation && (
                  <div className="flex items-center text-green-600 text-sm">
                    <MapPin className="mr-1 w-4 h-4" />
                    Current location detected
                  </div>
                )}
              </div>
              <Controller
                name="location"
                control={control}
                rules={{
                  required: "Location is required",
                  validate: (value) => value.trim().length > 0 || "Location cannot be empty",
                }}
                render={({ field, fieldState: { error } }) => (
                  <FormInput error={error} className="relative">
                    <div className="relative">
                      <input
                        {...field}
                        ref={locationInputRef}
                        type="text"
                        placeholder="Search for address or place name..."
                        className={`w-full p-2 pr-10 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
                        onFocus={() => { if (locationSuggestions.length > 0) setShowSuggestions(true); }}
                        onBlur={() => { setTimeout(() => setShowSuggestions(false), 200); }}
                      />
                      <div className="top-1/2 right-2 absolute -translate-y-1/2 transform">
                        {isSearchingLocations ? <Loader2 className="w-4 h-4 text-gray-400 animate-spin" /> : <Search className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>
                    <LocationSuggestions
                      suggestions={locationSuggestions}
                      onSelect={handleSelectSuggestion}
                      isVisible={showSuggestions}
                      isLoading={isSearchingLocations}
                    />
                  </FormInput>
                )}
              />
              <div className="space-y-2">
                <label className="block font-medium text-gray-700 text-sm">Select precise location (click on map to place pin)</label>
                <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden">
                  <MapContainer
                    ref={mapRef}
                    center={coordinates ? [coordinates.lat, coordinates.lon] : [20.5937, 78.9629]}
                    zoom={coordinates ? 15 : 5}
                    style={{ height: "300px" }}
                    key={coordinates ? `${coordinates.lat}-${coordinates.lon}` : "default"}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {currentLocation && <Marker position={[currentLocation.lat, currentLocation.lon]} icon={currentLocationIcon}><Popup>Your Location</Popup></Marker>}
                    {coordinates && <Marker position={[coordinates.lat, coordinates.lon]}><Popup>Event Location</Popup></Marker>}
                    <MapClickHandler />
                  </MapContainer>
                </div>
                {coordinates && (
                  <div className="bg-blue-50 p-3 border border-blue-200 rounded-md">
                    <div className="flex items-center gap-2 text-blue-800">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium text-sm">Selected: {coordinates.lat.toFixed(5)}, {coordinates.lon.toFixed(5)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Options */}
            <Controller
              name="isPublished"
              control={control}
              render={({ field }) => (
                <ToggleField
                  label="Publish Event"
                  value={field.value}
                  onChange={field.onChange}
                  description={field.value ? 'Event will be publicly visible.' : 'Event will be saved as a draft.'}
                />
              )}
            />

            {/* Image Upload */}
            <Controller
              name="images"
              control={control}
              render={({ field }) => (
                <ImageUploadSection
                  images={field.value}
                  onUpload={(files) => {
                    const currentImages = field.value || [];
                    const remainingSlots = 5 - currentImages.length;
                    if (remainingSlots <= 0) {
                      showToast("Maximum 5 images allowed.", "error");
                      return;
                    }
                    // Process files...
                  }}
                  onRemove={(imageId) => {
                    const updatedImages = field.value.filter((img) => img.id !== imageId);
                    setValue("images", updatedImages);
                    showToast("Image removed", "success");
                  }}
                  fileInputRef={fileInputRef}
                  maxImages={5}
                />
              )}
            />

            {/* Submit Button */}
            <SubmitButton
              isSubmitting={isSubmitting}
              isValid={isValid && !!coordinates}
              onClick={handleSubmit(onSubmit)}
              text={isEditMode ? "Update Event" : "Create Event"}
            />
          </form>
        </FormCard>
      </main>

      <Footer />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default CreateEditEvent; 