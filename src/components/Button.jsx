import clsx from 'clsx';
import React from 'react';

const Button = ({ disabled = false, icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || 'button'}
      disabled={disabled}
      className={clsx(
        'px-4 py-1 rounded-full text-sm font-semibold outline-none sm:w-auto',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      <span>{label}</span>
      {icon && icon}
    </button>
  );
};

export default Button;
