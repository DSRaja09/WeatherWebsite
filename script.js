// declaring all the constants
const weatherform = document.querySelector(".WeatherForm");
const entercity = document.querySelector(".EnterCity");
const displayweather = document.querySelector(".DisplayWeather")
const apikey = "25a654f914a281cc330449f638a4108e";

//Once hit submit this function gets called
weatherform.addEventListener("submit", async event => {
    event.preventDefault();
    const city = entercity.value; // the value of the city is now saved
    if (city) {
        try {
            const weatherinfo = await GetData(city); // getting the json file
            DisplayWeatherDetails(weatherinfo); //using the json file info to display the weather
        }
        catch (error) {
            console.error(error);
            displayError(error); // if the city cannot be saved
        }
    }
    else {
        displayError("Please enter city name"); // if empty
    }
});
async function GetData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl); // geting the josn file

    if (!response.ok) {
        throw new Error("Invalid City Name");
    }
    return await response.json(); // returning it
}
function DisplayWeatherDetails(data) {
    const { name: city,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;
    // the parameter is basically an object and so inputing those value in city, temp
    // humidity...

    displayweather.textContent = ""; // removing previous content
    displayweather.style.display = "flex"; // or block

    //Creating the variables with thier element type
    const city_name = document.createElement("h2");
    const temp_found = document.createElement("p");
    const humidity_found = document.createElement("p");
    const decs_found = document.createElement("p");
    const emogi_found = document.createElement("p");

    //inputing the variables in  the new elements formed
    city_name.textContent = city;
    temp_found.textContent = `${(((temp - 273.15) * (9 / 5)) + 32).toFixed(1)} F`;
    humidity_found.textContent = `humidity: ${humidity}`;
    decs_found.textContent = description;
    emogi_found.textContent = getEmogi(id); // The emogi needs different function

    // adding CSS styling
    city_name.classList.add("cityDisplay");
    temp_found.classList.add("tempDisplay");
    humidity_found.classList.add("humidityDisplay");
    decs_found.classList.add("decsDisplay");
    emogi_found.classList.add("emogiDisplay");

    // display
    displayweather.appendChild(city_name);
    displayweather.appendChild(temp_found);
    displayweather.appendChild(humidity_found);
    displayweather.appendChild(decs_found);
    displayweather.appendChild(emogi_found);

}

//getting emogies using its name
function getEmogi(id) {
    switch (true) {
        case (id >= 200 && id < 300):
            return "⛈️";
        case (id >= 300 && id < 400):
            return "🌦️";
        case (id >= 500 && id < 600):
            return "🌧️";
        case (id >= 600 && id < 700):
            return "❄️";
        case (id >= 700 && id < 800):
            return "🌫️";
        case (id === 800):
            return "☀️";
        case (id >= 801 && id < 810):
            return "☁️";
    }
}

//No display error message
function displayError(message) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("errorDisplay");

    displayweather.textContent = "";
    displayweather.style.display = "flex";
    displayweather.appendChild(errorMessage);
}