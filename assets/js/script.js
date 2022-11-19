var formEl1 = $('#cityForm');
var cityInput = $('#userInput');
var displayWeather = $('.card');
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

var formHandler = function (event){
event.preventDefault();
getCityLocation();

}

var getCityLocation = function (){ 
    var citySelection = userInput.value.trim();
    //link to each city data
var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ citySelection + '&appid=c12efca7b1f4709f10f4fbec34efb724';
  fetch (apiUrl) 
  .then(function(response){
      if (response ) {
          //console.log(response);
          return response.json();
      }
    })
  .then(function (data) {
   console.log(data);

   for (let i = 0; i < data.length; i++) {
    var latCity = data[i].lat;//get each city geographical coordinates
    console.log(latCity);
    var lonCity = data[i].lon;
    console.log(lonCity); 
   }
   
    fetch ('https://api.openweathermap.org/data/2.5/forecast?&lat=' + latCity + '&lon=' + lonCity + '&appid=c12efca7b1f4709f10f4fbec34efb724&units=metric')
    .then(function(response){
       if(response){
           return response.json();
       }
     })
   .then(function (data) {
    console.log(data);
    console.log(data.city.name);
    var cityName = data.city.name;
    for (let i = 0; i < data.list.length; i=i+8) {
      // var today = dayjs().format('MM'+'/'+ 'DD'+ '/' +'YYYY');
      // var nextDay = today.diff('day')
      var date = data.list[i].dt_txt;
      var temperature = data.list[i].main.temp;
      var humidity = data.list[i].main.humidity;
      var wind = data.list[i].wind.speed;
      var display2 =$('<div>').addClass('card');
      var display1 =$('<h4>').addClass('card-title').text(cityName);
      var forecastDate = $('<p>').text(date);
      var forecastTemp = $('<p>').text('Temperature: ' +temperature + ' ℃' );
      var forecastHum = $('<p>').text('Humidity: '+ humidity );
      var forecastWind = $('<p>').text('Wind speed: ' + wind);
      display2.append(display1);
      display2.append(forecastDate);
      display2.append(forecastTemp);
      display2.append(forecastHum);
      display2.append(forecastWind);
      displayWeather.append(display2);

  
     console.log('wind speed:  ' + wind);
      console.log('humidity  ' + humidity);
      console.log('temperature ' + temperature);
      console.log('Date: '+ date);
    }
   });
});
   }

formEl1.on('submit', formHandler);