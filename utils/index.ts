import { CarProps, FilterProps } from "@types";

// Format TZS currency
export function formatTZS(amount: number): string {
  return `TZS ${amount.toLocaleString('en-TZ')}`;
}

// Format mileage
export function formatMileage(km: number): string {
  return `${km.toLocaleString()} km`;
}

// Format stock number
export function formatStock(stock: string): string {
  return `#${stock}`;
}

// Get status color classes
export function statusColor(status: string): string {
  const map: Record<string, string> = {
    AVAILABLE: 'bg-green-100 text-green-800',
    RESERVED: 'bg-amber-100 text-amber-800',
    SOLD: 'bg-red-100 text-red-800',
  };
  return map[status] ?? 'bg-gray-100 text-gray-800';
}

// Get status dot color
export function statusDotColor(status: string): string {
  const map: Record<string, string> = {
    AVAILABLE: 'bg-green-500',
    RESERVED: 'bg-amber-500',
    SOLD: 'bg-red-500',
  };
  return map[status] ?? 'bg-gray-500';
}

// Get status label
export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    AVAILABLE: 'Available',
    RESERVED: 'Reserved',
    SOLD: 'Sold',
  };
  return map[status] ?? status;
}

// CN utility for conditional classnames
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Calculate monthly installment
export function calculateInstallment(
  price: number,
  downPaymentPercent: number,
  months: number,
  annualRate: number = 18
): { downPayment: number; monthlyPayment: number; totalCost: number } {
  const downPayment = price * (downPaymentPercent / 100);
  const principal = price - downPayment;
  const monthlyRate = annualRate / 100 / 12;
  const monthlyPayment =
    principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  const totalCost = downPayment + monthlyPayment * months;
  return { downPayment, monthlyPayment, totalCost };
}

// Legacy utilities kept for compatibility
export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;
  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  const newSearchParams = new URLSearchParams(window.location.search);
  newSearchParams.delete(type.toLocaleLowerCase());
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;
  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;
  const headers: HeadersInit = {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    { headers }
  );
  const result = await response.json();
  return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;
  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || '');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  url.searchParams.append('angle', `${angle}`);
  return `${url}`;
};
