import clsx from "clsx";

const ProgressBar = ({ progress }) => {
  return (
    <div className={clsx("h-[20px] bg-gray-300")}>
      <div className={clsx("h-full bg-green-700")} style={{ width: progress + "%" }} />
    </div>
  );
};

export default ProgressBar;
