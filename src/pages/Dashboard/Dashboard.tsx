import React, { useState, useEffect } from "react";
import axios from "axios";


const DisplayWeather: React.FC = () => {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // const googleMapsApiKey = "AIzaSyA9U_OxClr1vEHEdF2FkG_9p6S4Z-GwOvc";
  const openWeatherApiKey = "7bed273636c65f7dac3a56a61049adb0";
  const lat = 17.4065;
  const lng = 78.4772;

  useEffect(() => {
    getWeatherDetails();
  }, []);

  const getWeatherDetails = async () => {
    try {
      // const response = await axios.get(
      //   `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${googleMapsApiKey}`
      // );

      // const { lat, lng } = response.data.results[0].geometry.location;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${openWeatherApiKey}`
      );

      console.log(weatherResponse);

      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  console.log(weatherData, "weatherDataObject");

  const getDate = (secs:number) =>{
    const date = new Date(secs * 1000) ;
    // console.log(date);
    return date
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#f2f2f2",
          padding: "30px",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search city"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            outline: "none",
            width: "350px",
            padding: "8px",
            borderWidth: "0px",
          }}
        />
        <button
          style={{
            backgroundColor: "#48484a",
            color: "#f2f2f2",
            outline: "none",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
            padding: "8px",
            cursor: "pointer",
          }}
          // onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {weatherData && (
        <div style={{ width: "75vw" }}>
          <p><span style={{fontFamily:"roboto",fontWeight:"700"}}>Time</span> : {`${getDate(weatherData["dt"])}`}</p>
          <h1>{weatherData["name"]} {weatherData["sys"]["country"]}</h1>
          <p>Current Temperature : {weatherData["main"]["temp"]} F.</p>
          <p style={{color:"#4D4341"}} >
            Feels like {weatherData["main"]["temp"]} F.   {weatherData["weather"][0]["description"]}
          </p>
          <div style={{ borderLeft: "1px solid #eb6e4b",width:"40vw",display:"flex",paddingBottom:"5px",justifyContent:"space-between" }}>
            <div style={{ paddingLeft: "10px" ,display:"flex",justifyContent:"space-between"}}>
              <div>
                <p>Sunrise :  {`${getDate(weatherData["sys"]["sunrise"])}`}</p>
                <p>Sunset : {`${getDate(weatherData["sys"]["sunset"])}`}</p>
              </div>
            </div>
          </div>
          <div style={{ borderLeft: "1px solid #eb6e4b",width:"40vw",display:"flex",justifyContent:"space-between" }}>
            <div style={{ paddingLeft: "10px" ,display:"flex",justifyContent:"space-between"}}>
              <div>
                <p><span style={{fontWeight:"700",paddingRight:"10px"}} >Longitude</span> :  <span style={{fontSize:"13px"}} >{weatherData["coord"]["lon"]}</span></p>
                <p><span style={{fontWeight:"700",paddingRight:"10px"}} >Latitude</span> : <span style={{fontSize:"13px"}} >{weatherData["coord"]["lat"]}</span> </p>
              </div>
            </div>
          </div>
          <p> <span style={{color:"blue",fontStyle:"oblique",fontWeight:"400"}} > Wind Speed</span> : {weatherData["wind"]["speed"]} m/s </p>
        </div>
      )}
    </div>
  );
};

export default DisplayWeather;
