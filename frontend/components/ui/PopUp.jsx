import React from 'react'
import Button from './Button';

export default function PopUp({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* 1. Added 'gap-4' to space out the title, content, and button evenly */}
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full flex flex-col gap-3">
        
        {/* Title */}
        {title && (
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
        )}

        {/* 2. Content Area (where your Input and Save button live) */}
        <div className="flex flex-col gap-4">
          {children}
        </div>

        {/* 3. The Close Button */}
        <Button 
          color="red" 
          onClick={onClose} 
          className="w-full"
        >
          Close
        </Button>
      </div>
    </div>
  );
}