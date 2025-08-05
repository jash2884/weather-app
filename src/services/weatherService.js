// --- API KEYS ---
// Read keys from environment variables provided by Vercel
const OPENWEATHER_API_KEY = import.meta.env.eafe85d40a100f8bf966deb9cf9b6cd9;
const UNSPLASH_ACCESS_KEY = import.meta.env
  .uQ8P7tAHW7djnPO0rTTRxb4bLZPoGJt2Fj4T9DKThBc;

// --- API ENDPOINTS ---
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather`;
const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast`;
const UNSPLASH_API_URL = `https://api.unsplash.com/search/photos`;

/**
 * Fetches current weather and 5-day forecast data from OpenWeatherMap.
 */
export const fetchWeatherData = async (city) => {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${FORECAST_API_URL}?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
      ),
    ]);

    if (!weatherResponse.ok) {
      throw new Error("City not found. Please try again.");
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Filter to get one forecast per day
    const dailyForecasts = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    return { weatherData, forecastData: dailyForecasts };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
};

/**
 * Fetches a collection of background images from Unsplash based on a query.
 */
export const fetchBackgroundImages = async (query) => {
  try {
    const response = await fetch(
      `${UNSPLASH_API_URL}?query=${query}&per_page=10&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch images from Unsplash.");
    }
    const data = await response.json();
    // Return an array of regular-sized image URLs
    return data.results.map((photo) => photo.urls.regular);
  } catch (error) {
    console.error("Failed to fetch background images:", error);
    // Return a default image or an empty array in case of an error
    return [];
  }
};
