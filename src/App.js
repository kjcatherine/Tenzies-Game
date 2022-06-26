import './App.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import Die from './components/Die';

function App() {
  let index;
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const held = dice.every((die) => die.isHeld);
    const refValue = dice[0].value;
    const sameDice = dice.every((die) => die.value === refValue);
    if (sameDice && held) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }

    // console.log(newDice);
    return newDice;
  }
  //helper
  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="main">
        <h1 className="title">Tenzies</h1>
        <p className={tenzies ? 'winner' : 'instructions'}>
          {tenzies
            ? 'You won!🎉 Congratulations!!🎉🎉'
            : 'Roll until all dice are the same. Click each die to freeze it at its current value between rolls.'}
        </p>
        <div className="dice-container">{diceElements}</div>

        <button onClick={rollDice} className="roll-dice">
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </div>
    </main>
  );
}

export default App;

// function generate() {
//   let empty = [];
//   for (let i = 0; i < 10; i++) {
//     let index = Math.ceil(Math.random() * 6);
//     const dots = new Array(index).join('.');
//     empty.push(dots);
//   }
//   console.log(empty);
// }
// const randomDots = generate();

// function allNewDice() {
//   const newDice = [];
//   for (let i = 0; i < 10; i++) {
//     const index = Math.ceil(Math.random() * 6);
//     newDice.push({
//       value: new Array(index).join('.'),
//       isHeld: false,
//     });
//   }
//   console.log(newDice);
//   return newDice;
// }
// allNewDice();
