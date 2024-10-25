import React from 'react';
import { CircleX } from 'lucide-react';

export const Dialog = ({ open, children, onOpenChange }) => {
  return (
    open ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 px-4 py-6">
        <div className="bg-[#8bac0f] border-4 border-[#0f380f] rounded-lg shadow-lg p-6 relative w-full max-w-sm">
          <div className="bg-[#9bbc0f] border-2 border-[#306230] rounded-md p-4 mb-4">
            <div className="bg-[#0f380f] rounded p-3">
              {children}
            </div>
          </div>
          <button 
            onClick={onOpenChange} 
            className="absolute top-2 right-2 bg-[#8bac0f] border-2 border-[#306230] rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-[#0f380f] transition-colors duration-200 hover:bg-[#9bbc0f]" 
            aria-label="Close dialog"
          >
            <CircleX className='w-6 h-6 text-[#0f380f]' />
          </button>
          <div className="flex justify-center space-x-4">
            <button className="w-3 h-8 bg-[#0f380f] rounded-full"></button>
            <button className="w-3 h-8 bg-[#0f380f] rounded-full"></button>
          </div>
        </div>
      </div>
    ) : null
  );
};