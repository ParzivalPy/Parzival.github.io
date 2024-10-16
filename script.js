let dataTemp = [];
let dataJours = [];

async function fetchCityInfo(city) {
  const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const results = data.results;

    const villeInfoList = results.map((result) => {
      return {
        name: result.name,
        adminDivision:
          result.admin1 ||
          result.admin2 ||
          result.admin3 ||
          result.admin4 ||
          result.country,
      };
    });

    return villeInfoList;
  } catch (error) {
    console.error("Error fetching city information:", error);
    return [];
  }
}

async function displayCityInfo(city) {
  const villeInfoList = await fetchCityInfo(city);

  if (villeInfoList.length === 0) {
    console.log("No city information available.");
    return;
  }

  comboChange(villeInfoList);
}

function cityClick() {
  let cityToSearch = document.getElementById("cityName").value;
  displayCityInfo(cityToSearch);
}

function comboChange(cityList) {
  const comboList = document.getElementById("comboList");

  while (comboList.firstChild) {
    comboList.removeChild(comboList.firstChild);
  }

  cityList.forEach((ville, index) => {
    const optionElement = document.createElement("option");
    optionElement.value = index;
    optionElement.textContent = ville.name + ", " + ville.adminDivision;
    comboList.appendChild(optionElement);
  });
}

const inputChange = document.getElementById("cityName");

inputChange.addEventListener("change", cityClick);

const searchButton = document.getElementById("cityButton");

searchButton.addEventListener("click", rechercher);

async function rechercher() {
  let city = document.getElementById("cityName").value;
  const apiUrl =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    city +
    "&count=10&language=en&format=json";
  try {
    const cityNumber = obtenirValeurOptionSelectionnee();
    const response = await fetch(apiUrl);
    const data = await response.json();
    const results = data.results[cityNumber];

    const cityLatitude = results["latitude"];
    const cityLongitude = results["longitude"];

    meteoApi(cityLatitude, cityLongitude);
  } catch (error) {
    console.log("Une erreur s'est produite : " + error);
  }
}

async function meteoApi(lat, lon) {
  const meteoApi =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat +
    "&longitude=" +
    lon +
    "&hourly=temperature_2m&timezone=Europe%2FBerlin";

  try {
    const response = await fetch(meteoApi);
    const data = await response.json();
    const hourlyTemperature = data.hourly;

    dataJours = [];
    dataTemp = [];

    for (let i = 0; i < 7; i++) {
      const debut = i * 24;
      const fin = debut + 24;
      const sousListe = hourlyTemperature["temperature_2m"].slice(debut, fin);
      dataTemp.push(sousListe);
    }

    for (let i = 0; i < 7; i++) {
      const debut = i * 24;
      const fin = debut + 24;
      const sousListe = hourlyTemperature["time"].slice(debut, fin);
      dataJours.push(sousListe);
    }

    afficherGraph();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function obtenirValeurOptionSelectionnee() {
  selectElement = document.getElementById("comboList");
  var selectedIndex = selectElement.selectedIndex;
  var selectedValue = selectElement.options[selectedIndex].value;
  return selectedValue;
}

function afficherGraph() {
  parseDate();
  tempHeures = [];
  for (i = 0; i < dataJours[0].length; i++) {
    tempTempHour = dataJours[0][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[0]);
}

function parseDate() {
  for (i = 0; i < 7; i++) {
    tempDate = new Date(dataJours[i][0]);
    tempDay = tempDate.getDate();
    tempMonth = tempDate.getMonth();
    document.getElementById("daysButton" + (i + 1)).textContent =
      tempDay + "/" + (tempMonth + 1);
  }
}

const jour1 = document.getElementById("daysButton1");

jour1.addEventListener("click", function () {
  tempHeures = [];
  for (i = 0; i < dataJours[0].length; i++) {
    tempTempHour = dataJours[0][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[0]);
});

const jour2 = document.getElementById("daysButton2");

jour2.addEventListener("click", function () {
  tempHeures = [];
  for (i = 0; i < dataJours[1].length; i++) {
    tempTempHour = dataJours[1][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[1]);
});

const jour3 = document.getElementById("daysButton3");

jour3.addEventListener("click", function () {
  tempHeures = [];
  for (i = 0; i < dataJours[2].length; i++) {
    tempTempHour = dataJours[2][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[2]);
});

const jour4 = document.getElementById("daysButton4");

jour4.addEventListener("click", function () {
  tempHeures = [];
  for (i = 0; i < dataJours[3].length; i++) {
    tempTempHour = dataJours[3][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[3]);
});

const jour5 = document.getElementById("daysButton5");

jour5.addEventListener("click", function () {
  tempHeures = [];
  for (i = 0; i < dataJours[4].length; i++) {
    tempTempHour = dataJours[4][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[4]);
});

const jour6 = document.getElementById("daysButton6");

jour6.addEventListener("click", function () {
  tempHeures = [];
  for (i = 0; i < dataJours[5].length; i++) {
    tempTempHour = dataJours[5][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[5]);
});

const jour7 = document.getElementById("daysButton7");

jour7.addEventListener("click", function () {
  tempHeures = [];
  for (i = 0; i < dataJours[6].length; i++) {
    tempTempHour = dataJours[6][i].split("T");
    tempHeures.push(tempTempHour[1]);
  }
  addData(graph, tempHeures, dataTemp[6]);
});

const ctx = document.getElementById("myChart");

const graph = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Temperatures",
        data: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    layout: {
      padding: {
        down: 20,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});

function addData(chart, label, newData) {
  chart.data.labels = label;
  chart.data.datasets[0].data = newData;
  chart.update();
}
