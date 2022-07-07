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

// Day 3 Universal Variables

var dateDayThree  = document.getElementById("datedaythree");

var cityTemperatureDayThree = document.getElementById("citytemperaturedaythree");

var cityWindDayThree = document.getElementById("citywinddaythree");

var cityHumidityDayThree = document.getElementById("cityhumiditydaythree");

// Day 4 Universal Variables

var dateDayFour  = document.getElementById("datedayfour");

var cityTemperatureDayFour = document.getElementById("citytemperaturedayfour");

var cityWindDayFour = document.getElementById("citywinddayfour");

var cityHumidityDayFour = document.getElementById("cityhumiditydayfour");

// Day 5 Universal Variables

var dateDayFive  = document.getElementById("datedayfive");

var cityTemperatureDayFive = document.getElementById("citytemperaturedayfive");

var cityWindDayFive = document.getElementById("citywinddayfive");

var cityHumidityDayFive = document.getElementById("cityhumiditydayfive");

// Day 6 Universal Variables

var dateDaySix  = document.getElementById("datedaysix");

var cityTemperatureDaySix = document.getElementById("citytemperaturedaysix");

var cityWindDaySix = document.getElementById("citywinddaysix");

var cityHumidityDaySix = document.getElementById("cityhumiditydaysix");





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

                // 5 Day Future Forecast Goes Here

                // 2nd Day Card

                dateDataDayTwo = data.list[8].dt_txt;
                dateDataAfterSplitTwo = dateDataDayTwo.split(" ")[0];
                dateDayTwo.textContent = dateDataAfterSplitTwo;

                cityTemperatureFromDataDayTwo = data.list[8].main.temp + " °F";
                cityTemperatureDayTwo.textContent = cityTemperatureFromDataDayTwo;

                cityWindFromDataDayTwo = data.list[8].wind.speed + " MPH";
                cityWindDayTwo.textContent = cityWindFromDataDayTwo;

                cityHumidityFromDataDayTwo = data.list[8].main.humidity + " %";
                cityHumidityDayTwo.textContent = cityHumidityFromDataDayTwo;

                // 3rd Day Card

                dateDataDayThree = data.list[16].dt_txt;
                dateDataAfterSplitThree = dateDataDayThree.split(" ")[0];
                dateDayThree.textContent = dateDataAfterSplitThree;

                cityTemperatureFromDataDayThree = data.list[16].main.temp + " °F";
                cityTemperatureDayThree.textContent = cityTemperatureFromDataDayThree;

                cityWindFromDataDayThree = data.list[16].wind.speed + " MPH";
                cityWindDayThree.textContent = cityWindFromDataDayThree;

                cityHumidityFromDataDayThree = data.list[16].main.humidity + " %";
                cityHumidityDayThree.textContent = cityHumidityFromDataDayThree;

                // 4th Day Card

                dateDataDayFour = data.list[24].dt_txt;
                dateDataAfterSplitFour = dateDataDayFour.split(" ")[0];
                dateDayFour.textContent = dateDataAfterSplitFour;

                cityTemperatureFromDataDayFour = data.list[24].main.temp + " °F";
                cityTemperatureDayFour.textContent = cityTemperatureFromDataDayFour;

                cityWindFromDataDayFour = data.list[24].wind.speed + " MPH";
                cityWindDayFour.textContent = cityWindFromDataDayFour;

                cityHumidityFromDataDayFour = data.list[24].main.humidity + " %";
                cityHumidityDayFour.textContent = cityHumidityFromDataDayFour;

                // 5th Day Card

                dateDataDayFive = data.list[32].dt_txt;
                dateDataAfterSplitFive = dateDataDayFive.split(" ")[0];
                dateDayFive.textContent = dateDataAfterSplitFive;

                cityTemperatureFromDataDayFive = data.list[32].main.temp + " °F";
                cityTemperatureDayFive.textContent = cityTemperatureFromDataDayFive;

                cityWindFromDataDayFive = data.list[32].wind.speed + " MPH";
                cityWindDayFive.textContent = cityWindFromDataDayFive;

                cityHumidityFromDataDayFive = data.list[32].main.humidity + " %";
                cityHumidityDayFive.textContent = cityHumidityFromDataDayFive;

                // 6th Day Card

                dateDataDaySix = data.list[39].dt_txt;
                dateDataAfterSplitSix = dateDataDaySix.split(" ")[0];
                dateDaySix.textContent = dateDataAfterSplitSix;

                cityTemperatureFromDataDaySix = data.list[39].main.temp + " °F";
                cityTemperatureDaySix.textContent = cityTemperatureFromDataDaySix;

                cityWindFromDataDaySix = data.list[39].wind.speed + " MPH";
                cityWindDaySix.textContent = cityWindFromDataDaySix;

                cityHumidityFromDataDaySix = data.list[39].main.humidity + " %";
                cityHumidityDaySix.textContent = cityHumidityFromDataDaySix;


            })
        }
        fetchCityInformation();
        

    }
    
})
