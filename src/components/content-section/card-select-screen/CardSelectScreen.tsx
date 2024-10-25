import "./card-select-screen.css";

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
    setSelectedCard(null);
  };

  const openImageInNewTab = (imageUrl: string) => {
    const newTab = window.open();
    if (newTab) {
      newTab.opener = null; // Prevents the new tab from accessing the original window
      newTab.location = imageUrl; // Set the location of the new tab to the image URL
    }
  };

  return (
    <div
      onClick={screenClickHandler}
      className="card-select-screen flex-center"
    >
      <div className="image-card">
        <div className="flex-center">
          <img
            src={imageData[selectedCard].links[0].href}
            className="responsive-image"
            onClick={() => openImageInNewTab(imageData[selectedCard].links[0].href)}
          ></img>
          <div style={{ padding: "10px" }}>
            <h2 style={{ paddingTop: "10px", fontWeight: "lighter" }}>
              {imageData[selectedCard].data[0].title}
            </h2>
            <h4>
              [{dateFixer(imageData[selectedCard].data[0].date_created)}]{" "}
            </h4>
          </div>
        </div>
          <div style={{ padding: "1rem", margin: "1rem" }}>
            {imageData[selectedCard].data[0].description}
          </div>
      </div>
    </div>
  );
}
