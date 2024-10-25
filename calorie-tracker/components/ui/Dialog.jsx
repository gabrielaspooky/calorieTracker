import React from 'react';
import { CircleX } from 'lucide-react';

export const Dialog = ({ open, children, onOpenChange }) => {
  return (
    open ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded shadow-lg p-6 relative">
          <button 
            onClick={onOpenChange} 
            className="absolute top-2 left-2 text-red-500 focus:outline-none" 
            aria-label="Close dialog"
          >
            <CircleX className='w-5 h-5' />
          </button>
          {children}
        </div>
      </div>
    ) : null
  );
};
