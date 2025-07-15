import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = React.forwardRef(({ 
  className, 
  checked, 
  onChange,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
        {...props}
      />
      <div
        className={cn(
          "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 cursor-pointer checkbox-scale",
          checked
            ? "bg-primary border-primary text-white"
            : "border-gray-300 bg-white hover:border-primary",
          className
        )}
        onClick={() => onChange?.({ target: { checked: !checked } })}
      >
        {checked && (
          <ApperIcon name="Check" size={12} className="text-white" />
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;