import React, { useEffect, useState, useRef } from "react";
import "./image-collage-styles.css";
import {getNumberOfColumns, getSpannedCard} from "./collage-helpers.ts";

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
  setSelectedCard: React.Dispatch<React.SetStateAction<number | null>>; // Function to set selected card
  selectedCard: ImageItem | null; // Currently selected card
}

export const ImageCollage: React.FC<ImageContainerProps> = ({
  imageData,
  setSelectedCard,
  selectedCard,
}) => {

  // Reduce rendered data by amount of results shown
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [columns, setColumns] = useState(0);

  // Select a card for overlay
  const handleClick = (index: number) => {
    setSelectedCard(index);
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
