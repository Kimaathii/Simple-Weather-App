const searchButton = document.getElementById("btn");
const WeatherCondition = document.getElementById("main");

async function fetchWeatherData(lat, lng) {
  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${lat}%2C${lng}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fef6b3d30dmsh9ad97c2cb93d045p114a4ejsn7035b784fa41",
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

searchButton.addEventListener("click", async () => {
  const userInput = document.getElementById("user-location").value;

  try {
    const result = await getCoordinates(userInput);
    let weatherData = await fetchWeatherData(result.lat, result.lng);
    let h2 = document.createElement("h2");
    h2.innerHTML = `It is ${
      weatherData.current.temp_c
    } degree celsius in ${userInput.toUpperCase()} today`;
    WeatherCondition.appendChild(h2);
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

function getLatAndLngFromApiResult(Coordinates) {
  let lat = Coordinates.results[0].geometry.lat;
  let lng = Coordinates.results[0].geometry.lng;
  return { lat, lng };
}

async function getCoordinates(location) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=83e7e9e8384a4e85bc503cd23ee1cefc`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error("location not found");
    }
    let locator = await response.json();
    return getLatAndLngFromApiResult(locator);
  } catch (error) {
    alert(error);
    throw error;
  }
}
