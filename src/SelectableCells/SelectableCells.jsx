import { Fragment, useEffect, useRef, useState } from "react";
import Cell from "./Cell.jsx";
import SelectedBox from "./SelectedBox.jsx";

const ROWS = 10;
const COLS = 10;

const calcSelectedBoxRect = (start, end) => {
  const left = Math.min(start[0], end[0]);
  const right = Math.max(start[0], end[0]);
  const top = Math.min(start[1], end[1]);
  const bottom = Math.max(start[1], end[1]);

  return {
    left,
    right,
    top,
    bottom,
  };
};

const SelectableCells = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPosition, setDragStartPosition] = useState([-1, -1]);
  const [dragCurrentPosition, setDragCurrentPosition] = useState([-1, -1]);

  const cells = useRef(new Array(ROWS * COLS).fill(null));

  const isMouseMovedAfterMouseDown = !(
    dragStartPosition[0] === dragCurrentPosition[0] && dragStartPosition[1] === dragCurrentPosition[1]
  );

  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStartPosition([e.clientX, e.clientY]);
      setDragCurrentPosition([e.clientX, e.clientY]);
      cells.current.forEach((cell) => {
        cell.reset();
      });
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        setDragCurrentPosition([e.clientX, e.clientY]);

        const rect = calcSelectedBoxRect(dragStartPosition, [e.clientX, e.clientY]);

        cells.current.forEach((cell) => {
          const cellRect = cell.getBoundingClientRect();
          const isOverlapping = !(
            rect.right < cellRect.left ||
            rect.left > cellRect.right ||
            rect.bottom < cellRect.top ||
            rect.top > cellRect.bottom
          );

          if (isOverlapping) {
            cell.highlight();
          } else {
            cell.reset();
          }
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragStartPosition([-1, -1]);
      setDragCurrentPosition([-1, -1]);
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, dragStartPosition, dragCurrentPosition]);

  const calcSelectedBoxLeft = () => {
    return Math.min(dragStartPosition[0], dragCurrentPosition[0]);
  };

  const calcSelectedBoxTop = () => {
    return Math.min(dragStartPosition[1], dragCurrentPosition[1]);
  };

  const calcSelectedBoxWidth = () => {
    return Math.abs(dragStartPosition[0] - dragCurrentPosition[0]);
  };

  const calcSelectedBoxHeight = () => {
    return Math.abs(dragStartPosition[1] - dragCurrentPosition[1]);
  };

  return (
    <>
      <div className="border-1 border-black w-[600px] h-[600px] grid grid-cols-10 grid-rows-10">
        {new Array(ROWS * COLS).fill(null).map((_, index) => (
          <Cell
            key={index}
            ref={(el) => {
              cells.current[index] = el;
            }}
          />
        ))}
      </div>

      {isDragging && isMouseMovedAfterMouseDown && (
        <SelectedBox
          left={calcSelectedBoxLeft()}
          top={calcSelectedBoxTop()}
          width={calcSelectedBoxWidth()}
          height={calcSelectedBoxHeight()}
        />
      )}
    </>
  );
};

export default SelectableCells;
