








// City Name Display





// Search Button

var searchForm = document.getElementById("searchform");

var cityNameForm = document.getElementById("citynameform");

var cityNameListArea = document.getElementById("cityNameList");

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
        // console.log(element);
        // console.log(getDataIDValue);
        var getLocalStorageItem = localStorage.getItem(getDataIDValue);
        console.log(getLocalStorageItem);
    }
})
