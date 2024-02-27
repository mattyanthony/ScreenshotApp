import { useState } from 'react';
import viteLogo from '/vite.svg';
import './App.css';
import APIForm from './components/APIForm';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [count, setCount] = useState(0);
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
