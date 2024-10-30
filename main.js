// lets hunt the elements
let search = document.querySelector(".search-box input");
let btnSearch = document.getElementById("searchBtn");
let tempEle = document.querySelector(".weather div .temp");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");
let weather = document.querySelector(".weather");
let imageWeather = document.querySelector(".weather div img");
let apiKey = "de2c63a573006b765f64ffccb278914f";

// Default Settings
function defaultCSettings() {
  let defaultCity;
  let ip;
  fetch("https://api.ipify.org?format=json")
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      ip = res.ip;
      // get The city
      fetch(
        `http://api.ipstack.com/${ip}?access_key=8bfe1ca814f033cd9e2fa9c96660fcb0`
      )
        .then((city) => city.json())
        .then((city) => {
          defaultCity = city.city;
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${apiKey}`
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              switch (res.weather[0].main) {
                case "Clouds":
                  imageWeather.setAttribute("src", "images/clouds.png");
                  break;
                case "Clear":
                  imageWeather.setAttribute("src", "images/clear.png");
                  break;
                case "Drizzle":
                  imageWeather.setAttribute("src", "images/drizzle.png");
                  break;
                case "Mist":
                  imageWeather.setAttribute("src", "images/mist.png");
                  break;
                case "Rain":
                  imageWeather.setAttribute("src", "images/rain.png");
                  break;
                case "Snow":
                  imageWeather.setAttribute("src", "images/snow.png");
                  break;
              }
              tempEle.textContent = `${res.main.temp}°C`;
              humidity.textContent = `${res.main.humidity}%`;
              wind.textContent = `${res.wind.speed} km/h`;
              document.querySelector(".weather div h2").textContent =
                defaultCity;
            });
        })
        .catch((reasonError) => {
          console.log("They Have The error: " + Error(reasonError));
        });
    });
}
defaultCSettings();
// end Default Settings
btnSearch.onclick = () => {
  let city = search.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      switch (res.weather[0].main) {
        case "Clouds":
          imageWeather.setAttribute("src", "images/clouds.png");
          break;
        case "Clear":
          imageWeather.setAttribute("src", "images/clear.png");
          break;
        case "Drizzle":
          imageWeather.setAttribute("src", "images/drizzle.png");
          break;
        case "Mist":
          imageWeather.setAttribute("src", "images/mist.png");
          break;
        case "Rain":
          imageWeather.setAttribute("src", "images/rain.png");
          break;
        case "Snow":
          imageWeather.setAttribute("src", "images/snow.png");
          break;
      }
      tempEle.textContent = `${res.main.temp}°C`;
      humidity.textContent = `${res.main.humidity}%`;
      wind.textContent = `${res.wind.speed} km/h`;
      document.querySelector(".weather div h2").textContent = city;
    })
    .catch((err) => {
      imageWeather.setAttribute("src", "");
      imageWeather.setAttribute("alt", "");
      tempEle.textContent = `City Not Found`;
      humidity.textContent = ` `;
      wind.textContent = ` `;
      document.querySelector(".weather div h2").textContent = " ";
    });
};
