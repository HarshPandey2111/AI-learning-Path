import React from 'react';
import type { ActionStatus } from '../lib/types';

interface ActionButtonProps {
  onClick: () => void;
  status?: ActionStatus;
  defaultText: string;
  loadingText: string;
  className?: string;
}

export function ActionButton({ 
  onClick, 
  status = { loading: false, error: null, success: false }, 
  defaultText,
  loadingText,
  className = ''
}: ActionButtonProps) {
  const isDisabled = status.loading;
  const buttonText = status.loading ? loadingText : defaultText;
  
  const baseClasses = 'transition-colors rounded-md';
  const stateClasses = status.loading 
    ? 'cursor-not-allowed opacity-70'
    : 'hover:bg-opacity-90';

  return (
    <div className="relative">
      <button 
        onClick={onClick}
        disabled={isDisabled}
        className={`${baseClasses} ${stateClasses} ${className}`}
      >
        {buttonText}
      </button>
      {status.error && (
        <div className="absolute top-full left-0 mt-1 text-sm text-red-600">
          {status.error}
        </div>
      )}
      {status.success && (
        <div className="absolute top-full left-0 mt-1 text-sm text-green-600">
          Success!
        </div>
      )}
    </div>
  );
}