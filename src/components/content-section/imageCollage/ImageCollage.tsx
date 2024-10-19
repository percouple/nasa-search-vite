import React, { useEffect, useState, useRef } from "react";
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
  imageData,
  setSelectedCard,
  selectedCard,
}) => {
  function getNumberOfColumns(containerSelector: string) {
    const container = document.querySelector(containerSelector);
    if (!container) return 0; // Return 0 if the container is not found

    const containerWidth = container.offsetWidth;
    const gap = 10; // Gap between columns
    const minColumnWidth = 200; // Minimum column width

    // Calculate the maximum number of columns that fit without gaps
    const maxColumns = Math.floor(containerWidth / minColumnWidth);

    // Calculate the total width used by the gaps for the maximum number of columns
    const totalGapWidth = gap * (maxColumns - 1);
    let totalColumnWidth = minColumnWidth * maxColumns + totalGapWidth;

    // If total width exceeds container width, reduce the number of columns
    let numberOfColumns = maxColumns;
    while (totalColumnWidth > containerWidth && numberOfColumns > 0) {
      numberOfColumns--;
      totalColumnWidth =
        minColumnWidth * numberOfColumns + gap * (numberOfColumns - 1);
    }

    return numberOfColumns;
  }

  // Reduce rendered data by amount of results shown
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [columns, setColumns] = useState(0);

  // Select a card for overlay
  const handleClick = (index: number) => {
    setSelectedCard(index);
  };

  // Takes in columns, index of card, and the total card count,
  // Returns
  const getSpannedCard = (
    columns: number,
    cardIndex: number,
    totalCards: number
  ) => {
    const wide = "card-wide";
    const tall = "card-tall";
    const square = "card-tall card-wide"; // Added for completeness

    // Check if the card can be tall
    const isTall = (index: number) =>
      index % columns === 0 && index + columns < totalCards;

    // Check if the card can be wide
    const isWide = (index: number) =>
      index % (columns * 2) === 0 && index + 1 < totalCards;

    // Check if the card can be square (2x2)
    const isSquare = (index: number) =>
      index % (columns * 2) === 2 && index + columns + 1 < totalCards;

    switch (columns) {
      case 7:
        if (isTall(cardIndex)) {
          return tall;
        } else if (isWide(cardIndex)) {
          return wide;
        } else if (isSquare(cardIndex)) {
          return square;
        }
        break;

      case 6:
        if (isTall(cardIndex)) {
          return tall;
        } else if (isWide(cardIndex)) {
          return wide;
        } else if (isSquare(cardIndex)) {
          return square;
        }
        break;

      case 5:
        if (isTall(cardIndex)) {
          return tall;
        } else if (isWide(cardIndex)) {
          return wide;
        } else if (isSquare(cardIndex)) {
          return square;
        }
        break;

      case 4:
        if (isTall(cardIndex)) {
          return tall;
        } else if (cardIndex % 4 === 2 && cardIndex + 1 < totalCards) {
          return wide;
        }
        break;

      case 3:
        if (isTall(cardIndex)) {
          return tall;
        }
        break;

      default:
        return "";
    }

    // Default case to return an empty string for unallocated cards
    return "";
  };

  // Observer API for load-in animation of images
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("card-show");
          // observer.unobserve(entry.target);
          // entry.target.classList.remove('card-hidden')
        }
      });
    });

    imageRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [imageData]);

  // Update the amount of columns if the size of the screen width changes
  useEffect(() => {

    setColumns(getNumberOfColumns('.image-collage-container'))

    const handleResize = () => {
      setColumns(getNumberOfColumns(".image-collage-container"));
      console.log("Screenwidth changing");
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="image-collage-container">
      {imageData.map((item, index) => (
        <div
          ref={(el) => (imageRefs.current[index] = el)}
          onClick={() => handleClick(index)}
          key={index}
          className={`image-container card-hidden ${getSpannedCard(
            columns,
            index,
            imageData.length
          )} ${index === selectedCard ? "selected" : ""}`}
          style={{ backgroundImage: `url(${item.links[0].href})` }}
        ></div>
      ))}
    </div>
  );
};
