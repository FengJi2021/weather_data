let weather = {
    Api: "ae4c976625a8ab3109a5e713cb3922be",
    getWeather: function(city="berlin"){
        fetch("http://api.openweathermap.org/data/2.5/weather?q="
        + city + "&appid="
        + this.Api)
        .then(async (response) =>{
            if (!response.ok){
                const err = new Error(response.status + " No City ");
                err.response = response;
                throw err;
            }
            else{
                data = await response.json();
                this.getInfo(data);
            }
        })
        .catch(err=>{
            alert("city not found");
            console.error('EXCEPTION: ', err)});
    },
    getInfo: function(data){
        const {name} = data;
        const {speed} = data.wind;
        const {temp, humidity} = data.main;
        const {description, icon} = data.weather[0];
        console.log(name, description, icon, temp, humidity, speed);
        document.querySelector(".city").innerText = "City Name: " + name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".description").innerText = "Description " + description;
        document.querySelector(".humidity").innerText = "Humidity " + humidity + " %";
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },
    search: function(){
        city = document.querySelector(".search-bar").value;
        this.getWeather(city);
    }
}
console.log("init");
weather.getWeather();

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
})
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter"){
        weather.search();
    }
});