const apiKey = 'adf5d06946f258229651003d5d3c72df';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const hourlyData = data.list.slice(0, 8);
        console.log(hourlyData);
    });
    
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });
}



