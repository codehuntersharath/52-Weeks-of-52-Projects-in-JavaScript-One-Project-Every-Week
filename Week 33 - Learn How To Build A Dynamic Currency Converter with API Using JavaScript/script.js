const amount = document.getElementById("amount"),
  fromCountry = document.getElementById("fromCountry"),
  toCountry = document.getElementById("toCountry"),
  selectedSymbol = document.getElementById("selectedSymbol"),
  selectedFromImg = document.getElementById("selectedFromImg"),
  selectedToImg = document.getElementById("selectedToImg"),
  rotate = document.querySelector(".form-control i"),
  formOutput = document.querySelector(".form-output");

window.addEventListener("load", () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((country) => {
        if (country?.currencies != null) {
          let currencyKey = Object.keys(country.currencies)[0];
          let option1 = document.createElement("option");
          let option2 = document.createElement("option");

          option1.value = currencyKey;
          option1.text =
            currencyKey + " - " + country.currencies[currencyKey].name;
          option1.setAttribute("data-name", country.name.common);
          option1.setAttribute(
            "data-image",
            `https://flagcdn.com/w320/${currencyKey
              .substring(0, 2)
              .toLowerCase()}.png`
          );
          option1.setAttribute(
            "data-symbol",
            country.currencies[currencyKey].symbol
          );
          option1.setAttribute(
            "data-currency",
            country.currencies[currencyKey].name
          );

          option2.value = currencyKey;
          option2.innerHTML =
            currencyKey + " - " + country.currencies[currencyKey].name;
          option2.setAttribute("data-name", country.name.common);
          option2.setAttribute(
            "data-image",
            `https://flagcdn.com/w320/${currencyKey
              .substring(0, 2)
              .toLowerCase()}.png`
          );
          option2.setAttribute(
            "data-currency",
            country.currencies[currencyKey].name
          );
          option2.setAttribute(
            "data-currency",
            country.currencies[currencyKey].name
          );

          fromCountry.appendChild(option1);
          toCountry.appendChild(option2);
        }
      });

      sortOptions(fromCountry);
      sortOptions(toCountry);

      fromCountry.value = "INR";
      toCountry.value = "USD";
      setCurrencySymbol();

      setSelectedCountry(fromCountry, selectedFromImg);
      setSelectedCountry(toCountry, selectedToImg);
    });
});

function setCurrencySymbol() {
  let selectedCurrencySymbol =
    fromCountry.options[fromCountry.selectedIndex].getAttribute("data-symbol");
  selectedSymbol.innerHTML = selectedCurrencySymbol;
}

function setSelectedCountry(option, Id) {
  let selectedCountryImg =
    option.options[option.selectedIndex].getAttribute("data-image");
  Id.setAttribute("src", selectedCountryImg);
}

function sortOptions(Id) {
  var options = Id.options;
  var optionsArray = [];
  for (var i = 0; i < options.length; i++) {
    optionsArray.push(options[i]);
  }

  optionsArray = optionsArray.reduce((arr, item) => {
    const removed = arr.filter((i) => i.innerText !== item.innerText);
    return [...removed, item];
  }, []);

  optionsArray = optionsArray.sort(function (a, b) {
    return a
      .getAttribute("data-name")
      .localeCompare(b.getAttribute("data-name"));
  });

  for (var i = 0; i <= options.length; i++) {
    options[i] = optionsArray[i];
  }
  options[0].selected = true;
}

function rotateCurrency() {
  rotate.classList.toggle("rotate");
  let fromCT = fromCountry.value;
  let ToCT = toCountry.value;
  fromCountry.value = ToCT;
  toCountry.value = fromCT;
  setSelectedCountry(fromCountry, selectedFromImg);
  setSelectedCountry(toCountry, selectedToImg);

  setCurrencySymbol();
  convertCurrency();
}

function convertCurrency() {
  fetch(
    "https://v6.exchangerate-api.com/v6/cdbcf1df6c8cc80bb2113586/latest/" +
    fromCountry.value
  )
    .then((response) => response.json())
    .then((data1) => {
      let totalExchangeRateFrom = "";
      fetch(
        "https://v6.exchangerate-api.com/v6/cdbcf1df6c8cc80bb2113586/latest/" +
        toCountry.value
      )
        .then((response) => response.json())
        .then((data2) => {
          let exchangeRateFrom = data2.conversion_rates[fromCountry.value];
          totalExchangeRateFrom = (
            amount.value * exchangeRateFrom
          ).toLocaleString();

          let exchangeRateTo = data1.conversion_rates[toCountry.value];
          let totalExchangeRateTo = (
            amount.value * exchangeRateTo
          ).toLocaleString();

          let selectedFromCurrency =
            fromCountry.options[fromCountry.selectedIndex].getAttribute(
              "data-currency"
            );
          let selectedToCurrency =
            toCountry.options[toCountry.selectedIndex].getAttribute(
              "data-currency"
            );

          let stringBuilder = "";
          let lastUpdate =
            "Last updated: " + data1.time_last_update_utc.split("00:00:")[0];
          let nextUpdate =
            "Next update on: " +
            data1.time_next_update_utc.split("00:00:")[0];
          stringBuilder += `<p>${amount.value} ${selectedFromCurrency} =</p>`;
          stringBuilder += `<p>${totalExchangeRateTo} ${selectedToCurrency}</p>`;
          stringBuilder += `<p>${amount.value} ${toCountry.value} = ${totalExchangeRateFrom} ${fromCountry.value} <span> ${lastUpdate}<br>  ${nextUpdate}</span></p>`;
          formOutput.innerHTML = stringBuilder;
        });
    });
}
