var formEl1 = $('#cityForm');
var cityInput = $('#userInput');

//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

var formHandler = function (event){
event.preventDefault();
getCityLocation();

}

var getCityLocation = function (city){ 
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
  

    var hourList = [ '1668891600','1668978000', '1669064400' ,'1669150800' ];
      
    for (let i = 0; i < data.list.length; i=i+8) {
      var temperature = data.list[i].main.temp;
      var humidity = data.list[i].main.humidity;
      var wind = data.list[i].wind.speed;
     console.log('wind speed:  ' + wind);
      console.log('humidity  ' + humidity);
      console.log('temperature ' + temperature);
    }



   });
});
   }

formEl1.on('submit', formHandler);