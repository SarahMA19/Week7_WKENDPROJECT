let weather = {
    "apiKey" : "c84a989518e07ed51c7fceddbcc61068",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=Imperial&appid="
            + this.apiKey
        )

        .then((response) => response.json())
        .then((data) => this.showWeather(data));
    },
    showWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity} = data.main;
        const { all } = data.clouds;
        const { sunrise, sunset} = data.sys 
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerHTML = (Math.round(temp)) + " °F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".clouds").innerText = "Clouds: " + (Math.round(all)) + " %";
        document.querySelector(".sunrise").innerHTML = "Sunrise: " + moment(sunrise * 1000).format('h:mm a');
        document.querySelector(".sunset").innerHTML = "Sunset: " + moment(sunset * 1000).format('h:mm a');
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function (){
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event){
    if (event.key == "Enter") {
        weather.search();
    }
})

// weather.fetchWeather("Seattle");

