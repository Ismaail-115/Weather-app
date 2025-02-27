const apiKey = 'adf5d06946f258229651003d5d3c72df';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const cityDropdown = document.getElementById('cityDropdown');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const forecastContainer = document.getElementById ("hourlyForecast");

searchButton.addEventListener('click', () => {
    const location = cityDropdown.value;
    if (location) {
        fetchWeather(location);
    }
});

fetch("major_cities.json")
    .then(response => response.json())
    .then(cities => {
        console.log("Cities loaded:", cities);
        if (!cityDropdown) {
            console.error("Dropdown element not found");
        }

        cities.forEach(city => {
            let option = document.createElement("option");
            option.value = city.name;
            option.textContent = `${city.name}, ${city.country}`;
            cityDropdown.appendChild(option);
        });
    })
    .catch(error => console.error("Error loading city list:", error));


function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const hourlyData = data.list.slice(0, 8);
        console.log(hourlyData);
        forecastContainer.innerHTML = "";

        hourlyData.forEach(entry => {
            const forecastElement = document.createElement("p");
            forecastElement.textContent = `${entry.dt_txt}: ${entry.main.temp}°C - ${entry.weather[0].description}`;
            forecastContainer.appendChild(forecastElement);
        })
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
};