import React from 'react';

const Button = ({ onClick, children, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-[#8bac0f]
        text-[#0f380f]
        font-bold
        py-2
        px-4
        rounded-lg
        shadow-lg
        transition
        duration-200
        ease-in-out
        transform
        hover:scale-105
        active:scale-95
        border-2
        border-[#306230]
        focus:outline-none
        focus:ring-2
        focus:ring-[#0f380f]
        focus:ring-opacity-50
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 bg-[rgb(217,238,113)] rounded-lg transform scale-0 transition-transform duration-200 ease-out group-hover:scale-100"></span>
    </button>
  );
};

export default Button;