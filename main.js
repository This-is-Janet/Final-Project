const apiKey = "85043daf377b046a87b35ad33ee707f7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const otherAudio = new Audio("audio/other.mp3");
const clearAudio = new Audio("audio/clear.mp3");
const rainAudio = new Audio("audio/light-rain.mp3");
let currentAudio;

async function checkWeather(city) {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".details").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name; //讓有class="city"的element變成data.name的值
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";
    
        if(currentAudio){
            currentAudio.pause();
            currentAudio.currentTime = 0;
        };

        if(data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
            currentAudio = otherAudio;
        } else if(data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
            currentAudio = clearAudio;
        } else if(data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png"
            currentAudio = rainAudio;
        } else if(data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png"
            currentAudio = rainAudio;
        } else if(data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png"
            currentAudio = otherAudio;
        } else if(data.weather[0].main == "Snow") {
            weatherIcon.src = "images/snow.png"
            currentAudio = otherAudio;
        };

        console.log(data);
    
        currentAudio.play();


        document.querySelector(".error").style.display = "none";
        document.querySelector(".details").style.display = "flex";
    }
};

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})


const audioBtn = document.querySelector(".audio");
const audioIcon = document.querySelector(".audio-icon");

audioBtn.addEventListener("click", () => {
    if (currentAudio.paused === false) {
        currentAudio.pause();
        audioIcon.src = "images/mute.png";
    } else {
        currentAudio.play();
        audioIcon.src = "images/play.png";
    }
})
