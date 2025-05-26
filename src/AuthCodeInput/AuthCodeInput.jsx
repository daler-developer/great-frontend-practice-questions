import { useRef, useState } from "react";
import clsx from "clsx";
import DigitInput from "./DigitInput.jsx";

const DIGITS_COUNT = 6;

const DIGITS = "0123456789";

const getInitialValue = () => {
  return new Array(DIGITS_COUNT).fill("");
};

const AuthCodeInput = () => {
  const [digits, setDigits] = useState(getInitialValue);

  const inputEls = useRef(new Array(DIGITS_COUNT).fill(null));

  const handleDigitType = (e, index) => {
    setDigits((prev) => {
      const copy = [...prev];
      copy[index] = e.key;
      return copy;
    });
    const isLast = index + 1 === DIGITS_COUNT;
    if (!isLast) {
      inputEls.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    setDigits((prev) => {
      const copy = [...prev];
      const isCurrentEmpty = !copy[index];
      if (isCurrentEmpty) {
        copy[index - 1] = "";
        inputEls.current[index - 1]?.focus();
      } else {
        copy[index] = "";
        inputEls.current[index - 1]?.focus();
      }
      return copy;
    });
  };

  const handleKeyDown = (e, index) => {
    const isDigit = DIGITS.includes(e.key);
    const isBackspace = e.key === "Backspace";

    if (isDigit) {
      handleDigitType(e, index);
    }
    if (isBackspace) {
      handleBackspace(e, index);
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData("text");
    const areAllDigits = pastedText.split("").every((c) => DIGITS.includes(c));
    if (areAllDigits) {
      const updatedValue = getInitialValue();
      for (let i = 0; i < DIGITS_COUNT; i++) {
        updatedValue[i] = pastedText[i];
      }
      setDigits(updatedValue);
      inputEls.current.at(-1).focus();
    }
  };

  const handleReset = () => {
    inputEls.current.at(0).focus();
    setDigits(getInitialValue());
  };

  const handleSubmit = () => {
    // TODO
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className={clsx("flex items-center gap-2")}>
        {digits.map((digit, i) => (
          <DigitInput
            key={i}
            ref={(el) => {
              inputEls.current[i] = el;
            }}
            value={digit}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button className="border p-2" onClick={handleReset}>
          Reset
        </button>
        <button className="border p-2" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AuthCodeInput;
