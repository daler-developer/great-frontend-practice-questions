import clsx from "clsx";

const BaseButton = ({ children, className, ...rest }) => {
  return (
    <button
      type="button"
      className={clsx(
        "cursor-pointer rounded-full w-[50px] h-[50px] bg-[rgba(0,0,0,0.3)] text-white hover:bg-[rgba(0,0,0,1)]",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default BaseButton;
