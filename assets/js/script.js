var formEl1 = $("#cityForm");
var cityInput = $("#userInput");
var displayWeather = $("#fiveDayForecast");
var dayList = $("#searchedHistory");

var formHandler = function (event) {
  event.preventDefault();
  $('#currentWeather').empty();
  displayWeather.empty();
  getCityLocation();


};



var prevSearch = [];

//check if prevSearch array includes city we are searching for, if not add to existing array  and sae to local storage
var recentSearchCheck = function (city) {
  if (!prevSearch.includes(city)) {
    prevSearch.push(city);
    localStorage.setItem("cities", JSON.stringify(prevSearch));
  }
};

//create button for previously searched history
var loadCitySearched = function () {
  prevSearch = JSON.parse(localStorage.getItem("cities"));
  if (!prevSearch) {
    prevSearch = [];
  }

  dayList.empty();
  for (let i = prevSearch.length - 1; i >= 0; i--) {
 
    var searched = $("<button>").addClass("btn btn-info my-1").text(prevSearch[i]);
    dayList.append(searched);
   
    }

  };
loadCitySearched();

var getCityLocation = function () {
  var citySelection = userInput.value.trim();

  //if there is no input return, TO DO: create warning message 
   if (citySelection ==='') {
    
  return;
  }
 
   else{//fetch each city data
  var apiUrl ='https://api.openweathermap.org/geo/1.0/direct?q=${citySelection}&appid=c12efca7b1f4709f10f4fbec34efb724&units=metric}';
  fetch(apiUrl)
    .then(function (response) {
      if (response) {
        return response.json();
      }
    })
    .then(function (data) {

      recentSearchCheck(citySelection);

      //get each city geographical coordinates
      loadCitySearched();
      for (let i = 0; i < data.length; i++) {
        var latCity = data[i].lat; 
        var lonCity = data[i].lon;
      }

      //get weather forecast for selected city
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?&lat=" +
          latCity +
          "&lon=" +
          lonCity +
          "&appid=c12efca7b1f4709f10f4fbec34efb724&units=metric"
      )
        .then(function (response) {
          if (response) {
            return response.json();
          }
        })
        .then(function (data) {

          //get needed data from API
          var currentDate = data.dt;
          var currentTemperature = data.main.temp;
          var currentHumidity = data.main.humidity;
          var currentWind = data.wind.speed;
          var city = data.name;

          //get today's date
          var today = dayjs();
          var currentDate= $('<p>').text(today.format('MM/DD/YYYY'));
          var currentDay= $("<div>").addClass("col text-center text-black bg-info bg-opacity-50 ");
          
          var displayCurrentTemp = $("<p>").text( "Temperature: " + currentTemperature + " ℃" );
          var displayCurrentHum = $("<p>").text("Humidity: " + currentHumidity + ' %');
          var displayCurrentWind = $("<p>").text("Wind speed: " + currentWind + ' MPH');

          //append to HTML and display today's weather for selected city
          currentDay.append(city);
          currentDay.append(currentDate);
          currentDay.append(displayCurrentTemp);
          currentDay.append(displayCurrentHum);
          currentDay.append(displayCurrentWind);
         $('#currentWeather').append(currentDay);


        });


      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?&lat=" +
          latCity +
          "&lon=" +
          lonCity +
          "&appid=c12efca7b1f4709f10f4fbec34efb724&units=metric"
      )
        .then(function (response) {
          if (response) {
            return response.json();
          }
        })
        .then(function (data) { 
          console.log(data);
          var cityName = data.city.name;
  
          //select only 5 days forecast weather
          for (let i = 0; i < data.list.length; i = i + 8) {
            var date = data.list[i].dt_txt;
            var temperature = data.list[i].main.temp;
            var humidity = data.list[i].main.humidity;
            var wind = data.list[i].wind.speed;
            var icon = data.list[i].weather[0].icon; //TO DO:show weather icon for each day
            var iconUrl='http://openweathermap.org/img/w/'+icon+ '.png';
            var iconImage = $('<image>').addClass('card-top-image');
            iconImage.attr('src', iconUrl);
            iconImage.attr('type', 'image');
        


            //create HTML elements and display City,temperature, wind and humidity for the next 5 days
            var divCol = $("<div>").addClass("col");
            var htmlCard = $("<div>").addClass( "card shadow-lg p-3 mb-5 bg-body rounded" ); 
            var cardBody = $("<div>").addClass("card-body "); 
            var cardText = $("<div>").addClass( "card text-black bg-info bg-opacity-50");
            var display1 = $("<h4>").addClass("card-title").text(cityName );
            var forecastDate = $("<p>").text(date);
            var forecastTemp = $("<p>").text( "Temperature: " + temperature + " ℃" );
            var forecastHum = $("<p>").text("Humidity: " + humidity + '%');
            var forecastWind = $("<p>").text("Wind speed: " + wind + 'MPH');

            //append to HTML
            //display weather for next 5 days
            cardText.append(display1);
            cardText.append(iconImage);
            cardText.append(forecastDate);
            cardText.append(forecastTemp);
            cardText.append(forecastHum);
            cardText.append(forecastWind);
            cardBody.append(cardText);
            htmlCard.append(cardBody); 
            divCol.append(htmlCard);
            displayWeather.innerHTML = "";
            displayWeather.append(divCol);
          }
        });
    });
}
};
formEl1.on("submit", formHandler);
loadCitySearched();
//console.log(prevSearch);

//TO DO: if user clicks on any of previously searched Cities show 5 day forecast Weather
dayList.on('click', function(event){
  test=event.target;
  userInput=test
  getCityLocation();

 }
  )

