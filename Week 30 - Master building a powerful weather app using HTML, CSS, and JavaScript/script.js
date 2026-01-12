WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?appid=key&q=`;
WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?appid=key&exclude=minutely&units=metric&`;

const userLocation = document.getElementById("userLocation"),
  converter = document.getElementById("converter"),
  Forecast = document.querySelector(".Forecast"),
  weatherIcon = document.querySelector(".weatherIcon"),
  date = document.querySelector(".date"),
  temperature = document.querySelector(".temperature"),
  feelsLike = document.querySelector(".feelsLike"),
  description = document.querySelector(".description"),
  city = document.querySelector(".city"),
  HValue = document.getElementById("HValue"),
  WValue = document.getElementById("WValue"),
  SRValue = document.getElementById("SRValue"),
  SSValue = document.getElementById("SSValue"),
  CValue = document.getElementById("CValue"),
  UVValue = document.getElementById("UVValue"),
  PValue = document.getElementById("PValue");

function findUserLocation() {
  Forecast.innerHTML = "";
  fetch(WEATHER_API_ENDPOINT + userLocation.value)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.cod != "" && data.cod != "200") {
        alert(data.message);
        return;
      }

      city.innerHTML = data.name + ", " + data.sys.country;
      weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
      fetch(
        WEATHER_DATA_ENDPOINT + `lon=${data.coord.lon}&lat=${data.coord.lat}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          temperature.innerHTML = TemperatureConverter(data.current.temp);

          const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };
          date.innerHTML = getLongFormatUnixTime(
            data.current.dt,
            data.timezone_offset,
            options
          );
          feelsLike.innerHTML =
            "Feels like " + TemperatureConverter(data.current.feels_like);
          description.innerHTML =
            `<i class="fa-brands fa-cloudversify"></i> &nbsp;` +
            data.current.weather[0].description;

          HValue.innerHTML =
            Math.round(data.current.humidity) + `<span>%</span>`;
          WValue.innerHTML =
            Math.round(data.current.wind_speed) + `<span>m/s</span>`;

          const options1 = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          };
          SRValue.innerHTML = getLongFormatUnixTime(
            data.current.sunrise,
            data.timezone_offset,
            options1
          );
          SSValue.innerHTML = getLongFormatUnixTime(
            data.current.sunset,
            data.timezone_offset,
            options1
          );
          CValue.innerHTML = data.current.clouds + `<span>%</span>`;
          UVValue.innerHTML = data.current.uvi;
          PValue.innerHTML = data.current.pressure + `<span>hPa</span>`;

          data.daily.forEach((weather) => {
            let div = document.createElement("div");
            const options = {
              weekday: "long",
              month: "long",
              day: "numeric",
            };
            let daily = getLongFormatUnixTime(weather.dt, 0, options).split(
              " at "
            );
            div.innerHTML += daily[0];
            div.innerHTML += `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" />`;
            div.innerHTML += `<p class="forecast-desc">${weather.weather[0].description}</p>`;
            div.innerHTML += `<span><span>${TemperatureConverter(
              weather.temp.max
            )}</span>  &nbsp;&nbsp; 
              <span>${TemperatureConverter(weather.temp.min)}</span></span>`;
            Forecast.append(div);
          });
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function formatUnixTime(epochTime, utcOffsetSeconds, options = {}) {
  const date = new Date((epochTime + utcOffsetSeconds) * 1000);
  return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

function getLongFormatUnixTime(epochTime, utcOffsetSeconds, options) {
  return formatUnixTime(epochTime, utcOffsetSeconds, options);
}

function TemperatureConverter(temp) {
  let cTemp = Math.round(temp);
  let message = "";
  if (converter.value == "°C") {
    message = cTemp + " <span>" + "\xB0C</span>";
  } else {
    var cTof = (cTemp * 9) / 5 + 32;
    message = cTof + " <span>" + "\xB0F</span>";
  }
  return message;
}
