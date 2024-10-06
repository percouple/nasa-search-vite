
const dateFixer = (date: Date) => {
  const input = new Date(date);
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

  return (
      <div onClick={screenClickHandler} className="card-select-screen">
        <div className="image-card">
          <img src={imageData[selectedCard].links[0].href}></img>
          <div className="image-card-text">
            <div style={{ padding: "10px" }}>
              <h4>
                [{dateFixer(imageData[selectedCard].data[0].date_created)}]{" "}
              </h4>
              <h1 style={{ paddingTop: "10px", textDecorationLine: "underline" }}>{imageData[selectedCard].data[0].title}</h1>
            </div>
            <div style={{ padding: "10px" }}>
              {imageData[selectedCard].data[0].description}
            </div>
          </div>
        </div>
      </div>
  );
}
