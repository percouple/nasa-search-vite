import React, { useEffect, useState } from "react";
import './title-style.css';

interface SubheaderProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>; // Function to set input value
  inputValue: string; // Current value of the input
  totalHits: number; // Total number of hits
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

const initialMessage = "Search NASA";

export const Title: React.FC<SubheaderProps> = ({
  setInputValue,
  inputValue,
  totalHits,
  submitForm,
}) => {

  const [buttonMessage, setButtonMessage] = useState<string>(initialMessage);

  // Input change handler
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  // Message change handler
  useEffect(() => {
    if (totalHits) {
      setButtonMessage(`${totalHits} images gathered`);
    }
  }, [totalHits]);

  return (
    <section className="input-bar">
      <form onSubmit={submitForm}>
        <input
          style={{ border: "1px black solid" }}
          className=""
          type="text"
          placeholder="moon landing"
          value={inputValue}
          onChange={onChange}
        ></input>
        <button
          style={{ marginLeft: "6px", border: "1px black solid" }}
          type="submit"
          className="submit-button"
        >
          {buttonMessage}
        </button>
      </form>
    </section>
  );
}
