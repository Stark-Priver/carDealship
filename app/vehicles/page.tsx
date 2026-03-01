"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react";

import { mockVehicles } from "@lib/mockData";
import VehicleCard from "@components/vehicles/VehicleCard";

const makes = ["Toyota", "Nissan", "Honda", "Suzuki", "Mercedes-Benz", "BMW"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const transmissions = ["Automatic", "Manual"];
const bodyTypes = ["Sedan", "SUV", "Pickup", "Van", "Hatchback"];
const branches = ["Dar es Salaam", "Mwanza", "Arusha", "Dodoma"];
const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function VehiclesPage() {
  const [search, setSearch] = useState("");
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedFuels, setSelectedFuels] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [sort, setSort] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (
    arr: string[],
    setArr: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedMakes([]);
    setSelectedFuels([]);
    setSelectedTransmissions([]);
    setSelectedBranches([]);
  };

  const filtered = useMemo(() => {
    let result = [...mockVehicles];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.stockNumber.toLowerCase().includes(q)
      );
    }

    if (selectedMakes.length)
      result = result.filter((v) => selectedMakes.includes(v.make));
    if (selectedFuels.length)
      result = result.filter((v) => selectedFuels.includes(v.fuelType));
    if (selectedTransmissions.length)
      result = result.filter((v) => selectedTransmissions.includes(v.transmission));
    if (selectedBranches.length)
      result = result.filter((v) => selectedBranches.includes(v.branch));

    // Sort
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.year - a.year);

    return result;
  }, [search, selectedMakes, selectedFuels, selectedTransmissions, selectedBranches, sort]);

  const hasFilters =
    selectedMakes.length > 0 ||
    selectedFuels.length > 0 ||
    selectedTransmissions.length > 0 ||
    selectedBranches.length > 0 ||
    search.length > 0;

  const FilterCheckboxGroup = ({
    title,
    options,
    selected,
    setSelected,
  }: {
    title: string;
    options: string[];
    selected: string[];
    setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  }) => (
    <div className='filter-sidebar__section'>
      <h4 className='filter-sidebar__title'>{title}</h4>
      <div className='space-y-2'>
        {options.map((opt) => (
          <label key={opt} className='flex items-center gap-2 cursor-pointer text-sm text-text-brand-secondary'>
            <input
              type='checkbox'
              checked={selected.includes(opt)}
              onChange={() => toggleFilter(selected, setSelected, opt)}
              className='rounded border-gray-300 text-brand-accent focus:ring-brand-accent'
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <main className='pt-[68px] min-h-screen'>
      <div className='max-w-[1440px] mx-auto px-6 sm:px-16 py-8'>
        <div className='flex gap-8'>
          {/* Sidebar Filters - Desktop */}
          <aside className='hidden lg:block filter-sidebar'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-semibold text-text-brand-primary'>Filters</h3>
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className='text-xs text-brand-accent hover:underline'
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Search */}
            <div className='mb-4'>
              <input
                type='text'
                placeholder='Search by keyword...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='form-input text-sm'
                aria-label='Search vehicles'
              />
            </div>

            <FilterCheckboxGroup title='Make' options={makes} selected={selectedMakes} setSelected={setSelectedMakes} />
            <FilterCheckboxGroup title='Fuel Type' options={fuelTypes} selected={selectedFuels} setSelected={setSelectedFuels} />
            <FilterCheckboxGroup title='Transmission' options={transmissions} selected={selectedTransmissions} setSelected={setSelectedTransmissions} />
            <FilterCheckboxGroup title='Branch' options={branches} selected={selectedBranches} setSelected={setSelectedBranches} />
          </aside>

          {/* Main Content */}
          <div className='flex-1'>
            {/* Top bar */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
              <div className='flex items-center gap-4'>
                <p className='text-sm text-text-brand-muted'>
                  <span className='font-semibold text-text-brand-primary'>{filtered.length}</span> vehicles found
                </p>
                {/* Mobile filter toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className='lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-muted text-sm font-medium'
                  aria-label='Toggle filters'
                >
                  <SlidersHorizontal size={16} />
                  Filters
                </button>
              </div>

              <div className='flex items-center gap-3'>
                {/* Sort */}
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className='form-select text-sm py-2 w-auto'
                  aria-label='Sort vehicles'
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* View Toggle */}
                <div className='hidden sm:flex items-center border border-[var(--border-default)] rounded-lg overflow-hidden'>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-brand-accent text-white" : "text-text-brand-muted"}`}
                    aria-label='Grid view'
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-brand-accent text-white" : "text-text-brand-muted"}`}
                    aria-label='List view'
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className='lg:hidden bg-white rounded-xl p-5 shadow-md border border-[var(--border-default)] mb-6'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-semibold'>Filters</h3>
                  <button onClick={() => setShowFilters(false)} aria-label='Close filters'>
                    <X size={18} />
                  </button>
                </div>
                <input
                  type='text'
                  placeholder='Search...'
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className='form-input text-sm mb-4'
                  aria-label='Search vehicles'
                />
                <FilterCheckboxGroup title='Make' options={makes} selected={selectedMakes} setSelected={setSelectedMakes} />
                <FilterCheckboxGroup title='Fuel Type' options={fuelTypes} selected={selectedFuels} setSelected={setSelectedFuels} />
                <FilterCheckboxGroup title='Transmission' options={transmissions} selected={selectedTransmissions} setSelected={setSelectedTransmissions} />
                <FilterCheckboxGroup title='Branch' options={branches} selected={selectedBranches} setSelected={setSelectedBranches} />
                {hasFilters && (
                  <button onClick={clearFilters} className='w-full mt-4 text-sm text-brand-accent font-medium hover:underline'>
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Vehicle Grid */}
            {filtered.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filtered.map((vehicle) => (
                  <VehicleCard key={vehicle.id} {...vehicle} />
                ))}
              </div>
            ) : (
              <div className='text-center py-20'>
                <h3 className='text-xl font-semibold text-text-brand-primary mb-2'>
                  No vehicles found
                </h3>
                <p className='text-text-brand-muted'>
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
