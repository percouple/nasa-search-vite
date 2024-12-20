import { useState } from "react";
import {ImageCollage} from "./imageCollage/ImageCollage";
import CardSelectScreen from "./card-select-screen/CardSelectScreen";


const ContentDisplay = (props) => {
  
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <>
      {selectedCard !== null ? (
        <CardSelectScreen
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          imageData={props.imageData}
        />
      ) : (
        <></>
      )}
      <ImageCollage
        // amountOfResultsShown={props.amountOfResultsShown}
        imageData={props.imageData}
        // setLoading={props.setLoading}
        // loading={props.loading}
        setSelectedCard={setSelectedCard}
        selectedCard={selectedCard}
      />
    </>
  );
}

export default ContentDisplay;