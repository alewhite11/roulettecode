import { useState } from "react";
import {
  RouletteWrapperState,
  GameStages
} from "./Global";
import Wheel from "./Wheel";
import Board from "./Board";
import Racetrack from "./Racetrack";
import "./styles.css"

function App() {
  const rouletteWheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

  const blackNumbers = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35,
  ];

  const [state, setState] = useState<RouletteWrapperState>({
    rouletteData: {
      numbers: rouletteWheelNumbers,
    },
    chipsData: {
      selectedChip: null,
      placedChips: new Map(),
    },
    number: {
      next: null,
    },
    winners: [],
    history: [],
    frequentNumbers: [],
    stage: GameStages.NONE,
    username: "",
    endTime: 0,
    progressCountdown: 0,
    time_remaining: 0,
  });

  const updateFrequentNumbers = (history: number[]) => {
    const frequencyMap: { [key: number]: number } = {};

    // Count occurrences of each number in the last 50 history items
    history.forEach((num) => {
      frequencyMap[num] = (frequencyMap[num] || 0) + 1;
    });

    // Sort numbers by frequency in descending order and then by number for tie-breaking
    const sortedNumbers = Object.entries(frequencyMap)
      .map(([num, count]) => ({
        num: parseInt(num),
        count,
      }))
      .sort((a, b) => b.count - a.count || a.num - b.num);

    // Keep only the top 5 most frequent numbers
    return sortedNumbers.slice(0, 5).map((entry) => entry.num);
  };

  const startSpin = (randomNumber: number) => {
    setState((prevState) => {
      const newHistory = [randomNumber, ...prevState.history].slice(0, 50); // Limit to 50 entries
      let frequentNumbers = prevState.frequentNumbers;

      // Calculate frequent numbers only if history length is 50 or more
      if (newHistory.length >= 50) {
        frequentNumbers = updateFrequentNumbers(newHistory);
      }

      return {
        ...prevState,
        number: { next: randomNumber.toString() },
        history: newHistory,
        frequentNumbers: frequentNumbers, // Update frequent numbers
      };
    });
  };

  const handleDeleteLast = () => {
    if (state.history.length > 0) {
      setState((prevState) => ({
        ...prevState,
        history: prevState.history.slice(1),
      }));
    }
  };

  const handleCellClick = (item: number) => {
    startSpin(item)
  };

  return (
    <>
      <div>
        <div>
        <h1
          style={{
            color: 'white',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            fontSize: '3em',
            padding: '20px',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          }}
        >
          Roulette Code
        </h1>
          <table className={"rouletteWheelWrapper"}>
            <tbody>
              <tr>
                <td style={{position: "relative", width: "33%"}}>
                  <div className={"winnerItemHeader hideElementsTest"} >Winning numbers</div>
                  {state.history.length >= 50 &&
                  <>
                  <div className={"winnerHistory hideElementsTest"}>
                    {state.frequentNumbers.map((entry, index) => {
                      if (entry === 0) {
                        return (
                          <div className="green" key={index}>
                            {entry}
                          </div>
                        );
                      } else if (blackNumbers.includes(entry)) {
                        return (
                          <div className="black" key={index}>
                            {entry}
                          </div>
                        );
                      } else {
                        return (
                          <div className="red" key={index}>
                            {entry}
                          </div>
                        );
                      }
                    })}
                  </div>
                  <Racetrack frequentNumbers={state.frequentNumbers}/>
                  </>
                  }
                  {state.history.length < 50 &&
                  <>
                    <div className="winnerItem">Insert other {50 - state.history.length} to see the numbers</div>
                  </>
                  }
                </td>
                <td style={{width: "33%"}}>
                <Wheel
                  rouletteData={state.rouletteData}
                  number={state.number}
                />
                </td>
                <td style={{position: "relative", width: "33%"}}>
                  <div className={"winnerItemHeader hideElementsTest"} >History</div>
                  <div className={"winnerHistory hideElementsTest"}>
                    {state.history.slice(0, 18).map((entry, index) => {
                      if (entry === 0) {
                        return (
                          <div className="green" key={index}>
                            {entry}
                          </div>
                        );
                      } else if (blackNumbers.includes(entry)) {
                        return (
                          <div className="black" key={index}>
                            {entry}
                          </div>
                        );
                      } else {
                        return (
                          <div className="red" key={index}>
                            {entry}
                          </div>
                        );
                      }
                    })}
                  </div>
                  <button onClick={handleDeleteLast} className="button-delete">
                    Delete Last Entry
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={3} style={{ textAlign: "center", verticalAlign: "middle", padding: 0 }}>
                  <div style={{ display: "inline-block" }}>
                    <Board onCellClick={handleCellClick} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
