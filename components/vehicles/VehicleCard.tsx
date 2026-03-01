"use client";

import Image from "next/image";
import Link from "next/link";
import { Fuel, Gauge, Settings2 } from "lucide-react";

import { VehicleCardProps } from "@types";
import { formatTZS, formatMileage, statusColor, statusDotColor, statusLabel } from "@utils";

const VehicleCard = ({
  id,
  stockNumber,
  make,
  model,
  year,
  price,
  mileage,
  fuelType,
  transmission,
  status,
  primaryImage,
  branch,
  isFeatured,
}: VehicleCardProps) => {
  return (
    <div className='vehicle-card'>
      {/* Image */}
      <div className='vehicle-card__image-container'>
        <Image
          src={primaryImage}
          alt={`${year} ${make} ${model}`}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />
        {isFeatured && (
          <span className='vehicle-card__badge-featured'>Featured</span>
        )}
        <span className={`vehicle-card__badge-status ${statusColor(status)}`}>
          <span className={`w-2 h-2 rounded-full ${statusDotColor(status)}`} />
          {statusLabel(status)}
        </span>
      </div>

      {/* Body */}
      <div className='vehicle-card__body'>
        <h3 className='vehicle-card__title'>
          {year} {make} {model}
        </h3>
        <p className='vehicle-card__price'>{formatTZS(price)}</p>

        {/* Specs Row */}
        <div className='vehicle-card__specs'>
          <span className='flex items-center gap-1'>
            <Gauge size={15} />
            {formatMileage(mileage)}
          </span>
          <span className='flex items-center gap-1'>
            <Fuel size={15} />
            {fuelType}
          </span>
          <span className='flex items-center gap-1'>
            <Settings2 size={15} />
            {transmission}
          </span>
        </div>

        {/* Footer */}
        <div className='vehicle-card__footer'>
          <span className='text-xs text-text-brand-muted bg-surface-muted px-2 py-1 rounded'>
            {branch}
          </span>
          <Link
            href={`/vehicles/${id}`}
            className='text-sm font-semibold text-brand-accent hover:underline'
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
