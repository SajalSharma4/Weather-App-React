import React, { useState } from "react";
import "./weather.css";
import DisplayWeather from "./DisplayWeather";
function Weather(){

  const APIKEY="594d01dca7974388aa1c617ba744512b";

  const [form,setForm]=useState({
    city:"",
    country:""
  })

  const [weather,setWeather] = useState([])

  async function weatherData(e){
    e.preventDefault();
    if(form.city==="" || form.country===""){
      alert("Please enter your city and country");
    }else{
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q= ${form.city},${form.country}&appid=${APIKEY}`
        ).then((res) => res.json())
        .then((data) => data);

        setWeather(
          {
            data: data
          }
        );
    }
  }

  const handleChange= (e) => {
    let name=e.target.name;
    let value=e.target.value;
    if(name==="city"){
      setForm({...form,city:value})
    }
    if(name==="country"){
      setForm({...form,country:value})
    }
  }

  return (
    <div className="weather">
    <span className="title">Weather App</span>
    <p className="subtitle">Get Latest Weather details of your city</p>

    <br/>
    <form>
      <input type="text" name="city" placeholder="City" onChange={e=>handleChange(e)}/>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <input type="text" name="country" placeholder="Country" onChange={e=>handleChange(e)}/>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button className="getweather" onClick={(e)=>weatherData(e)}>Get Weather</button>
    </form>

    {
      weather.data!==undefined ? 
      <div>
        <br/>
        <hr/>
        <DisplayWeather data={weather.data}/>
      </div>
      :null
    }
    </div>
    );
}

export default Weather;