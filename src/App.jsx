import React, { useState, useEffect } from "react";
import "../css/main.css";
import axios from "axios";

function App() {
  const [unit, setUnit] = useState(true);
  const changeTheUnits = () => {
    setUnit(!unit);
  };

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [region, SetRegion] = useState("");

  const [tempC, setTempC] = useState("");
  const [tempF, setTempF] = useState("");
  const [desc, setDesc] = useState("");

  const [input, SetInput] = useState("");
  const [button, setButton] = useState(null);

  const inputChange = (e) => {
    SetInput(e.target.value);
  };

  const buttonChangeInput = () => {
    setButton(input);
  };

  const apiKEY = "0924fc34025b49c6a5a81845210109";
  const city = "London";
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKEY}&q=${
          input == "" ? city : input
        }&aqi=no`
      )
      .then((res) => {
        console.log(res);
        setCityName(res.data.location.name);
        setCountry(res.data.location.country);
        SetRegion(res.data.location.region);
        setTempC(res.data.current.temp_c);
        setTempF(res.data.current.temp_f);
        setDesc(res.data.current.condition.text);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  http: return (
    <div className="App">
      <div className="Background-image">
        {/* Navbar */}
        <div className="Heading-container flex justify-between items-center px-10 pt-6">
          <div className="Main-tags flex flex-col items-center">
            <h1 className="City text-white font-bold text-3xl hover:opacity-80">
              {cityName}
            </h1>
            <h3 className="Region&Country pt-1 text-white font-light text-sm hover:opacity-90 flex flex-col justify-center items-center">
              {region}
              <span className="Country-Span">({country})</span>
            </h3>
          </div>
          <div className="Side-tags">
            <button
              className="Unit-change px-6 py-1 border rounded border-white text-white hover:bg-white hover:text-gray-900 transition"
              onClick={changeTheUnits}
            >
              {unit == true ? "F" : "C"}
            </button>
          </div>
        </div>
        {/* Main Content */}
        <div className="Main-content-container h-4/5 flex justify-center items-center flex-col">
          <div className="Main-content flex justify-center items-center flex-col">
            <h1 className="Main-content-heading text-white text-9xl text-bold">
              {unit == true ? tempC + "C" : tempF + "F"}
              <span className="degree-tag">&deg;</span>
            </h1>
            <div className="Desc w-60 flex justify-center">
              <h2 className="Weather-description text-white text-2xl pt-5">
                {desc}
              </h2>
            </div>
          </div>
          <div className="Search-city-container px-4 py-6 my-6 flex justify-center items-center flex-col rounded-xl bg-white ">
            <h1 className="Search-city-text text-gray-900 text-xl pb-2">
              Search Your City.
            </h1>
            <div className="Search-fun">
              <input
                type="text"
                placeholder="enter your city."
                className="Search-input"
                value={input}
                onChange={inputChange}
              />
              <button
                className="search-button px-1 text-gray-900 hover:bg-gray-300 rounded hover:text-gray-500 transition"
                onClick={buttonChangeInput}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
