import React from "react";
import Info from "./components/info.js";
import Form from "./components/form.js";
import Weather from "./components/weather.js";

const API_KEY = "d1098597c23d462bfd63d349136bb810";

class App extends React.Component{

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

  gettingWeather = async (event) => {
    event.preventDefault();
    var city = event.target.elements.city.value;
    
    if(city){
       const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
       const data = await api_url.json();

       var sunset = data.sys.sunset;
       var date = new Date();
       date.setTime(sunset);
       var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

       this.setState({
         temp: data.main.temp,
         city: data.name,
         country: data.sys.country,
         pressure: data.main.pressure,
         sunset: sunset_date,
         error: undefined
       });
     } else {
       this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
       });
     }
   }

  render(){
    return(
      <div className = "wrapper">
        <Info />
        <Form weatherMethod={this.gettingWeather} />
        <Weather
           temp = {this.state.temp}
           city = {this.state.city}
           country = {this.state.country}
           pressure = {this.state.pressure}
           sunset = {this.state.sunset}
           error = {this.state.error}
        />
      </div>
    );
  }
}
export default App;