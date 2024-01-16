import React from "react";
import "./Chip.css";

interface ChipProps {
  email: string;
  functionApp: () => void;
}

const Chip: React.FC<ChipProps> = ({ email, functionApp }) => {
  return (
    <div className="chip-container">
      <img className="imageIcon" src="icon2.png" />
      <span className="chip-text">{email}</span>
      <button className="close-button" onClick={functionApp}>
        X
      </button>
    </div>
  );
};

export default Chip;
