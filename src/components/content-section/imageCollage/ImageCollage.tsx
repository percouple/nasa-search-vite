import React from "react";
import styled from "styled-components";
import nasaLogo from "../../../nasa-logo.png";

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
// Commented out for potential alterations
const StyledContainer = styled.div`
  /* background-image: url(${nasaLogo}); */
  background-size: 100%;
  /* background-position: calc(50% + 30px) calc(50% + 30px); */
  /* background-repeat: no-repeat; */
  /* background-attachment: fixed; */
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

  .selected {
    border: solid red 2px;
  }
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
      {/* <Overlay> */}
        {reducedData.map((item, index) => (
          <StyledCard
            onClick={() => handleClick(index)}
            key={index}
            className={index === selectedCard ? "selected" : ""}
          >
            <img src={item.links[0].href} alt={item.data[0].title}></img>
          </StyledCard>
        ))}
      {/* </Overlay> */}
    </StyledContainer>
  );
}
