let recent_searches = ["Moscow","Islambad","New York"]
let weather = {
    "API_KEY":"e66fef6ed2284ffba7d100719220403",
    fetchWeather:function(city){
        fetch("http://api.weatherapi.com/v1/current.json?key=e66fef6ed2284ffba7d100719220403&q="+city+"&aqi=no")
        .then((response)=>response.json()).then((data)=>this.displayWeather(data))
    },
    displayWeather:function(data){
        const {name,localtime} = data.location
        const {condition,humidity,wind_kph,vis_km,temp_c,cloud} = data.current
        document.getElementById("time").innerText = localtime
        document.getElementById("temp").innerText = temp_c+"°"
        document.getElementById("city").innerText = name
        document.getElementById("weather-text").innerText = condition.text
        document.getElementById("weather-symbols").src = condition.icon
        document.getElementById("cloud").innerText = cloud+" %"
        document.getElementById("humidity").innerText = humidity+" %"
        document.getElementById("wind").innerText = wind_kph+" kph"
        document.getElementById("visibility").innerText = vis_km+" km"
    },
    getCity:function(){
        const city = document.getElementById("input").value
        this.fetchWeather(city)
        recent_searches.push(city)
        document.getElementById("search_2").innerText = recent_searches[2]
        document.getElementById("search_3").innerText = recent_searches[3]
        recent_searches.splice(0,1)
        
    },
    getWeather:function(id){
        const city = document.getElementById(id).innerText
        this.fetchWeather(city)
        
    }

}




