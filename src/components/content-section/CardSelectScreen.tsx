import React from "react";
import styled from "styled-components";

const StyledCardSelectScreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ImageCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  background-color: black;
  padding: 10px;
  max-width: 80vw;
  padding-top: 30px;
  border: solid #777777 2px;
  border-radius: 10px;
`;

const ImageCardText = styled.div`
  display: flex;
  flex-direction: column;
`;

const dateFixer = (date) => {
  let input = new Date(date);
  return input.toLocaleDateString();
};

export default function CardSelectScreen({
  imageData,
  selectedCard,
  setSelectedCard,
}) {

  const screenClickHandler = () => {
    setSelectedCard(null)
  }

  const imageClickHandler = (e) => {
    e.stopPropagation();
  }

  return (
      <StyledCardSelectScreen onClick={screenClickHandler}>
        <ImageCard onClick={imageClickHandler}>
          <img src={imageData[selectedCard].links[0].href}></img>
          <ImageCardText>
            <div style={{ padding: "10px" }}>
              <h4>
                [{dateFixer(imageData[selectedCard].data[0].date_created)}]{" "}
              </h4>
              <h1 style={{ paddingTop: "10px", textDecorationLine: "underline" }}>{imageData[selectedCard].data[0].title}</h1>
            </div>
            <div style={{ padding: "10px" }}>
              {imageData[selectedCard].data[0].description}
            </div>
          </ImageCardText>
        </ImageCard>
      </StyledCardSelectScreen>
  );
}
