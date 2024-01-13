//States
let currCity="Chennai";
let units = "metric";

//Selctors
let city = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_datetime");
let weather_forecast = document.querySelector(".weather_forecast");
let weather_temperature = document.querySelector(".weather_temperature");
let weather_icon = document.querySelector(".weather_icon");
let weather_minmax = document.querySelector(".weather_minmax");
let weather_realfeel = document.querySelector(".weather_realfeel");
let weather_humidity = document.querySelector(".weather_humidity");
let weather_wind = document.querySelector(".weather_wind");
let weather_pressure = document.querySelector(".weather_pressure");

//Search

document.querySelector(".weather_search").addEventListener('submit', e=>{
    let search = document.querySelector(".weather_searchform");
    //Prevent default action
    e.preventDefault();
    //Change currCity
    currCity=search.value;
    //get weather forecast
    getWeather();
    //clear form
    search.value=""
})

//Units
document.querySelector(".weather_unit_celsius").addEventListener("click",()=>{
    if(units!=='metric'){
        //change to metric
        units = "metric"
        //get wether forecast
        getWeather()
    }
})
document.querySelector(".weather_unit_fahrenheit").addEventListener("click",()=>{
    if(units!=='imperial'){
        //change to imperila
        units = "imperial"
        //get wether forecast
        getWeather()
    }
})



function convertTimeStamp(timestamp, timezone) {
    const date = new Date(timestamp * 1000);

    // Adjust the date with the timezone offset
    date.setSeconds(date.getSeconds() + timezone);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    };

    return new Intl.DateTimeFormat("en-US", options).format(date);
}



//Convert country code
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(['en'],{type:"region"});
    return regionNames.of(country)
}



function getWeather(){
   const API_KEY='e8cfc1cb1af3e0771527bc980649bce6'
   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {

   city.innerHTML= `${data.name},${ convertCountryCode(data.sys.country)}`
   datetime.innerHTML = convertTimeStamp(data.dt,data.timezone);
   weather_forecast.innerHTML =`<p>${data.weather[0].main} `
   weather_temperature.innerHTML=`${data.main.temp.toFixed()} &#176`
   weather_icon.innerHTML =`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" alt="">` 
   weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
   weather_realfeel.innerHTML =`${data.main.feels_like.toFixed()}&#176`
   weather_humidity.innerHTML =`${data.main.humidity}%`
   weather_wind.innerHTML =`${data.wind.speed} ${units==="imperial"?"mph":"m/s"}`
   weather_pressure.innerHTML =`${data.main.pressure}hPa`



   })
}

document.body.addEventListener('load',getWeather())