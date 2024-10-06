import {Title} from "./components/title-bar/Title";
import { useState } from "react";
import axios from "axios";
import ContentDisplay from "./components/content-section/ContentDisplay";
import './index.css'

const initialNasaData = [];

function App() {
  const [nasaData, setNasaData] = useState(initialNasaData);
  const [imageData, setImageData] = useState([]);
  const [inputValue, setInputValue] = useState<string>("nebula");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalHits, setTotalHits] = useState<number>(0);

  const url = "https://images-api.nasa.gov/search";
  const params = new URLSearchParams({
    description: inputValue,
    media_type: "image",
  });

  // Input value change handler
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue !== ''){

      setLoading(true);
      axios
      .get(`${url}?${params.toString()}`)
      .then((res) => {
        const { collection } = res.data;
        setNasaData(collection);
        setImageData(collection.items);
        setTotalHits(collection.metadata.total_hits);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
    }
  }
    
  return (
    <div className={`${loading ? "loading" : ""} source-code-pro-normal`}>
      <Title
        totalHits={totalHits}
        setInputValue={setInputValue}
        inputValue={inputValue}
        submitForm={submitForm}
      />
      <ContentDisplay
        imageData={imageData}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
}

export default App;
