"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { popularMakes } from "@constants";

const SearchBar = () => {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [branch, setBranch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (year) params.set("year", year);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (branch) params.set("branch", branch);
    router.push(`/vehicles?${params.toString()}`);
  };

  const handleQuickTag = (tag: string) => {
    router.push(`/vehicles?make=${encodeURIComponent(tag)}`);
  };

  return (
    <div className='search-section'>
      <div className='search-card'>
        <form onSubmit={handleSearch}>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4'>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className='form-select'
              aria-label='Select make'
            >
              <option value=''>Make</option>
              {["Toyota", "Nissan", "Honda", "Suzuki", "Mercedes-Benz", "BMW", "Hyundai", "Mitsubishi"].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            <input
              type='text'
              placeholder='Model'
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className='form-input'
              aria-label='Enter model'
            />

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className='form-select'
              aria-label='Select year'
            >
              <option value=''>Year</option>
              {Array.from({ length: 12 }, (_, i) => 2026 - i).map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <input
              type='number'
              placeholder='Max Price (TZS)'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className='form-input'
              aria-label='Maximum price'
            />

            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className='form-select'
              aria-label='Select branch'
            >
              <option value=''>Branch</option>
              <option value='Dar es Salaam'>Dar es Salaam</option>
              <option value='Mwanza'>Mwanza</option>
              <option value='Arusha'>Arusha</option>
              <option value='Dodoma'>Dodoma</option>
            </select>

            <button
              type='submit'
              className='flex items-center justify-center gap-2 bg-brand-accent text-white rounded-lg py-2.5 px-6 font-semibold hover:bg-brand-accent-hover transition-colors'
              aria-label='Search vehicles'
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </form>

        {/* Quick Tags */}
        <div className='quick-tags'>
          {popularMakes.map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTag(tag)}
              className='quick-tag'
              aria-label={`Search for ${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
