import React from "react";
import clsx from "clsx";

const Select = React.forwardRef(
  (
    {
      options,
      placeholder,
      label,
      className,
      register,
      name,
      error,
      disabled,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const extra = rest.onChange ? rest : register;
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800 text-xs lg:text-sm">
            {label}
          </label>
        )}

        <div>
          <select
            defaultValue={defaultValue ?? 0}
            name={name}
            disabled={disabled}
            ref={ref}
            {...extra}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "text-xs lg:text-sm px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 font-bold outline-none focus:ring-2 ring-blue-300",
              className,
              {
                "bg-[whitesmoke] cursor-not-allowed": disabled,
                "bg-transparent": !disabled,
              }
            )}
          >
            {placeholder && <option value={0}>{placeholder}</option>}
            {options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

export default Select;
