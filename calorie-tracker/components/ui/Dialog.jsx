import React from 'react';

export const Dialog = ({ open, children, onOpenChange }) => {
  return (
    open ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded shadow-lg p-6">
          <button onClick={onOpenChange} className="text-red-500">Close</button>
          {children}
        </div>
      </div>
    ) : null
  );
};
