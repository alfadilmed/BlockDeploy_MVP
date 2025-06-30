import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

export default function Card({ title, children, className = '', footer }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden ${className}`}>
      {title && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-6 text-gray-700 dark:text-gray-300">
        {children}
      </div>
      {footer && (
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
}
