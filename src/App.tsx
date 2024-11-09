import { Title } from "./components/title-bar/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import ContentDisplay from "./components/content-section/ContentDisplay";
import Footer from "./components/footer/footer";
import "./index.css";

interface ImageItem {

}

function App() {
  const [imageData, setImageData] = useState<ImageItem[] | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [totalHits, setTotalHits] = useState<number>(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  const url = "https://images-api.nasa.gov/search";
  const params = new URLSearchParams({
    description: inputValue,
    media_type: "image",
  });

  // request NASA data
  const sendGetRequest = (e: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    if (inputValue !== "") {
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
    console.log(imageData)
  }

  // Input value change handler
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    sendGetRequest(e);
  };

  useEffect(() => {
    // @ts-expect-error *** No input necessary, and exception is handled in sendGetRequest itself
    sendGetRequest(null); 
  }, [windowSize])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="source-code-pro-normal flex-column">
      <Title
        totalHits={totalHits}
        setInputValue={setInputValue}
        inputValue={inputValue}
        submitForm={submitForm}
      />
      <ContentDisplay imageData={imageData} />
      <Footer totalHits={totalHits} />
    </div>
  );
}

export default App;
