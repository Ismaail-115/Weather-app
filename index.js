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

function formatTime(dateTimeString) {
    const date = new Date(dateTimeString);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours} ${ampm}`;
}

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const hourlyData = data.list.slice(0, 8);
        console.log(hourlyData);
        forecastContainer.innerHTML = "";

        hourlyData.forEach(entry => {
            const forecastDiv = document.createElement("div");
            forecastDiv.classList.add("forecast-item");
            
            const time = document.createElement("p");
            time.textContent = formatTime(entry.dt_txt);

            const icon = document.createElement("img");
            icon.src = `https://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`;
            icon.alt = entry.weather[0].description;

            const temp = document.createElement("p");
            temp.textContent = `${entry.main.temp}°C`;

            forecastDiv.appendChild(time);
            forecastDiv.appendChild(icon);
            forecastDiv.appendChild(temp);

            forecastContainer.appendChild(forecastDiv);
        })
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
};