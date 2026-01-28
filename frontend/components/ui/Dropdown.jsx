"use client";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";

export default function Dropdown({ dropdownName, label, options, direction }) {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize with the default label prop
  const [selectedLabel, setSelectedLabel] = useState(label);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 cursor-pointer select-none text-gray-700 hover:text-gray-900 transition-colors group"
      >
        {/* The dynamic label */}
        <span className="font-medium text-sm">{`${dropdownName || ""} ${selectedLabel}`}</span>

        {/* The arrow icon */}
        <span
          className={`text-[10px] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } group-hover:translate-y-0.5`}
        >
          ▼
        </span>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${direction}-0 mt-2 w-48 origin-top-right bg-white rounded-xl shadow-2xl border border-gray-100 z-[100] animate-in fade-in zoom-in duration-150`}
        >
          <div className="py-2">
            {options.map((opt, index) => (
              <button
                key={index}
                onClick={() => {
                  opt.onClick();
                  // Update the state to the newly selected label
                  setSelectedLabel(opt.label);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                  selectedLabel === opt.label
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt.icon && <span>{opt.icon}</span>}
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
