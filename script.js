
let currentUnit = "metric";
let celsiusTemp = null;
let celsiusFeelsLike = null;
let forecastDataCache = [];
let lastQuery = { type: "coords", value: null };

// Elements
const card = document.querySelector("#weather-card");
const searchInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const geoBtn = document.querySelector("#geo-btn");
const weatherIcon = document.querySelector(".weather-icon");
const weatherBox = document.querySelector(".weather");
const errorBox = document.querySelector(".error");
const errorMsg = document.querySelector("#error-msg");
const loadingBox = document.querySelector(".loading");

const tempCard = document.querySelector("#temp-card");
const tempFront = document.querySelector(".temp");
const tempBack = document.querySelector(".temp-alt");
const feelsLikeText = document.querySelector("#feels-like");
const windText = document.querySelector(".wind");
const sunriseText = document.querySelector("#sunrise-time");
const sunsetText = document.querySelector("#sunset-time");
const forecastContainer = document.querySelector("#forecast-container");

const unitC = document.querySelector("#unit-c");
const unitF = document.querySelector("#unit-f");

const iconMap = {
  Clouds: "images/clouds.png",
  Clear: "images/clear.png",
  Rain: "images/rain.png",
  Drizzle: "images/drizzle.png",
  Mist: "images/mist.png",
  Haze: "images/mist.png",
  Fog: "images/mist.png"
};

function toFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}

function formatTime(unixSec, timezoneOffsetSec) {
  const date = new Date((unixSec + timezoneOffsetSec) * 1000);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${ampm}`;
}

function updateDisplayTemperatures() {
  if (celsiusTemp === null) return;

  const fahrenheit = toFahrenheit(celsiusTemp);
  const feelsLikeF = toFahrenheit(celsiusFeelsLike);

  tempFront.textContent = `${Math.round(celsiusTemp)}°C`;
  tempBack.textContent = `${fahrenheit}°F`;

  feelsLikeText.textContent = currentUnit === "metric" 
    ? `Feels like ${Math.round(celsiusFeelsLike)}°C`
    : `Feels like ${feelsLikeF}°F`;

  renderForecastCards();
}

function renderForecastCards() {
  forecastContainer.innerHTML = "";
  forecastDataCache.forEach(item => {
    const tempDisplay = currentUnit === "metric" 
      ? `${Math.round(item.temp)}°C` 
      : `${toFahrenheit(item.temp)}°F`;

    const iconSrc = iconMap[item.condition] || "images/clear.png";

    const fCard = document.createElement("div");
    fCard.className = "forecast-card";
    fCard.innerHTML = `
      <p class="day">${item.day}</p>
      <img src="${iconSrc}" alt="${item.condition}" />
      <p class="f-temp">${tempDisplay}</p>
    `;
    forecastContainer.appendChild(fCard);
  });
}

async function fetchForecast(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();

    const dailyMap = {};
    data.list.forEach(reading => {
      const date = reading.dt_txt.split(" ")[0];
      const time = reading.dt_txt.split(" ")[1];
      if (!dailyMap[date] || time === "12:00:00") {
        dailyMap[date] = reading;
      }
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    forecastDataCache = Object.values(dailyMap).slice(0, 5).map(reading => {
      const d = new Date(reading.dt * 1000);
      return {
        day: days[d.getDay()],
        temp: reading.main.temp,
        condition: reading.weather[0].main
      };
    });

    renderForecastCards();
  } catch (err) {
    console.error("Forecast error:", err);
  }
}

async function fetchWeatherData(currentUrl, forecastUrl) {
  loadingBox.style.display = "block";
  card.classList.add("active");
  weatherBox.style.display = "none";
  errorBox.style.display = "none";
  
  try {
    const response = await fetch(currentUrl);
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || "City not found");
    }

    const data = await response.json();

    const condition = data.weather[0].main;
    card.className = `card ${condition.toLowerCase()}`;

    celsiusTemp = data.main.temp;
    celsiusFeelsLike = data.main.feels_like;
    updateDisplayTemperatures();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;

    const speed = currentUnit === "metric" 
      ? `${data.wind.speed} km/h` 
      : `${Math.round(data.wind.speed * 0.621371)} mph`;
    windText.textContent = speed;

    sunriseText.textContent = formatTime(data.sys.sunrise, data.timezone);
    sunsetText.textContent = formatTime(data.sys.sunset, data.timezone);

    weatherIcon.src = iconMap[condition] || "images/clear.png";

    await fetchForecast(forecastUrl);

    weatherBox.style.display = "block";
  } catch (err) {
    errorMsg.textContent = err.message;
    errorBox.style.display = "block";
  } finally {
    loadingBox.style.display = "none";
  }
}

function getWeatherByCity(city) {
  if (!city.trim()) return;
  lastQuery = { type: "city", value: city };
  const currentUrl = `/api/weather?type=weather&city=${encodeURIComponent(city)}`;
  const forecastUrl = `/api/weather?type=forecast&city=${encodeURIComponent(city)}`;
  fetchWeatherData(currentUrl, forecastUrl);
}

function getWeatherByCoords(lat, lon) {
  lastQuery = { type: "coords", value: { lat, lon } };
  const currentUrl = `/api/weather?type=weather&lat=${lat}&lon=${lon}`;
  const forecastUrl = `/api/weather?type=forecast&lat=${lat}&lon=${lon}`;
  fetchWeatherData(currentUrl, forecastUrl);
}

// User Actions
searchBtn.addEventListener("click", () => getWeatherByCity(searchInput.value));
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeatherByCity(searchInput.value);
});

geoBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    err => alert(`Unable to retrieve location: ${err.message}`)
  );
});

// Flip animations on Unit Toggles
unitC.addEventListener("click", () => {
  if (currentUnit === "metric") return;
  currentUnit = "metric";
  unitC.classList.add("active");
  unitF.classList.remove("active");
  tempCard.classList.remove("flipped");
  updateDisplayTemperatures();
});

unitF.addEventListener("click", () => {
  if (currentUnit === "imperial") return;
  currentUnit = "imperial";
  unitF.classList.add("active");
  unitC.classList.remove("active");
  tempCard.classList.add("flipped");
  updateDisplayTemperatures();
});

// Initial boot: detects location or stays clean
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    () => searchInput.focus(),
    { timeout: 7000 }
  );
} else {
  searchInput.focus();
}