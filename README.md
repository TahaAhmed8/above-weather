#  Above Weather

> A modern, glassmorphic weather dashboard with real-time weather data, forecasts, geolocation, and interactive 3D animations.

<p align="center">
  <a href="https://above-weather.vercel.app">
    <strong>🌐 Live Demo</strong>
  </a>
</p>

---

##  Overview

**Above Weather** is a responsive weather dashboard designed to provide essential weather information through a clean, modern, and interactive interface.

The application uses the **OpenWeatherMap API** to retrieve real-time weather conditions and 5-day forecasts. It also supports browser-based geolocation, allowing users to quickly check the weather at their current location.

The interface is built around a **glassmorphism design**, with smooth animations and an interactive 3D card flip for switching between Celsius and Fahrenheit.

🔗 **Live Demo:** https://above-weather.vercel.app

---

##  Features

###  Real-Time Weather Data

View current weather conditions including:

* 🌡️ Temperature
* 🤝 Feels-like temperature
* 💧 Humidity
* 💨 Wind speed
* 🌅 Sunrise time
* 🌇 Sunset time
* ☁️ Current weather condition

###  5-Day Forecast

Get a quick overview of upcoming weather conditions with:

* Daily weather conditions
* Weather icons
* Temperature ranges
* Easy-to-read forecast cards

### 📍 Geolocation

Use your browser's location to instantly retrieve weather information for your current location.

###  Interactive Unit Switcher

Switch between:

* Celsius (°C)
* Fahrenheit (°F)

The temperature unit selector uses a **3D card-flip animation** for a more interactive experience.

###  Serverless API Proxy

API requests are handled through a **Vercel Serverless Function**, keeping the OpenWeatherMap API key on the server rather than exposing it directly in the frontend.

###  Responsive Design

The dashboard is optimized for:

* 💻 Desktop
* 📱 Mobile
* 📲 Tablet

###  Glassmorphism UI

The interface uses a modern glassmorphic visual style featuring:

* Translucent cards
* Backdrop blur
* Soft shadows
* Rounded components
* Smooth transitions
* Responsive layouts

---

##  Tech Stack

| Technology             | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| **HTML5**              | Semantic page structure                     |
| **CSS3**               | Styling, responsive layouts & glassmorphism |
| **JavaScript (ES6+)**  | Application logic & interactivity           |
| **OpenWeatherMap API** | Weather and forecast data                   |
| **Vercel**             | Hosting & serverless API functions          |

### Frontend

* HTML5
* CSS3
* CSS Grid
* Flexbox
* JavaScript ES6+

### Backend / API

* Vercel Serverless Functions
* OpenWeatherMap REST API

---

##  Project Structure

```text
above-weather/
│
├── api/
│   └── weather.js          # Serverless API proxy
│
├── images/
│   └── ...                 # Weather icons and other assets
│
├── index.html              # Main application markup
├── style.css               # Styling and responsive design
├── script.js               # API calls and application logic
│
└── README.md
```

##  Deployment

The project is designed to be deployed on **Vercel** with minimal configuration.

No additional build configuration is required.

---

##  API

Weather data is provided by the **OpenWeatherMap API**.

The application uses:

* **Current Weather API** — for current weather conditions
* **5 Day / 3 Hour Forecast API** — for forecast data

🔗 [OpenWeatherMap API Documentation](https://openweathermap.org/api)

---

##  Security

The OpenWeatherMap API key is **not stored in the frontend code**.

Instead, requests are routed through:

```text
Frontend
   │
   ▼
Vercel Serverless Function
   │
   ▼
OpenWeatherMap API
   │
   ▼
Weather Data
```

This prevents the API key from being directly exposed to users through the browser.

---

##  Design

Above Weather follows a **glassmorphism-inspired design language** focused on simplicity and visual feedback.

Key design elements include:

* Frosted glass cards
* Blurred backgrounds
* Soft gradients
* Rounded corners
* Subtle shadows
* Smooth hover effects
* 3D flip animations
* Responsive layouts

The goal is to keep weather information **easy to scan while maintaining an engaging visual experience**.

---

---

##  Author

**Taha Ahmed**

If you found this project interesting, consider giving the repository a ⭐ on GitHub!

---
