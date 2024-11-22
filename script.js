const apiKey = '5faa48c868f3ae72f3d0dd2020e0424d'; // API key

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');

    
    weatherResult.innerHTML = '';
    errorMessage.innerText = '';

    if (!city) {
        errorMessage.innerText = 'Please enter a city name.';
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        
        
        let weatherIcon = '';
        if (description.includes('clear')) {
            weatherIcon = '☀️'; 
        } else if (description.includes('cloud')) {
            weatherIcon = '☁️'; 
        } else if (description.includes('rain')) {
            weatherIcon = '🌧️'; 
        } else if (description.includes('snow')) {
            weatherIcon = '❄️'; 
        } else if (description.includes('thunderstorm')) {
            weatherIcon = '⛈️'; 
        } else {
            weatherIcon = '🌈'; 
        }
        
        weatherResult.innerHTML = `
            <h2>${city.toUpperCase()}</h2>
            <p>${weatherIcon} Temperature: ${temperature.toFixed(1)} °C</p>
            <p>Description: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
        `;
    } catch (error) {
        errorMessage.innerText = 'Error: ' + error.message;
    }
}
