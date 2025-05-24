import clsx from "clsx";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

const Cell = forwardRef((_, ref) => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  const rootEl = useRef(null);

  useImperativeHandle(ref, () => ({
    highlight() {
      setIsHighlighted(true);
    },
    reset() {
      setIsHighlighted(false);
    },
    getBoundingClientRect() {
      return rootEl.current.getBoundingClientRect();
    },
  }));

  return (
    <div
      ref={rootEl}
      className={clsx("border-black border-1", {
        "bg-purple-100": isHighlighted,
      })}
    />
  );
});

export default Cell;
