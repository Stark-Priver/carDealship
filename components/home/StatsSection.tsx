"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 1200, label: "Cars Sold", suffix: "+" },
  { value: 4500, label: "Happy Clients", suffix: "+" },
  { value: 4, label: "Branches", suffix: "" },
  { value: 10, label: "Years", suffix: "+" },
];

function useCountUp(target: number, isVisible: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return count;
}

const StatsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className='bg-surface-dark py-16 px-6 sm:px-16'>
      <div className='max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8'>
        {stats.map((stat) => {
          const count = useCountUp(stat.value, isVisible);
          return (
            <div key={stat.label} className='text-center'>
              <p className='text-4xl md:text-5xl font-bold text-white font-mono'>
                {count.toLocaleString()}{stat.suffix}
              </p>
              <p className='text-gray-400 mt-2 text-sm'>{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsSection;
