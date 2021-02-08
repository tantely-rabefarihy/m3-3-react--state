import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import { colors, contentWidth } from "./GlobalStyles";
import words from "../data/words.json";
import letters from "../data/letters.json";

const initialGameState = { started: false, over: false, win: false };

const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);

  const handleStart = () => {
    setGame({ ...game, started: !game.started });
    if (word.str === "") {
      getNewWord();
    }
  };

  let dynamicBtn = "Start";
  dynamicBtn = game.started
    ? "Pause"
    : word.str.length > 1
    ? "Continue"
    : "Start";

  const handleNewGame = () => {
    setGame({ ...game, over: !game.over, started: !game.started });
    setWord({ str: "", revealed: [] });
    setWrongGuesses(wrongGuesses.splice());
    setUsedLetters(usedLetters.splice());
  };

  const getNewWord = () => {
    let newWord = words[Math.floor(Math.random() * words.length)];
    console.log(newWord);

    let revealed = [];
    for (let i = 0; i < newWord.length; i++) {
      revealed.push("");
    }
    setWord(() => {
      return {
        ...word,
        str: newWord,
        revealed: newWord.split("").map(() => ""),
      };
    });
  };

  const handleGuess = (ltr) => {
    let lettr = ltr.target.innerText;
    let wordArray = word.str.split("");
    if (!wordArray.includes(lettr)) {
      setWrongGuesses(wrongGuesses.concat(lettr));
      if (wrongGuesses.length >= 9) {
        handleEndGame(false);
      }
    } else {
      for (let i = 0; i <= word.str.length; i++) {
        if (lettr === word.str[i]) {
          word.revealed[i] = lettr;
        }
      }
    }
    if (word.revealed.join("") === word.str) {
      handleEndGame(true);
    }
    setUsedLetters(usedLetters.concat(lettr));
  };

  const handleReset = () => {
    if (game.pause === true && game.started === false) {
      // Do nothing
    } else {
      setGame({ ...game, pause: !game.pause, started: game.started });
      getNewWord();
      setWrongGuesses(wrongGuesses.splice());
      setUsedLetters(usedLetters.splice());
    }
  };

  const handleEndGame = (win) => {
    setGame({ ...game, over: true, win: win });
  };

  console.log(game);
  return (
    <Wrapper>
      {game.over && game.started ? (
        <GameOverModal win={game.win} word={word.str} restart={handleNewGame} />
      ) : (
        <></>
      )}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{dynamicBtn}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {game.started && (
        <>
          <Container>
            <Deadman />
            <RightColumn>
              <DeadLetters wrongGuesses={wrongGuesses} />
              <TheWord word={word} />
            </RightColumn>
          </Container>
          <Keyboard
            letters={letters}
            usedLetters={usedLetters}
            onClickFunc={handleGuess}
          />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
