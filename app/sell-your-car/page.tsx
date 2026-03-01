"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Check, ChevronRight, Upload, User, Car, Camera, ClipboardCheck } from "lucide-react";

interface SellCarFormData {
  // Step 1 - Your Details
  fullName: string;
  phone: string;
  email: string;
  city: string;
  // Step 2 - Vehicle Details
  make: string;
  model: string;
  year: string;
  mileage: string;
  transmission: string;
  fuelType: string;
  condition: string;
  askingPrice: string;
  // Step 3 - Photos
  // Step 4 - Review
}

const steps = [
  { label: "Your Details", icon: User },
  { label: "Vehicle Details", icon: Car },
  { label: "Upload Photos", icon: Camera },
  { label: "Review & Submit", icon: ClipboardCheck },
];

export default function SellYourCarPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
  } = useForm<SellCarFormData>({
    defaultValues: {
      transmission: "Automatic",
      fuelType: "Petrol",
      condition: "Used - Good",
    },
  });

  const formValues = watch();

  const nextStep = async () => {
    let fieldsToValidate: (keyof SellCarFormData)[] = [];
    if (currentStep === 0) fieldsToValidate = ["fullName", "phone", "email", "city"];
    if (currentStep === 1)
      fieldsToValidate = ["make", "model", "year", "mileage", "transmission", "fuelType", "condition", "askingPrice"];

    if (fieldsToValidate.length > 0) {
      const valid = await trigger(fieldsToValidate);
      if (!valid) return;
    }
    setCurrentStep((s) => Math.min(s + 1, 3));
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handlePhotoUpload = () => {
    // Mock: Add a placeholder image
    if (photos.length < 10) {
      setPhotos([...photos, `/hero.png`]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<SellCarFormData> = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className='pt-[68px] min-h-screen bg-surface-base flex items-center justify-center'>
        <div className='text-center max-w-md px-6'>
          <div className='w-20 h-20 rounded-full bg-status-success/10 flex items-center justify-center mx-auto mb-6'>
            <Check size={40} className='text-status-success' />
          </div>
          <h1 className='font-display text-3xl font-bold text-text-brand-primary mb-4'>
            Request Submitted!
          </h1>
          <p className='text-text-brand-secondary mb-8'>
            Thank you for submitting your vehicle details. Our team will review your
            request and contact you within 24 hours for a free valuation.
          </p>
          <a
            href='/'
            className='inline-block bg-brand-accent text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors'
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      <div className='max-w-3xl mx-auto px-6 sm:px-16 py-12'>
        <h1 className='font-display text-3xl md:text-4xl font-bold text-text-brand-primary mb-2'>
          Sell Your Car
        </h1>
        <p className='text-text-brand-muted mb-10'>
          Fill in your details and our team will get back to you with a free valuation.
        </p>

        {/* Stepper */}
        <div className='stepper mb-10'>
          {steps.map((step, i) => (
            <div key={i} className='flex items-center'>
              <div className={`stepper__step ${i <= currentStep ? "stepper__step--active" : ""}`}>
                <div className='stepper__circle'>
                  {i < currentStep ? (
                    <Check size={18} />
                  ) : (
                    <step.icon size={18} />
                  )}
                </div>
                <span className='stepper__label'>{step.label}</span>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight size={18} className='text-gray-300 mx-2 hidden sm:block' />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Your Details */}
          {currentStep === 0 && (
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border-default)]'>
              <h2 className='text-lg font-semibold mb-6'>Your Details</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div className='form-group'>
                  <label className='form-label'>Full Name *</label>
                  <input
                    {...register("fullName", { required: "Name is required" })}
                    className='form-input'
                    placeholder='e.g. John Kamau'
                  />
                  {errors.fullName && (
                    <span className='form-error'>{errors.fullName.message}</span>
                  )}
                </div>
                <div className='form-group'>
                  <label className='form-label'>Phone Number *</label>
                  <input
                    {...register("phone", { required: "Phone is required" })}
                    className='form-input'
                    placeholder='+255 7XX XXX XXX'
                  />
                  {errors.phone && (
                    <span className='form-error'>{errors.phone.message}</span>
                  )}
                </div>
                <div className='form-group'>
                  <label className='form-label'>Email Address *</label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    type='email'
                    className='form-input'
                    placeholder='you@example.com'
                  />
                  {errors.email && (
                    <span className='form-error'>{errors.email.message}</span>
                  )}
                </div>
                <div className='form-group'>
                  <label className='form-label'>City *</label>
                  <select {...register("city", { required: "City is required" })} className='form-select'>
                    <option value=''>Select City</option>
                    <option value='Dar es Salaam'>Dar es Salaam</option>
                    <option value='Mwanza'>Mwanza</option>
                    <option value='Arusha'>Arusha</option>
                    <option value='Dodoma'>Dodoma</option>
                  </select>
                  {errors.city && (
                    <span className='form-error'>{errors.city.message}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Vehicle Details */}
          {currentStep === 1 && (
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border-default)]'>
              <h2 className='text-lg font-semibold mb-6'>Vehicle Details</h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
                <div className='form-group'>
                  <label className='form-label'>Make *</label>
                  <select {...register("make", { required: "Make is required" })} className='form-select'>
                    <option value=''>Select Make</option>
                    {["Toyota", "Nissan", "Honda", "Suzuki", "Mercedes-Benz", "BMW"].map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  {errors.make && <span className='form-error'>{errors.make.message}</span>}
                </div>
                <div className='form-group'>
                  <label className='form-label'>Model *</label>
                  <input
                    {...register("model", { required: "Model is required" })}
                    className='form-input'
                    placeholder='e.g. Land Cruiser Prado'
                  />
                  {errors.model && <span className='form-error'>{errors.model.message}</span>}
                </div>
                <div className='form-group'>
                  <label className='form-label'>Year *</label>
                  <select {...register("year", { required: "Year is required" })} className='form-select'>
                    <option value=''>Select Year</option>
                    {Array.from({ length: 20 }, (_, i) => 2026 - i).map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                  {errors.year && <span className='form-error'>{errors.year.message}</span>}
                </div>
                <div className='form-group'>
                  <label className='form-label'>Mileage (km) *</label>
                  <input
                    {...register("mileage", { required: "Mileage is required" })}
                    type='number'
                    className='form-input'
                    placeholder='e.g. 45000'
                  />
                  {errors.mileage && <span className='form-error'>{errors.mileage.message}</span>}
                </div>
                <div className='form-group'>
                  <label className='form-label'>Transmission *</label>
                  <select {...register("transmission")} className='form-select'>
                    <option value='Automatic'>Automatic</option>
                    <option value='Manual'>Manual</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label className='form-label'>Fuel Type *</label>
                  <select {...register("fuelType")} className='form-select'>
                    <option value='Petrol'>Petrol</option>
                    <option value='Diesel'>Diesel</option>
                    <option value='Hybrid'>Hybrid</option>
                    <option value='Electric'>Electric</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label className='form-label'>Condition *</label>
                  <select {...register("condition")} className='form-select'>
                    <option value='Used - Excellent'>Used - Excellent</option>
                    <option value='Used - Good'>Used - Good</option>
                    <option value='Used - Fair'>Used - Fair</option>
                    <option value='Needs Repair'>Needs Repair</option>
                  </select>
                </div>
                <div className='form-group'>
                  <label className='form-label'>Asking Price (TZS) *</label>
                  <input
                    {...register("askingPrice", { required: "Price is required" })}
                    type='number'
                    className='form-input'
                    placeholder='e.g. 75000000'
                  />
                  {errors.askingPrice && <span className='form-error'>{errors.askingPrice.message}</span>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Upload Photos */}
          {currentStep === 2 && (
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border-default)]'>
              <h2 className='text-lg font-semibold mb-2'>Upload Photos</h2>
              <p className='text-sm text-text-brand-muted mb-6'>
                Upload up to 10 photos. Include exterior, interior, engine, and any damage.
              </p>

              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                {photos.map((photo, i) => (
                  <div key={i} className='relative aspect-square rounded-lg overflow-hidden bg-surface-muted group'>
                    <img src={photo} alt={`Photo ${i + 1}`} className='object-cover w-full h-full' />
                    <button
                      type='button'
                      onClick={() => removePhoto(i)}
                      className='absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                      aria-label={`Remove photo ${i + 1}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
                {photos.length < 10 && (
                  <button
                    type='button'
                    onClick={handlePhotoUpload}
                    className='aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-text-brand-muted hover:border-brand-accent hover:text-brand-accent transition-colors'
                  >
                    <Upload size={24} />
                    <span className='text-xs'>Add Photo</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 3 && (
            <div className='bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[var(--border-default)]'>
              <h2 className='text-lg font-semibold mb-6'>Review Your Submission</h2>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-sm font-semibold text-text-brand-muted uppercase tracking-wider mb-3'>
                    Your Details
                  </h3>
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    <div><span className='text-text-brand-muted'>Name:</span> <span className='font-medium'>{formValues.fullName}</span></div>
                    <div><span className='text-text-brand-muted'>Phone:</span> <span className='font-medium'>{formValues.phone}</span></div>
                    <div><span className='text-text-brand-muted'>Email:</span> <span className='font-medium'>{formValues.email}</span></div>
                    <div><span className='text-text-brand-muted'>City:</span> <span className='font-medium'>{formValues.city}</span></div>
                  </div>
                </div>

                <hr className='border-[var(--border-default)]' />

                <div>
                  <h3 className='text-sm font-semibold text-text-brand-muted uppercase tracking-wider mb-3'>
                    Vehicle Details
                  </h3>
                  <div className='grid grid-cols-2 gap-3 text-sm'>
                    <div><span className='text-text-brand-muted'>Make:</span> <span className='font-medium'>{formValues.make}</span></div>
                    <div><span className='text-text-brand-muted'>Model:</span> <span className='font-medium'>{formValues.model}</span></div>
                    <div><span className='text-text-brand-muted'>Year:</span> <span className='font-medium'>{formValues.year}</span></div>
                    <div><span className='text-text-brand-muted'>Mileage:</span> <span className='font-medium'>{formValues.mileage} km</span></div>
                    <div><span className='text-text-brand-muted'>Transmission:</span> <span className='font-medium'>{formValues.transmission}</span></div>
                    <div><span className='text-text-brand-muted'>Fuel:</span> <span className='font-medium'>{formValues.fuelType}</span></div>
                    <div><span className='text-text-brand-muted'>Condition:</span> <span className='font-medium'>{formValues.condition}</span></div>
                    <div><span className='text-text-brand-muted'>Asking Price:</span> <span className='font-medium font-mono'>{formValues.askingPrice ? `TZS ${Number(formValues.askingPrice).toLocaleString()}` : "—"}</span></div>
                  </div>
                </div>

                {photos.length > 0 && (
                  <>
                    <hr className='border-[var(--border-default)]' />
                    <div>
                      <h3 className='text-sm font-semibold text-text-brand-muted uppercase tracking-wider mb-3'>
                        Photos ({photos.length})
                      </h3>
                      <div className='flex gap-2 overflow-x-auto'>
                        {photos.map((photo, i) => (
                          <img key={i} src={photo} alt={`Photo ${i + 1}`} className='w-16 h-16 object-cover rounded-lg' />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className='flex items-center justify-between mt-8'>
            <button
              type='button'
              onClick={prevStep}
              className={`px-6 py-3 rounded-xl border border-[var(--border-default)] font-medium text-text-brand-secondary hover:bg-surface-muted transition-colors ${
                currentStep === 0 ? "invisible" : ""
              }`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type='button'
                onClick={nextStep}
                className='px-8 py-3 rounded-xl bg-brand-accent text-white font-semibold hover:bg-blue-700 transition-colors'
              >
                Next Step
              </button>
            ) : (
              <button
                type='submit'
                className='px-8 py-3 rounded-xl bg-status-success text-white font-semibold hover:opacity-90 transition-opacity'
              >
                Submit Request
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
