import React from "react";
import "./image-collage-styles.css";

// Define the type for an image item if not already defined
interface ImageItem {
  id: string; // Example field
  url: string; // Example field
  links: string[];
  // Add other relevant fields for image data
}

// Define the props interface
interface ImageContainerProps {
  amountOfResultsShown: number;
  imageData: ImageItem[]; // Array of image items
  setSelectedCard: React.Dispatch<React.SetStateAction<ImageItem | null>>; // Function to set selected card
  selectedCard: ImageItem | null; // Currently selected card
}

export const ImageCollage: React.FC<ImageContainerProps> = ({
  amountOfResultsShown,
  imageData,
  setSelectedCard,
  selectedCard,
}) => {
  // Reduce rendered data by amount of results shown
  const reducedData = imageData.slice(0, amountOfResultsShown);

  // Select a card for overlay
  const handleClick = (index: number) => {
    setSelectedCard(index);
  };

  const getSpannedCard = (cardIndex: number) => {
    if (cardIndex !== 0 && cardIndex % 5 === 0) {
      return "card-tall";
    }
    if (cardIndex !== 0 && cardIndex % 6 === 0) {
      return "card-wide";
    }
  };

  return (
    <div className="image-collage-container">
      {reducedData.map((item, index) => (
        <div
          onClick={() => handleClick(index)}
          key={index}
          className={`image-container ${getSpannedCard(index)} ${
            index === selectedCard ? "selected" : ""
          }`}
          style={{ backgroundImage: `url(${item.links[0].href})` }}
        ></div>
      ))}
    </div>
  );
};
