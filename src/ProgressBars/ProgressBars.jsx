import { useRef, useState } from "react";
import clsx from "clsx";
import ProgressBar from "./ProgressBar.jsx";

const INITIAL_PROGRESS_BARS = [0];

const ProgressBars = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [progressBars, setProgressBars] = useState(INITIAL_PROGRESS_BARS);

  const interval = useRef(null);

  const handleAdd = () => {
    setProgressBars((prev) => {
      return [...prev, 0];
    });
  };

  const handleStart = () => {
    setIsRunning(true);
    interval.current = setInterval(() => {
      setProgressBars((progressBars) => {
        const notFullProgressBars = progressBars
          .map((pb, index) => ({ index, value: pb }))
          .filter((pb) => pb.value <= 100);
        const toBeIncremented = notFullProgressBars.slice(0, 3);
        const copy = [...progressBars];
        for (const { index } of toBeIncremented) {
          copy[index] += 0.5;
        }
        return copy;
      });
    }, 10);
  };

  const handlePause = () => {
    clearInterval(interval.current);
    setIsRunning(false);
  };

  const handleReset = () => {
    clearInterval(interval.current);
    setProgressBars(INITIAL_PROGRESS_BARS);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2">
        <button className="cursor-pointer border" onClick={handleAdd}>
          Add
        </button>
        {isRunning ? (
          <button className="cursor-pointer border" onClick={handlePause}>
            Pause
          </button>
        ) : (
          <button className="cursor-pointer border" onClick={handleStart}>
            Start
          </button>
        )}
        <button className="cursor-pointer border" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className={clsx("flex flex-col gap-2")}>
        {progressBars.map((progress, index) => (
          <ProgressBar key={index} progress={progress} />
        ))}
      </div>
    </div>
  );
};

export default ProgressBars;
