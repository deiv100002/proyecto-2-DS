const CLIENT_ID =
  process.env.EXPO_PUBLIC_XWEATHER_CLIENT_ID;

const CLIENT_SECRET =
  process.env.EXPO_PUBLIC_XWEATHER_CLIENT_SECRET;

const BASE_URL =
  'https://data.api.xweather.com/conditions';

export type WeatherData = {
  city: string;
  state: string;
  country: string;
  temperature: number;
  feelsLike: number;
  weather: string;
  humidity: number;
  windSpeed: number;
};

export async function getWeather(
  location: string,
  date: string
): Promise<WeatherData> {
  try {
    const formattedLocation = location
      .trim()
      .replace(/\s+/g, '+');

    const url =
      `${BASE_URL}/${formattedLocation}` +
      `?for=${encodeURIComponent(date)}` +
      `&client_id=${CLIENT_ID}` +
      `&client_secret=${CLIENT_SECRET}`;

    console.log(
      'REQUEST LOCATION:',
      formattedLocation
    );

    console.log(
      'REQUEST DATE:',
      date
    );

    const response = await fetch(url);

    const json = await response.json();

    console.log(
      'XWEATHER RESPONSE:',
      JSON.stringify(json, null, 2)
    );

    if (!response.ok) {
      throw new Error(
        `Weather API error: ${response.status}`
      );
    }

    if (!json.success) {
      throw new Error(
        json.error?.description ||
          'Xweather API request failed.'
      );
    }

    if (!json.response?.length) {
      throw new Error(
        'No weather information was found.'
      );
    }

    const result = json.response[0];
    const period = result.periods?.[0];

    if (!period) {
      throw new Error(
        'Weather data is unavailable.'
      );
    }

    return {
      city: result.place?.name ?? location,
      state: result.place?.state ?? '',
      country: result.place?.country ?? '',
      temperature: period.tempC,
      feelsLike: period.feelslikeC,
      weather: period.weather,
      humidity: period.humidity,
      windSpeed: period.windSpeedKPH,
    };
  } catch (error) {
    console.error(
      'WEATHER SERVICE ERROR:',
      error
    );

    throw error;
  }
}