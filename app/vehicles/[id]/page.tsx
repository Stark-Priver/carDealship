"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Fuel, Gauge, Settings2, MapPin, Phone, Car, Palette, Globe, Users, AlertTriangle, Wrench } from "lucide-react";

import { mockVehicles, mockBranches } from "@lib/mockData";
import { formatTZS, formatMileage, formatStock } from "@utils";
import VehicleStatusBadge from "@components/vehicles/VehicleStatusBadge";
import WhatsAppButton from "@components/vehicles/WhatsAppButton";
import InstallmentCalculator from "@components/vehicles/InstallmentCalculator";
import VehicleCard from "@components/vehicles/VehicleCard";

// Mock extended detail for first vehicle
const mockDetails = {
  color: "Pearl White",
  engineSize: "2.8L Turbo Diesel",
  bodyType: "SUV",
  importCountry: "Japan",
  previousOwners: 1,
  accidentHistory: false,
  serviceHistory: true,
  description:
    "This 2021 Toyota Land Cruiser Prado is in excellent condition. It features a powerful 2.8L turbo diesel engine, automatic transmission, and comes fully loaded with modern amenities. The vehicle was imported directly from Japan with full service records.",
  descriptionSw:
    "Toyota Land Cruiser Prado ya 2021 hii iko katika hali nzuri sana. Ina injini ya diesel turbo 2.8L yenye nguvu, gear otomatiki, na inakuja na vifaa vyote vya kisasa. Gari iliagizwa kutoka Japan moja kwa moja na ina rekodi kamili za huduma.",
  images: ["/hero.png", "/hero.png", "/hero.png", "/hero.png"],
};

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const vehicle = mockVehicles.find((v) => v.id === params.id) || mockVehicles[0];
  const branch = mockBranches.find((b) => b.name === vehicle.branch) || mockBranches[0];
  const similarVehicles = mockVehicles.filter((v) => v.id !== vehicle.id && v.status !== "SOLD").slice(0, 3);

  const [selectedImage, setSelectedImage] = useState(0);
  const [lang, setLang] = useState<"EN" | "SW">("EN");

  const images = mockDetails.images;

  const specs = [
    { icon: Calendar, label: "Year", value: vehicle.year },
    { icon: Car, label: "Make", value: vehicle.make },
    { icon: Car, label: "Model", value: vehicle.model },
    { icon: Gauge, label: "Mileage", value: formatMileage(vehicle.mileage) },
    { icon: Fuel, label: "Fuel", value: vehicle.fuelType },
    { icon: Settings2, label: "Transmission", value: vehicle.transmission },
    { icon: Palette, label: "Color", value: mockDetails.color },
    { icon: Settings2, label: "Engine", value: mockDetails.engineSize },
    { icon: Car, label: "Body Type", value: mockDetails.bodyType },
    { icon: Globe, label: "Import Country", value: mockDetails.importCountry },
    { icon: Users, label: "Previous Owners", value: mockDetails.previousOwners },
    { icon: AlertTriangle, label: "Accident History", value: mockDetails.accidentHistory ? "Yes" : "No" },
    { icon: Wrench, label: "Service History", value: mockDetails.serviceHistory ? "Available" : "N/A" },
  ];

  return (
    <main className='pt-[68px] min-h-screen bg-surface-base'>
      <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-8'>
        {/* Back Link */}
        <Link
          href='/vehicles'
          className='inline-flex items-center gap-2 text-sm text-text-brand-muted hover:text-brand-accent mb-6 transition-colors'
        >
          <ArrowLeft size={16} />
          Back to Vehicles
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8'>
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-surface-muted shadow-sm'>
              <Image
                src={images[selectedImage]}
                alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                fill
                className='object-contain'
                priority
              />
              <div className='absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-mono'>
                {selectedImage + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div className='flex gap-3 mt-4 overflow-x-auto pb-2'>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                    selectedImage === i ? "border-brand-accent" : "border-transparent"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt={`Thumbnail ${i + 1}`} fill className='object-cover' />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Stock & Status */}
            <div className='flex items-center gap-3 mb-3'>
              <span className='text-xs font-mono bg-surface-muted px-2 py-1 rounded text-text-brand-muted'>
                {formatStock(vehicle.stockNumber)}
              </span>
              <VehicleStatusBadge status={vehicle.status} />
            </div>

            {/* Title */}
            <h1 className='font-display text-2xl md:text-3xl font-bold text-text-brand-primary mb-2'>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>

            {/* Price */}
            <p className='text-2xl md:text-3xl font-bold font-mono text-brand-accent mb-6'>
              {formatTZS(vehicle.price)}
            </p>

            {/* WhatsApp Button */}
            <WhatsAppButton
              vehicleId={vehicle.id}
              stockNumber={vehicle.stockNumber}
              make={vehicle.make}
              model={vehicle.model}
              year={vehicle.year}
            />

            {/* Test Drive Button */}
            <button className='w-full mt-3 py-3 px-6 rounded-xl border-2 border-brand-accent text-brand-accent font-semibold hover:bg-brand-accent hover:text-white transition-colors'>
              Book a Test Drive
            </button>

            <hr className='my-6 border-[var(--border-default)]' />

            {/* Quick Specs Grid */}
            <div className='grid grid-cols-2 gap-3'>
              {specs.map((spec) => (
                <div key={spec.label} className='flex items-center gap-2 text-sm py-2'>
                  <spec.icon size={16} className='text-text-brand-muted flex-shrink-0' />
                  <span className='text-text-brand-muted'>{spec.label}:</span>
                  <span className='font-medium text-text-brand-primary'>{spec.value}</span>
                </div>
              ))}
            </div>

            <hr className='my-6 border-[var(--border-default)]' />

            {/* Installment Calculator */}
            <InstallmentCalculator price={vehicle.price} />

            {/* Branch Info */}
            <div className='mt-6 bg-surface-muted rounded-xl p-4'>
              <h4 className='font-semibold text-sm mb-2'>Branch</h4>
              <div className='flex items-start gap-3'>
                <MapPin size={16} className='text-brand-accent mt-0.5 flex-shrink-0' />
                <div>
                  <p className='text-sm font-medium'>{branch.name}</p>
                  <p className='text-xs text-text-brand-muted'>{branch.address}</p>
                  <div className='flex items-center gap-1 mt-1 text-xs text-text-brand-muted'>
                    <Phone size={12} />
                    {branch.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className='mt-12'>
          <div className='flex items-center gap-4 mb-4'>
            <h2 className='section-heading text-2xl'>Description</h2>
            <div className='flex rounded-lg overflow-hidden border border-[var(--border-default)]'>
              <button
                onClick={() => setLang("EN")}
                className={`px-4 py-1.5 text-sm font-medium ${
                  lang === "EN" ? "bg-brand-accent text-white" : "text-text-brand-secondary"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("SW")}
                className={`px-4 py-1.5 text-sm font-medium ${
                  lang === "SW" ? "bg-brand-accent text-white" : "text-text-brand-secondary"
                }`}
              >
                SW
              </button>
            </div>
          </div>
          <p className='text-text-brand-secondary leading-relaxed'>
            {lang === "EN" ? mockDetails.description : mockDetails.descriptionSw}
          </p>
        </div>

        {/* Similar Vehicles */}
        {similarVehicles.length > 0 && (
          <div className='mt-16'>
            <h2 className='section-heading text-2xl mb-6'>Similar Vehicles</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              {similarVehicles.map((v) => (
                <VehicleCard key={v.id} {...v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
