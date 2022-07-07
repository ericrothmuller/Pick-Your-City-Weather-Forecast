// Universal Variables

var searchForm = document.getElementById("searchform");

var cityNameForm = document.getElementById("citynameform");

var cityNameListArea = document.getElementById("cityNameList");

var dateDayOne  = document.getElementById("datedayone");

var cityNameText = document.getElementById("citynametext");

var cityTemperature = document.getElementById("citytemperature");

var cityWind = document.getElementById("citywind");

var cityHumidity = document.getElementById("cityhumidity");

var cityUvIndex = document.getElementById("cityuvindex");

// Day 2 Universal Variables

var dateDayTwo  = document.getElementById("datedaytwo");

var cityTemperatureDayTwo = document.getElementById("citytemperaturedaytwo");

var cityWindDayTwo = document.getElementById("citywinddaytwo");

var cityHumidityDayTwo = document.getElementById("cityhumiditydaytwo");



// Search Button

function searchFormSubmitted(event) {
    event.preventDefault();
    if (cityNameForm.value) {
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

        // City Highlight Display

        function fetchCityInformation(getLocalStorageItem) {
            var openWeatherMapURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityNameForURL + "&units=imperial&appid=2b5118468768fe9e99782fc05eb5171a";
            fetch(openWeatherMapURL).then(function(response) {
                return response.json();
            }).then (function (data) {


                console.log(data);

                dateDataDayOne = data.list[0].dt_txt;
                dateDataDayOneAfterSplit = dateDataDayOne.split(" ")[0];
                dateDayOne.textContent = "- " + dateDataDayOneAfterSplit;

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

                // Another fetch call for Lat and Lon to get UVIndex data

                var getCityLatLonUrl = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=2b5118468768fe9e99782fc05eb5171a";

                fetch(getCityLatLonUrl).then(function(reponseLatLon) {
                    return reponseLatLon.json();
                }).then(function(data) {

                    cityUvFromData = data.value;

                    if (cityUvFromData >= 6) {
                        cityUvIndex.setAttribute("class", "dangeruv");

                    } else if (cityUvFromData <= 2) {
                        cityUvIndex.setAttribute("class", "lowuv");

                    } else {
                        cityUvIndex.setAttribute("class", "moderateuv");
                    }

                    cityUvIndex.textContent = cityUvFromData;
                    
                })

                // 5 Day Forecast Goes Here

                dateDataDayTwo = data.list[8].dt_txt;
                dateDataAfterSplit = dateDataDayTwo.split(" ")[0];
                dateDayTwo.textContent = dateDataAfterSplit;

                cityTemperatureFromDataDayTwo = data.list[8].main.temp + " °F";
                cityTemperatureDayTwo.textContent = cityTemperatureFromDataDayTwo;

                cityWindFromDataDayTwo = data.list[8].wind.speed + " MPH";
                cityWindDayTwo.textContent = cityWindFromDataDayTwo;

                cityHumidityFromDataDayTwo = data.list[8].main.humidity + " %";
                cityHumidityDayTwo.textContent = cityHumidityFromDataDayTwo;


            })
        }
        fetchCityInformation();
        

    }
})
