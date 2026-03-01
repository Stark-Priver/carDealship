"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { formatTZS, calculateInstallment } from "@utils";

interface InstallmentCalculatorProps {
  price: number;
}

const InstallmentCalculator = ({ price }: InstallmentCalculatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [months, setMonths] = useState(36);

  const { downPayment, monthlyPayment, totalCost } = calculateInstallment(
    price,
    downPaymentPercent,
    months
  );

  return (
    <div className='border border-[var(--border-default)] rounded-xl overflow-hidden'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex items-center justify-between p-4 bg-surface-muted hover:bg-gray-100 transition-colors'
        aria-label='Toggle installment calculator'
      >
        <span className='font-semibold text-sm'>Installment Calculator</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className='p-5 space-y-5'>
          {/* Down Payment Slider */}
          <div>
            <div className='flex justify-between text-sm mb-2'>
              <label className='text-text-brand-secondary font-medium'>
                Down Payment
              </label>
              <span className='font-mono text-brand-accent font-semibold'>
                {downPaymentPercent}%
              </span>
            </div>
            <input
              type='range'
              min={10}
              max={50}
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className='w-full accent-brand-accent'
              aria-label='Down payment percentage'
            />
            <div className='flex justify-between text-xs text-text-brand-muted mt-1'>
              <span>10%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Loan Duration */}
          <div>
            <label className='text-sm text-text-brand-secondary font-medium block mb-2'>
              Loan Duration
            </label>
            <div className='flex gap-2 flex-wrap'>
              {[12, 24, 36, 48, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => setMonths(m)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    months === m
                      ? "bg-brand-accent text-white"
                      : "bg-surface-muted text-text-brand-secondary hover:bg-gray-200"
                  }`}
                  aria-label={`${m} months`}
                >
                  {m}mo
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className='bg-surface-muted rounded-xl p-4 space-y-3'>
            <div className='flex justify-between text-sm'>
              <span className='text-text-brand-muted'>Down Payment</span>
              <span className='font-mono font-semibold'>{formatTZS(Math.round(downPayment))}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-text-brand-muted'>Monthly Payment</span>
              <span className='font-mono font-semibold text-brand-accent'>
                {formatTZS(Math.round(monthlyPayment))}
              </span>
            </div>
            <div className='flex justify-between text-sm border-t border-[var(--border-default)] pt-3'>
              <span className='text-text-brand-muted'>Total Cost</span>
              <span className='font-mono font-semibold'>{formatTZS(Math.round(totalCost))}</span>
            </div>
            <p className='text-xs text-text-brand-muted'>
              * Based on 18% annual interest rate. Actual rates may vary.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstallmentCalculator;
