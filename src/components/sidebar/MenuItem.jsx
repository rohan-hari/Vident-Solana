import React from 'react';

export default function MenuItem({ text, icon, className, action }) {
  return (
    <div
      className={
        'text-white text-sm cursor-pointer h-10 flex items-center px-4 py-[24px] mb-[10px] rounded-full ' +
        className
      }
      onClick={action}
    >
      <span className="text-xl mr-5">{icon}</span>
      {text}
    </div>
  );
}
