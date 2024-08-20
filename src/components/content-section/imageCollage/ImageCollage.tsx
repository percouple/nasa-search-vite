import React from "react";
import styled from "styled-components";
import nasaLogo from "../../../nasa-logo.png";
import Image from "./Image";

// Define the type for an image item if not already defined
interface ImageItem {
  id: string; // Example field
  url: string; // Example field
  // Add other relevant fields for image data
}

// Define the props interface
interface ImageContainerProps {
  amountOfResultsShown: number;
  imageData: ImageItem[]; // Array of image items
  setSelectedCard: React.Dispatch<React.SetStateAction<ImageItem | null>>; // Function to set selected card
  selectedCard: ImageItem | null; // Currently selected card
}

// Background/Main container styling
const StyledContainer = styled.div`
  background-image: url(${nasaLogo});
  background-size: 100%;
  background-position: calc(50% + 30px) calc(50% + 30px);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: rgba(50, 50, 50, 1);
`;

const Overlay = styled.div`
  padding-top: 10px;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 800px;
  width: 100%;
  height: 100%;
  background-color: rgba(40, 40, 40, 0.7);
`;

// Card Styling
const StyledCard = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 6px;
  border-radius: 10px;
  background-size: contain;
  border: 4px solid black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .selected {
    border: solid red 2px;
  }

  // TODO - Add shadow when user hovers over
  &:hover::after {
    display: block;
    content: "Click ";
    position: absolute;
    /* top: 0;
    left: 0; */
    width: auto;
    height: auto;
    background-color: rgba(0, 0, 0, 1); /* Adjust shadow color and opacity */
    background-size: 100%;
    border-radius: 10px;
    z-index: 1000;
  }
  /* &::hover {
    box-shadow: inset 100px 100px 0 0 rgba(0, 0, 0, 0.7);
  } */
`;

export const ImageCollage: React.FC<ImageContainerProps> = ({
  amountOfResultsShown,
  imageData,
  setSelectedCard,
  selectedCard,
}) => {
  // Reduce rendered data by amount of results shown
  const reducedData = imageData.slice(0, amountOfResultsShown);

  const handleClick = (index: number) => {
    setSelectedCard(index);
  };

  return (
    <StyledContainer>
      <Overlay>
        {reducedData.map((item, index) => (
          <StyledCard
            onClick={() => handleClick(index)}
            id={index}
            key={index}
            className={index === selectedCard ? "selected" : ""}
          >
            <Image item={item} />
          </StyledCard>
        ))}
      </Overlay>
    </StyledContainer>
  );
}
