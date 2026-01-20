'use client';
import { useState, useRef, useEffect } from 'react';
import Button from './Button';

export default function Dropdown({ label, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <Button 
        color="blue" 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        {label}
        <span className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] animate-in fade-in zoom-in duration-150">
          <div className="py-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  option.onClick();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors flex items-center gap-2"
              >
                {option.icon && <span>{option.icon}</span>}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}