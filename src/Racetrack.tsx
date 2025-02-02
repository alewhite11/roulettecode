import React from 'react';

// Define the type for positions
interface Position {
  top: string;
  left: string;
}

// Props interface for Racetrack
interface RacetrackProps {
    frequentNumbers: number[];
  }

// Define the map of positions for each number
const positions: Record<number, Position> = {
  10: { top: '18.4%', left: '9%' },
  23: { top: '43.1%', left: '4.32%' },
  8: { top: '67.8%', left: '8.8%' },
  30: { top: '71.3%', left: '15%' },
  11: { top: '71.3%', left: '19.7%' },
  36: { top: '71.3%', left: '24.4%' },
  13: { top: '71.3%', left: '29%' },
  27: { top: '71.3%', left: '34.5%' },
  6: { top: '71.3%', left: '39.2%' },
  34: { top: '71.3%', left: '44.7%' },
  17: { top: '71.3%', left: '50%' },
  25: { top: '71.3%', left: '54.8%' },
  2: { top: '71.3%', left: '60.1%' },
  21: { top: '71.3%', left: '65.4%' },
  4: { top: '71.3%', left: '70.2%' },
  19: { top: '71.3%', left: '75.2%' },
  15: { top: '71.3%', left: '80.3%' },
  32: { top: '71.3%', left: '85.1%' },
  0: { top: '67.8%', left: '91.2%' },
  26: { top: '43.1%', left: '96%' },
  3: { top: '18.4%', left: '91.5%' },
  35: { top: '15.5%', left: '85.3%' },
  12: { top: '15.5%', left: '80.6%' },
  28: { top: '15.5%', left: '75.8%' },
  7: { top: '15.5%', left: '71.2%' },
  29: { top: '15.5%', left: '66.5%' },
  18: { top: '15.5%', left: '61.9%' },
  22: { top: '15.5%', left: '57.2%' },
  9: { top: '15.5%', left: '52.3%' },
  31: { top: '15.5%', left: '47.6%' },
  14: { top: '15.5%', left: '43.1%' },
  20: { top: '15.5%', left: '38.5%' },
  1: { top: '15.5%', left: '33.8%' },
  33: { top: '15.5%', left: '29.2%' },
  16: { top: '15.5%', left: '24.5%' },
  24: { top: '15.5%', left: '19.7%' },
  5: { top: '15.5%', left: '14.9%' },
};

const Racetrack: React.FC<RacetrackProps> = ({ frequentNumbers }) => {
  
    return (
      <div className="racetrack-container">
        {frequentNumbers.map((number) => (
          <div
            key={number}
            className="racetrack-number highlighted"
            style={positions[number]}
          >
            {number}
          </div>
        ))}
      </div>
    );
  };

export default Racetrack;
