import React, { useEffect, useState } from "react";
import "./title-style.css";

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
      setButtonMessage(`New Search`);
    }
    console.log(totalHits)
  }, [totalHits]);

  return (
    <>
      <div className="introductory-text" style={totalHits ? {display: "none"} : {}}>Welcome to the NASA search bar!</div>
      <form onSubmit={submitForm} className={`form-common flex-center source-code-pro-normal ${!totalHits ? "fixed-form" : "landing-page-form"}`}>
        <input
          className="input source-code-pro-normal"
          type="text"
          placeholder="moon landing"
          value={inputValue}
          onChange={onChange}
        ></input>
        <button type="submit" className="submit-button source-code-pro-normal">
          {buttonMessage}
        </button>
      </form>
    </>
  );
};
