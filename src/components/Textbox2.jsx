import React, { useEffect } from 'react';
import clsx from 'clsx';

const Textbox2 = React.forwardRef(
  ({ type, placeholder, label, className, name, error, disabled, onChange, required, value }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800 text-xs lg:text-sm">
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            step={0.01}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref}
            onChange={onChange}
            required={required}
            value={value}
            aria-invalid={error ? 'true' : 'false'}
            className={clsx(
              'text-xs lg:text-sm px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-bold outline-none focus:ring-2 ring-blue-300',
              className,
              {
                'bg-[whitesmoke] cursor-not-allowed': disabled,
                'bg-transparent': !disabled,
              },
            )}
          />
        </div>
        {error && <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>}
      </div>
    );
  },
);
export default Textbox2;
