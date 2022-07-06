// Universal Variables

var searchForm = document.getElementById("searchform");

var cityNameForm = document.getElementById("citynameform");

var cityNameListArea = document.getElementById("cityNameList");

var cityNameText = document.getElementById("citynametext");

var cityTemperature = document.getElementById("citytemperature");

var cityWind = document.getElementById("citywind");

var cityHumidity = document.getElementById("cityhumidity");

var cityUvIndex = document.getElementById("cityuvindex");



// Search Button

function searchFormSubmitted(event) {
    event.preventDefault();
    if (cityNameForm.value) {
        // console.log(cityNameForm.value.toUpperCase());
        var cityNameUppercased = cityNameForm.value.toUpperCase();
        var inputKey = cityNameUppercased.split('').filter(e => e.trim().length).join('');
        var inputValue = cityNameUppercased;
        localStorage.setItem(inputKey, inputValue);
        cityNameListArea.innerHTML += '<button class="citybutton" data-id="' + cityNameUppercased.split('').filter(e => e.trim().length).join('') + '" >' + cityNameUppercased + "</button>";
    } else {
        alert("Must enter city name!")
    }
}

searchForm.addEventListener("submit", searchFormSubmitted);

// City Button

cityNameListArea.addEventListener("click", function(event) {
    var element = event.target;

    if (element.matches("button") === true) {
        var getDataIDValue = element.getAttribute("data-id");
        var getLocalStorageItem = localStorage.getItem(getDataIDValue);
        var cityNameForURL = getLocalStorageItem.replace(/ /g, '+');
        console.log(cityNameForURL);

        // City Highlight Display

        function fetchCityInformation(getLocalStorageItem) {
            var openWeatherMapURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameForURL + "&units=imperial&appid=2b5118468768fe9e99782fc05eb5171a";
            fetch(openWeatherMapURL).then(function(response) {
                return response.json();
            }).then (function (data) {

                cityNameFromData = data.city.name;
                cityNameText.textContent = cityNameFromData;
                
                cityTemperatureFromData = data.list[0].main.temp + " °F";
                cityTemperature.textContent = cityTemperatureFromData;

                cityWindFromData = data.list[0].wind.speed + " MPH";
                cityWind.textContent = cityWindFromData;

                cityHumidityFromData = data.list[0].main.humidity + " %";
                cityHumidity.textContent = cityHumidityFromData;

                var cityLat = data.city.coord.lat;
                var cityLon = data.city.coord.lon;

                var getCityLatLonUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=2b5118468768fe9e99782fc05eb5171a";

                fetch(getCityLatLonUrl).then(function(reponseLatLon) {
                    return reponseLatLon.json();
                }).then(function(data) {

                    cityUvFromData = data.value;
                    cityUvIndex.textContent = cityUvFromData;
                    
                })




            })
                



        }
        fetchCityInformation();
    }
})
