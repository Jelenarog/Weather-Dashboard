var formEl1 = $("#cityForm");
var cityInput = $("#userInput");
var displayWeather = $("#fiveDayForecast");
var dayList = $('#searchedHistory');

var formHandler = function (event) {
  event.preventDefault();
  displayWeather.empty();
  getCityLocation();
 
};


var inputValidation = function(input,cityData){
  if (input !== cityData){
    console.log('enter valid city na');  
  
};
}

var prevSearch=[];

var recentSearchCheck = function(city){
if(!prevSearch.includes(city)){
  prevSearch.push(city);
  localStorage.setItem('cities',JSON.stringify(prevSearch));
}

}

var loadCitySearched=function(){
  prevSearch=JSON.parse(localStorage.getItem('cities'));
  if (!prevSearch){
    prevSearch=[];
  }


  dayList.empty();
 for (let i = prevSearch.length-1; i >= 0; i--) {
 
 //console.log(prevSearch[i]);
 var searched = $("<li>").addClass("list-group-item").text(prevSearch[i]);
 
 dayList.append(searched);
  
 }
}

var getCityLocation = function () {


  var citySelection = userInput.value.trim();

  //fetch each city data
  var apiUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    citySelection +
    "&appid=c12efca7b1f4709f10f4fbec34efb724";
  fetch(apiUrl)
    .then(function (response) {
      if (response) {
        //console.log(response);
        return response.json();
      }
    })
    .then(function (data) {
     // console.log(data);
     
     recentSearchCheck(citySelection);
    loadCitySearched();
      for (let i = 0; i < data.length; i++) {
        var latCity = data[i].lat; //get each city geographical coordinates
       // console.log(latCity);
        var lonCity = data[i].lon;
        //console.log(lonCity);
      }

      //get weather forecast for selected city
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
         // console.log(data);
          //console.log(data.city.name);
          // if (data.list.length === 0){
          //   var message = $('<p>');
          //   message.text('Please enter valid City name.');
          //   displayWeather.append(message);
          //   return;
          // }
          var cityName = data.city.name;
         console.log(cityName);
          inputValidation (citySelection,cityName);

            for (let i = 0; i < data.list.length; i = i + 8) {
              var date = data.list[i].dt_txt;
              var temperature = data.list[i].main.temp;
              var humidity = data.list[i].main.humidity;
              var wind = data.list[i].wind.speed;
              var divCol = $("<div>").addClass("col");
              var htmlCard = $("<div>").addClass(
                "card shadow-lg p-3 mb-5 bg-body rounded"
              ); // create div card
              var cardBody = $("<div>").addClass("card-body "); //create fiv card body
              var cardText = $("<div>").addClass(
                "card text-black bg-info bg-opacity-50"
              );
              var display1 = $("<h4>").addClass("card-title").text(cityName);
              var forecastDate = $("<p>").text(date);
              var forecastTemp = $("<p>").text(
                "Temperature: " + temperature + " ℃"
              );
              var forecastHum = $("<p>").text("Humidity: " + humidity);
              var forecastWind = $("<p>").text("Wind speed: " + wind);
              cardText.append(display1);
              cardText.append(forecastDate);
              cardText.append(forecastTemp);
              cardText.append(forecastHum);
              cardText.append(forecastWind);
              cardBody.append(cardText);
              htmlCard.append(cardBody); //card body appended to div card
              divCol.append(htmlCard);
              displayWeather.innerHTML='';
              displayWeather.append(divCol);
            }
         

        });
    });
};

formEl1.on("submit", formHandler);
loadCitySearched();
//console.log(prevSearch);
