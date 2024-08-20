import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface SubheaderProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>; // Function to set input value
  inputValue: string; // Current value of the input
  totalHits: number; // Total number of hits
  submitForm: (e: React.FormEvent<HTMLFormElement>) => void;
}

const StyledHeader = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 10px;
  padding-bottom: 10px;
  min-height: 3rem;
  border: solid black 2px;
  border-bottom: solid black 2px;
`;

const StyledSubmitButton = styled.button`
  margin-left: 6px;
  border: 1px black solid;

  :hover {
    border: none;
    cursor: pointer;
  }
`;

const StyledInput = styled.input`
  :focus{
    outline: none;
    border:1px solid red;
    box-shadow: 0 0 10px #719ECE;
  }
`;

const initialMessage = "<-- Type a prompt to generate images";

export const Subheader: React.FC<SubheaderProps> = ({
  setInputValue,
  inputValue,
  totalHits,
  submitForm,
}) => {

  const [responseMessage, setResponseMessage] = useState<string>(initialMessage);

  // Input change handler
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const { value } = e.target;
    setInputValue(value);
  };

  // Message change handler
  useEffect(() => {
    if (totalHits) {
      setResponseMessage(`${totalHits} images gathered`);
      setTimeout(() => {
        setResponseMessage("");
      }, 3000);
    }
  }, [totalHits]);

  return (
    <StyledHeader>
      <form onSubmit={submitForm}>
        <StyledInput
          style={{ border: "1px black solid" }}
          type="text"
          placeholder="moon landing"
          value={inputValue}
          onChange={onChange}
        ></StyledInput>
        <StyledSubmitButton
          style={{ marginLeft: "6px", border: "1px black solid" }}
          type="submit"
        >
          Go!
        </StyledSubmitButton>
      </form>
      <h4>{responseMessage}</h4>
    </StyledHeader>
  );
}
