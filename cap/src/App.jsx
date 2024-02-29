import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import APIForm from './components/APIForm';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [count, setCount] = useState(0);

  const [currentImage, setCurrentImage] = useState(null);

  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "1920",
      height: "1080",
    };

    if (inputs.url == "" || inputs.url == " ") {
      alert("You forgot to submit an url!");
    }
    else {
      for (const [key, value] of Object.entries(inputs)) {
        if (value == "") {
          inputs[key] = defaultValues[key]
        }
      }
      makeQuery();
    }
  
  }

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;

    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.error);
  }

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(json)

    if (json.url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentImage(json.url);
      reset();
    }
  }

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: "",
    });
  }

  return (
    <>

      <h1>Build your own screenshot!</h1>
      <div className="card">
      </div>
      {/* Render the APIForm component here and pass the required props */}
      <APIForm
        inputs={inputs}
        handleChange={handleChange}
        onSubmit={submitForm}
      />
    </>
  );
}

export default App;
