















// Search Button

var searchForm = document.getElementById("searchform");

var cityNameForm = document.getElementById("citynameform");

var cityNameListArea = document.getElementById("cityNameList");

function searchFormSubmitted(event) {
    event.preventDefault();
    if (cityNameForm.value) {
        // console.log(cityNameForm.value.toUpperCase());
        var cityNameUppercased = cityNameForm.value.toUpperCase();
        var inputKey = "CityName";
        var inputValue = cityNameUppercased;
        localStorage.setItem(inputKey, inputValue);
        cityNameListArea.innerHTML += "<li>" + cityNameUppercased + "</li>";
    } else {
        alert("Must enter city name!")
    }
}

searchForm.addEventListener("submit", searchFormSubmitted);