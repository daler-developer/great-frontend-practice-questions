import Keyboard from "./Keyboard.jsx";
import { useRef } from "react";

const WORDS = Object.freeze(["APPLE", "BEAST", "FAINT", "FEAST", "FRUIT", "GAMES", "PAINT", "PASTE", "TOWER", "REACT"]);

const Wordle = () => {
  const word = useRef(WORDS[1]);

  const handleClickLetter = () => {};

  const handleClickBackspace = () => {};

  const handleClickEnter = () => {};

  return (
    <div>
      <Keyboard
        onClickLetter={handleClickLetter}
        onClickBackspace={handleClickBackspace}
        onClickEnter={handleClickEnter}
      />
    </div>
  );
};

export default Wordle;
