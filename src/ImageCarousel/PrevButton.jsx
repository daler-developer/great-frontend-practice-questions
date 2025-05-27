import BaseButton from "./BaseButton.jsx";
import clsx from "clsx";

const PrevButton = ({ onClick, disabled }) => {
  return (
    <BaseButton
      className={clsx("absolute top-[50%] left-[10px] -translate-y-[50%]")}
      disabled={disabled}
      onClick={onClick}
    >
      &#10094;
    </BaseButton>
  );
};

export default PrevButton;
