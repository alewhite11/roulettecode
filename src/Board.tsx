import React from 'react';

// Define the number data, including the layout and colors
const rouletteData = [
  { number: 0, color: "green" },
  { number: 3, color: "red" }, { number: 6, color: "black" }, { number: 9, color: "red" },
  { number: 12, color: "red" }, { number: 15, color: "black" }, { number: 18, color: "red" },
  { number: 21, color: "red" }, { number: 24, color: "black" }, { number: 27, color: "red" },
  { number: 30, color: "red" }, { number: 33, color: "black" }, { number: 36, color: "red" },
  { number: 2, color: "black" }, { number: 5, color: "red" }, { number: 8, color: "black" },
  { number: 11, color: "black" }, { number: 14, color: "red" }, { number: 17, color: "black" },
  { number: 20, color: "black" }, { number: 23, color: "red" }, { number: 26, color: "black" },
  { number: 29, color: "black" }, { number: 32, color: "red" }, { number: 35, color: "black" },
  { number: 1, color: "red" }, { number: 4, color: "black" }, { number: 7, color: "red" },
  { number: 10, color: "black" }, { number: 13, color: "black" }, { number: 16, color: "red" },
  { number: 19, color: "red" }, { number: 22, color: "black" }, { number: 25, color: "red" },
  { number: 28, color: "black" }, { number: 31, color: "black" }, { number: 34, color: "red" },
];

interface BoardProps {
  onCellClick: (item: number) => void;
}

class Board extends React.Component<BoardProps> {
  render() {
    return (
      <div className="roulette-board">
        {/* Zero cell */}
        <div
          key={0}
          className="zero-cell"
          onClick={() => this.props.onCellClick(0)}
        >
          0
        </div>

        {/* Remaining numbers */}
        <div className="number-grid">
          {rouletteData
            .filter(item => item.number !== 0)
            .map((item, index) => (
              <div
                key={index + 1}
                className={`board-cell ${item.color}-cell`}
                onClick={() => this.props.onCellClick(item.number)}
              >
                {item.number}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Board;
