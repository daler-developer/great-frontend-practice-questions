import clsx from "clsx";
import { forwardRef } from "react";

const DigitInput = forwardRef(({ value, onChange, onKeyDown, onPaste }, ref) => {
  return (
    <input
      ref={ref}
      className={clsx(
        "text-center text-[25px] flex items-center justify-center w-[50px] h-[50px] ring-0 focus:border-2 focus:border-black bg-gray-200",
      )}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
    />
  );
});

export default DigitInput;
