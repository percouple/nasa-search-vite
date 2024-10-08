import { Title } from "./components/title-bar/Title";
import { useState } from "react";
import axios from "axios";
import ContentDisplay from "./components/content-section/ContentDisplay";
import Footer from "./components/footer/footer";
import "./index.css";

function App() {
  const [imageData, setImageData] = useState([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [totalHits, setTotalHits] = useState<number>(0);

  const url = "https://images-api.nasa.gov/search";
  const params = new URLSearchParams({
    description: inputValue,
    media_type: "image",
  });

  // Input value change handler
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== "") {
      // setNasaData([]);
      axios
        .get(`${url}?${params.toString()}`)
        .then((res) => {
          const { collection } = res.data;
          setImageData(collection.items);
          setTotalHits(collection.metadata.total_hits);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={`source-code-pro-normal`}>
      <Title
        totalHits={totalHits}
        setInputValue={setInputValue}
        inputValue={inputValue}
        submitForm={submitForm}
      />
      <ContentDisplay imageData={imageData} />
      <Footer />
    </div>
  );
}

export default App;
