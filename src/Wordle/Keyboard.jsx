import clsx from "clsx";
import { Fragment } from "react";
import Key from "./Key.jsx";

const Keyboard = ({ onClickLetter, onClickEnter, onClickBackspace }) => {
  const handleLetter = (letter) => {
    onClickLetter(letter);
  };

  const handleEnter = () => {
    onClickEnter();
  };

  const handleBackspace = () => {
    onClickBackspace();
  };

  const getButtons = () => {
    const row1 = "QWERTYUIOP".split("").map((letter) => {
      return {
        children: letter,
        onClick: () => onClickLetter(letter),
      };
    });
    const row2 = "ASDFGHJKL".split("").map((letter) => {
      return {
        children: letter,
        onClick: () => onClickLetter(letter),
      };
    });
    const row3 = [
      {
        children: "Enter",
        onClick: onClickEnter,
      },
      ..."ZXCVBNM".split("").map((letter) => {
        return {
          children: letter,
          onClick: () => onClickLetter(letter),
        };
      }),
      {
        children: "Backspace",
        onClick: onClickBackspace,
      },
    ];
    return [row1, row2, row3];
  };

  return (
    <div className={clsx("flex flex-col items-center gap-2")}>
      {getButtons().map((row, rowIndex) => (
        <div key={rowIndex} className={clsx("flex gap-2")}>
          {row.map((button) => (
            <Key key={button.children} color="default" onClick={button.onClick}>
              {button.children}
            </Key>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
