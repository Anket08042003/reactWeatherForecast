import React, { useEffect, useState } from "react";
import './index.css';
import cloudy from'./images/cloudy.png'
import snowy from './images/snowy.png'
import rainy from './images/rainy.png'
import sunny from './images/sunny.png'

const WeatherCard = ({ dayData }) => {
  const [randomImageUrl, setRandomImageUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomImage = async () => {
      const category = 'nature'; // Set your desired category
      const apiKey = 'Nh7lHcqzVqzbmjzLJG50gw==IrSVCemi1C2rHLGo'; // Replace with your actual API key

      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/randomimage?category=${category}`, {
          headers: {
            'X-Api-Key': apiKey,
            'Accept': 'image/jpg'
          }
        });

        if (response.ok) {
          const resultBlob = await response.blob();
          const imageUrl = URL.createObjectURL(resultBlob);
          setRandomImageUrl(imageUrl);
        } else {
          setError(`Failed to fetch random image: ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error fetching random image: ${error.message}`);
      }
    };

    fetchRandomImage();
  }, []);
  function weatherType(tp){
    if(tp==="Clouds"){
      return <img style={{ width: '40px', height: '40px' }}src={cloudy}/>
    }
    if(tp==="Snow"){
      return <img style={{ width: '40px', height: '40px' }} src={snowy}/>
    }
    if(tp==="Rain"){
      return <img style={{ width: '40px', height: '40px' }} src={rainy}/>
    }
    if(tp==="Clear"){
      return <img style={{ width: '40px', height: '40px' }} src={sunny}/>
    }
  }

  return (
    <div className="movie">
      <div>
        <p>{dayData.dt_txt}</p>
        <p><b>Humidity: </b>{dayData.main.humidity}%</p>
        
      </div>
    
      <div>
        <img className="weather-image" src={randomImageUrl} alt={dayData.weather.main} />
      </div>

      <div>
        <span>{weatherType(dayData.weather[0].main)}</span><br/>
        <span><b>MIN-TEMP: </b>{Number(dayData.main.temp_min-273.15).toFixed(1)}</span><br/>
        <span><b>MAX-TEMP: </b>{Number(dayData.main.temp_max-273.15).toFixed(1)}</span><br/>
        <h3>{dayData.weather[0].main}</h3>
        <span><b>DESCRIPTION: </b>{dayData.weather[0].description}</span>
      </div>
    </div>
  );
};

export default WeatherCard;


// Nh7lHcqzVqzbmjzLJG50gw==IrSVCemi1C2rHLGo
