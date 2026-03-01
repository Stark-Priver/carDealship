import { MouseEventHandler } from "react";

// Legacy CarHub types
export interface CarProps {
  city_mpg: number;
  class: string;
  combination_mpg: number;
  cylinders: number;
  displacement: number;
  drive: string;
  fuel_type: string;
  highway_mpg: number;
  make: string;
  model: string;
  transmission: string;
  year: number;
}

export interface FilterProps {
  manufacturer?: string;
  year?: number;
  model?: string;
  limit?: number;
  fuel?: string;
}

export interface HomeProps {
  searchParams: FilterProps;
}

export interface CarCardProps {
  model: string;
  make: string;
  mpg: number;
  transmission: string;
  year: number;
  drive: string;
  cityMPG: number;
}

export interface CustomButtonProps {
  isDisabled?: boolean;
  btnType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
  title: string;
  rightIcon?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface OptionProps {
  title: string;
  value: string;
}

export interface CustomFilterProps {
  title: string;
  options: OptionProps[];
}

export interface ShowMoreProps {
  pageNumber: number;
  isNext: boolean;
}

export interface SearchManuFacturerProps {
  manufacturer: string;
  setManuFacturer: (manufacturer: string) => void;
}

// Bingwa Magari types
export type VehicleStatus = "AVAILABLE" | "RESERVED" | "SOLD";

export interface VehicleCardProps {
  id: string;
  stockNumber: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  status: VehicleStatus;
  primaryImage: string;
  branch: string;
  isFeatured?: boolean;
}

export interface VehicleDetailProps extends VehicleCardProps {
  color?: string;
  engineSize?: string;
  bodyType?: string;
  importCountry?: string;
  previousOwners?: number;
  accidentHistory?: boolean;
  serviceHistory?: boolean;
  description?: string;
  descriptionSw?: string;
  images?: string[];
}

export interface BranchProps {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
}

export interface InquiryProps {
  id: string;
  customerName: string;
  phone: string;
  vehicleName: string;
  vehicleId: string;
  status: "NEW" | "CONTACTED" | "NEGOTIATING" | "CLOSED_WON" | "CLOSED_LOST";
  date: string;
  agent: string;
}

export interface SellRequestProps {
  id: string;
  sellerName: string;
  phone: string;
  make: string;
  model: string;
  year: number;
  askingPrice: number;
  status: "PENDING" | "INSPECTION_ASSIGNED" | "INSPECTED" | "APPROVED" | "REJECTED";
  date: string;
}

export interface InspectionRating {
  engine: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  transmission: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  suspension: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  chassis: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  interior: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  exterior: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  electrical: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
}

export interface SellCarFormData {
  // Step 1
  fullName: string;
  phoneNumber: string;
  email?: string;
  // Step 2
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  color: string;
  askingPrice: number;
  condition: "Excellent" | "Good" | "Fair" | "Poor";
  description: string;
}
