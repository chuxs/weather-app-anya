import React, { useState } from 'react'
import './WeatherApp.css'
import search_icon from "../Assets/Search.png"
import clear_icon from "../Assets/Sun.png"
import cloud_icon from "../Assets/Cloud.png"
import cloud_na_icon from "../Assets/Cloud NA.png"
import thunder_icon from "../Assets/Thunder Storm.png"
import mist_icon from "../Assets/mist.png"
import drizzle_icon from "../Assets/Drizzle.png"
import rain_icon from "../Assets/Rain.png"
import snow_icon from "../Assets/Snow.png"
import wind_icon from "../Assets/Wind.png"
import humidity_icon from "../Assets/Humidity.png"

const WeatherApp = () => {

    let api_key = "d39107232da6ceb144b5b73d11ae2a87";

    const [initIcon,setIcon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "")
        {
            return 0;
        }

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);

        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-speed");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity+"%";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/hr";
        temperature[0].innerHTML = Math.floor(data.main.temp)+"°c";
        location[0].innerHTML = data.name;

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setIcon(clear_icon);
        }
        else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setIcon(cloud_icon);
        }
        else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setIcon(cloud_na_icon);
        }
        else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
            setIcon(cloud_na_icon);
        }
        else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setIcon(rain_icon);
        }
        else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
            setIcon(drizzle_icon);
        }
        else if (data.weather[0].icon==="11d" || data.weather[0].icon==="11n"){
            setIcon(thunder_icon);
        }
        else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
            setIcon(snow_icon);
        }
        else if (data.weather[0].icon==="50d" || data.weather[0].icon==="50n"){
            setIcon(mist_icon);
        }
    }

  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className="cityInput" placeholder='Search for city'/>
            <div className="search-icon" onClick={()=> {search()}}>
                <img className='search-icon-img' src={search_icon} alt="" />
            </div>
        </div>
        <div className="weather-image">
            <img src={initIcon} alt="" />
        </div>
        <div className="weather-temp">24°c</div>
        <div className="weather-location">London</div>
        <div className="data-container">
            <div className="element">
                <img src={humidity_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="humidity-percent">64%</div>
                    <div className="text">Humidity</div>
                </div>
            </div>
            <div className="element">
                <img src={wind_icon} alt="" className='icon'/>
                <div className="data">
                    <div className="wind-speed">20 km/hr</div>
                    <div className="text">Wind Speed</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp