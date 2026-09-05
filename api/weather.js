export default async function handler(req, res) {
  const { city, lat, lon, type } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ message: "API key is not configured on the server" });
  }

  const endpoint = type === "forecast" ? "forecast" : "weather";
  let url = "";

  if (city) {
    url = `https://api.openweathermap.org/data/2.5/${endpoint}?units=metric&q=${encodeURIComponent(city)}&appid=${apiKey}`;
  } else if (lat && lon) {
    url = `https://api.openweathermap.org/data/2.5/${endpoint}?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  } else {
    return res.status(400).json({ message: "Missing location parameters" });
  }

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    // Ensure status code is a valid integer (e.g., 200, 404, 401)
    const statusCode = Number(apiResponse.status) || 500;
    return res.status(statusCode).json(data);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch weather data" });
  }
}