import clsx from "clsx";

const LetterBox = ({ children }) => {
  return (
    <div className={clsx("w-[100px] h-[100px] flex items-center justify-center text-[30px] font-medium")}>
      {children}
    </div>
  );
};

export default LetterBox;
