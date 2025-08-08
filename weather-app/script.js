const apiKey = "695038dcb182962029c8d40b136796a1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";


const searchBox = document.querySelector(".search input");

const btn = document.querySelector(".search button");

const icon = document.querySelector(".weather-icon");

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    
        if(data.weather[0].main == "Clouds"){
            icon.src = "clouds.png";
        }
        else if(data.weather[0].main == "Clear"){
            icon.src = "clear.png";
        }
        else if(data.weather[0].main == "Drizzle"){
            icon.src = "drizzle.png";
        }
        else if(data.weather[0].main == "Mist"){
            icon.src = "mist.png";
        }
        else if(data.weather[0].main == "Rain"){
            icon.src = "rain.png";
        }
        else if(data.weather[0].main == "Snow"){
            icon.src = "snow.png";
        }
        
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

btn.addEventListener("click", () => {
    checkWeather(searchBox.value);
} )

searchBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
