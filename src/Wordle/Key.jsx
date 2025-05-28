import clsx from "clsx";

const Key = ({ children, color, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "h-[60px] px-[10px] font-medium flex items-center justify-center cursor-pointer rounded-sm",
        color,
        {
          "bg-gray-300 text-black": color === "default",
          "bg-gray-600 text-white": color === "gray",
          "bg-yellow-700 text-white": color === "yellow",
          "bg-green-900 text-white": color === "green",
        },
      )}
    >
      {children}
    </div>
  );
};

export default Key;
