import clsx from "clsx";

const Pages = ({ count, selected, onSelect, disabled }) => {
  return (
    <div
      className={clsx(
        "absolute flex items-center gap-[5px] left-[50%] bottom-[20px] -translate-x-[50%] bg-[rgba(0,0,0,0.2)] rounded-full p-[5px]",
      )}
    >
      {new Array(count).fill(0).map((_, i) => (
        <button
          key={i}
          disabled={disabled}
          type="button"
          className={clsx("w-[10px] h-[10px] rounded-full  cursor-pointer", {
            "bg-gray-500": selected !== i + 1,
            "bg-white": selected === i + 1,
          })}
          onClick={() => onSelect(i + 1)}
        />
      ))}
    </div>
  );
};

export default Pages;
