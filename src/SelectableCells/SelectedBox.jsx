import clsx from "clsx";

const SelectedBox = ({ width, height, top, left }) => {
  return (
    <div
      className={clsx("border-2 border-dashed fixed")}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`,
      }}
    />
  );
};

export default SelectedBox;
