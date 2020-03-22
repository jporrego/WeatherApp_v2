function retrieveWeather(units, unit) {
  function sucess(pos) {
    let apiKey = "fb5e0e41cf1b49fc9966d68b586b31f6";
    let crd = pos.coords;
    let lat = crd.latitude.toFixed(5);
    let long = crd.longitude.toFixed(5);
    let url = `https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

    let xhrData = new XMLHttpRequest();
    xhrData.open("get", url, true);
    xhrData.send();
    xhrData.onload = function() {
      let obj = JSON.parse(xhrData.responseText);
      let weatherObj = {
        temp: obj.main.temp,
        description: obj.weather[0].description
      };

      /*console.log(weatherObj.temp, weatherObj.description);*/
      let message = document.querySelector(".weather-card__message");
      message.textContent = `${Math.floor(weatherObj.temp)}°${unit} with ${
        weatherObj.description
      }`;
    };
  }

  navigator.geolocation.getCurrentPosition(sucess);
}

function update() {
  retrieveWeather();
}

function chageUnitC() {
  let celciusButton = document.querySelector(".unit-box__button--C");
  let farenheitButton = document.querySelector(".unit-box__button--F");

  celciusButton.classList.add("unit-box__button--selected");
  farenheitButton.classList.remove("unit-box__button--selected");

  retrieveWeather("metric", "C");
}

function chageUnitF() {
  let celciusButton = document.querySelector(".unit-box__button--C");
  let farenheitButton = document.querySelector(".unit-box__button--F");

  celciusButton.classList.remove("unit-box__button--selected");
  farenheitButton.classList.add("unit-box__button--selected");

  retrieveWeather("imperial", "F");
}

retrieveWeather("metric", "C");
