var formEl1 = document.querySelector('#cityForm');
var cityInput = document.querySelector('#userInput');

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

    fetch ('https://api.openweathermap.org/data/2.5/forecast?lat=' + latCity + '&lon=' + lonCity + '&appid=c12efca7b1f4709f10f4fbec34efb724')
    .then(function(response){
       if(response){
           return response.json();
       }
     })
   .then(function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        var temperature = data.list.main[i].temp;
        console.log(temperature);
        
    }


   })
}
   

})


}





formEl1.addEventListener('submit', formHandler);