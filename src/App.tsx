import {Title} from "./components/title-bar/Title";
import { useState } from "react";
import axios from "axios";
import Subheader from "./components/title-bar/Subheader";
import ContentDisplay from "./components/content-section/ContentDisplay";
import LoadingScreen from "./components/content-section/LoadingScreen";

const initialNasaData = [];

function App() {
  let [nasaData, setNasaData] = useState(initialNasaData);
  const [imageData, setImageData] = useState([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalHits, setTotalHits] = useState<number>(0);
  const [amountOfResultsShown, setAmountOfResultsShown] = useState<number>(10);

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
    <div className={loading ? "loading" : ""}>
      <Title
        amountOfResultsShown={setAmountOfResultsShown}
        setAmountOfResultsShown={setAmountOfResultsShown}
        totalHits={totalHits}
      />
      <Subheader
        setLoading={setLoading}
        totalHits={totalHits}
        setInputValue={setInputValue}
        inputValue={inputValue}
        submitForm={submitForm}
      />
      {loading && <LoadingScreen />}
      <ContentDisplay
        amountOfResultsShown={amountOfResultsShown}
        imageData={imageData}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
}

export default App;
