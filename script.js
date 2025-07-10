const apiKey = 'Geneate from weatherapi.com';
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const loader = document.getElementById("loader");
  const weatherInfo = document.getElementById("weatherInfo");

  weatherInfo.innerHTML = "";         // Clear previous data
  loader.style.display = "flex";      // Show loader

  const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`;

  fetch(weatherUrl)
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none"; // Hide loader
      const { location, current, forecast } = data;

      const forecastHTML = forecast.forecastday.map(day => {
        const date = new Date(day.date).toLocaleDateString("en-US", { weekday: 'short' });
        return `
          <div class="forecast-card">
            <img src="${day.day.condition.icon}" alt="icon">
            <div>${day.day.maxtemp_c}°C</div>
            <div>${date}</div>
          </div>
        `;
      }).join("");

      weatherInfo.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <div>${new Date(location.localtime).toDateString()}</div>
        <img src="${current.condition.icon}" alt="weather">
        <div class="तापमान">🌡️ ${current.temp_c}°C</div>
        <div class="हालात"> ${current.condition.text}</div>

        <div class="details">
          <div>💧 नमी / Humidity: ${current.humidity}%</div>
          <div>🌬️ हवा / Wind: ${current.wind_kph} km/h</div>
        </div>

        <div class="forecast">
          ${forecastHTML}
        </div>
      `;
    })
    .catch(() => {
      loader.style.display = "none";
      weatherInfo.innerHTML = `<p>❌ City not found.</p>`;
    });
}

window.addEventListener("DOMContentLoaded", () => {
  fetchWeather("Madhubani");
});
