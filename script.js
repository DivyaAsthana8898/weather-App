// Select elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");
const errorMessage = document.getElementById("errorMessage");

// actual API key from OpenWeather
const apiKey = "a8fa6a937fb51bb1917f5345e1b5a037";

// Listener for button
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        showError("Please enter a city name.");
        return;
    }
    getWeather(city);
});

// Listener for Enter key
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// Fetch weather data
async function getWeather(city) {

    clearUI();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Extract data from JSON
        const temp = data.main.temp;
        const hum = data.main.humidity;
        const weatherCondition = data.weather[0].description;

        // Update UI
        cityName.textContent = city.toUpperCase();
        temperature.textContent = `🌡 Temperature: ${temp} °C`;
        humidity.textContent = `💧 Humidity: ${hum}%`;
        condition.textContent = `☁ Condition: ${weatherCondition}`;

    } catch (error) {
        showError("City not found. Please try again.");
    }
}

// Show error
function showError(message) {
    errorMessage.textContent = message;
}

// Clear old data
function clearUI() {
    cityName.textContent = "";
    temperature.textContent = "";
    humidity.textContent = "";
    condition.textContent = "";
    errorMessage.textContent = "";
}