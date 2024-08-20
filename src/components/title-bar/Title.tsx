import React from "react";
import styled from "styled-components";

interface TitleProps {
  setAmountOfResultsShown: React.Dispatch<React.SetStateAction<number>>; // Type for setter function
  totalHits: number; // Type for totalHits
}

const StyledTitle = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  min-width: 500px;
`;

const StyledSelect = styled.select`
  background-color: white;

  option {
    background-color: white;
    font-size: 200px;
  }
`;

const SelectSentenceStyled = styled.span`
  display: flex;
  justify-content: space-around;
  min-width: 250px;
`;

export const Title: React.FC<TitleProps> = ({
  setAmountOfResultsShown,
  totalHits,
}) => {
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    setAmountOfResultsShown(e.target.value);
  };

  return (
    <StyledTitle>
      <h1 className="title">Search NASA:</h1>
      <SelectSentenceStyled>
      <h4>Showing </h4>
      <StyledSelect defaultValue={10} onChange={onChange}>
        <option>5</option>
        <option>10</option>
        <option>30</option>
        <option>50</option>
        <option>100</option>
      </StyledSelect>
      <h4>results of {totalHits}</h4>
      </SelectSentenceStyled>
    </StyledTitle>
  );
}
