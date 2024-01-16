import React, { useState, useRef } from "react";
import "./MailingField.css";
import Chip from "./Chip";

interface MailingFieldProps {
  onAdd: (email: string) => void;
}

const dummyData: {
  value: string;
  label: string;
  name: string;
  email: string;
}[] = [
  {
    value: "1",
    label: "John Doe",
    name: "John Doe",
    email: "john.doe@example.com",
  },
  {
    value: "2",
    label: "Jane Smith",
    name: "Jane Smith",
    email: "jane.smith@example.com",
  },
  {
    value: "3",
    label: "Bob Johnson",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
  },
  {
    value: "4",
    label: "Alice Brown",
    name: "Alice Brown",
    email: "alice.brown@example.com",
  },
  {
    value: "5",
    label: "Chris Williams",
    name: "Chris Williams",
    email: "chris.williams@example.com",
  },
  {
    value: "6",
    label: "Eva Davis",
    name: "Eva Davis",
    email: "eva.davis@example.com",
  },
  {
    value: "7",
    label: "Michael Miller",
    name: "Michael Miller",
    email: "michael.miller@example.com",
  },
  {
    value: "8",
    label: "Olivia Wilson",
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
  },
  {
    value: "9",
    label: "Daniel Lee",
    name: "Daniel Lee",
    email: "daniel.lee@example.com",
  },
  {
    value: "10",
    label: "Sophia Turner",
    name: "Sophia Turner",
    email: "sophia.turner@example.com",
  },
  {
    value: "11",
    label: "William White",
    name: "William White",
    email: "william.white@example.com",
  },
  {
    value: "12",
    label: "Emma Harris",
    name: "Emma Harris",
    email: "emma.harris@example.com",
  },
];

const MailingField: React.FC<MailingFieldProps> = ({ onAdd }) => {
  const [email, setEmail] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const [filteredData, setFilteredData] =
    useState<{ value: string; label: string; email: string }[]>(dummyData);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setEmail(inputValue);

    const filtered = dummyData.filter(
      (item) =>
        item.label.toLowerCase().includes(inputValue.toLowerCase()) &&
        !chips.includes(item.label)
    );
    setFilteredData(filtered);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      event.preventDefault();
      if (email.trim() !== "") {
        const matchingItem = dummyData.find(
          (item) => item.label.toLowerCase() === email.trim().toLowerCase()
        );

        if (matchingItem && !chips.includes(matchingItem.label)) {
          setChips([...chips, matchingItem.label]);
          onAdd(matchingItem.label);
          setEmail("");
          setFilteredData(
            filteredData.filter((item) => item.label !== matchingItem.label)
          );
        }
      }
    } else if (event.key === "Backspace" && email === "") {
      const lastChip = chips[chips.length - 1];
      setChips(chips.slice(0, -1));
      setFilteredData([
        ...filteredData,
        { value: lastChip, label: lastChip, email: "" },
      ]);
    }
  };

  const handleChipRemove = (index: number) => {
    const removedChip = chips[index];
    const newChips = chips.filter((_, i) => i !== index);
    setChips(newChips);
    setFilteredData([
      ...filteredData,
      { value: removedChip, label: removedChip, email: "" },
    ]);
  };

  const handleItemClick = (item: {
    value: string;
    label: string;
    email: string;
  }) => {
    setChips([...chips, item.label]);
    onAdd(item.label);
    setFilteredData(
      filteredData.filter((dataItem) => dataItem.label !== item.label)
    );
    setEmail("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="input-container">
      <div className="chips-container">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            email={chip}
            functionApp={() => handleChipRemove(index)}
          />
        ))}
      </div>
      <input
        type="text"
        value={email}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Enter Name of the User"
        className="input"
        ref={inputRef}
      />

      {filteredData.length > 0 && (
        <div className="item-list">
          {filteredData.map((item) => (
            <div
              className="item"
              key={item.value}
              onClick={() => handleItemClick(item)}
            >
              <img className="imageIcon" src="icon2.png" alt="Icon" />
              <div className="label">{item.label}</div>
              <div className="email">{item.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MailingField;
