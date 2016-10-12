var http = require('http');
var fs = require('fs');

function getWeather(request, response, latitude, longitude, place){

	response.writeHead(200, {"Content-type":"text/html"});

	var apiKey = "26dc0300970ed498d0a15171d0cd79c4";
	var	weatherRequest = "http://api.openweathermap.org/data/2.5/weather?lat="+ latitude +"&lon="+ longitude +"&units=metric&appid="+apiKey;

	http.get(weatherRequest, function(resp){
		var body = "";
		resp.on('data', function(chunk){
			body += chunk;
		});
		resp.on('end', function(){
			if(resp.statusCode === 200) {
		        try {
		          	//Parse the data
		          	var weatherDetails = JSON.parse(body);
		          	//Print the data
					html = fs.readFileSync('views/weather.html');
					html = html.toString();

					data = filterJSON(weatherDetails, place);
					for(var key in data){
						html = html.replace("[["+ key +"]]", data[key]);
					}
					response.write(html);
					response.end();

		        } catch(error) {
		          //Parse Error
		          console.log(error.message);
		        }

		    }
		});
	});	

}

function filterJSON(weatherDetails, location){
	var data = {
		place:location,
		temp: Math.round(weatherDetails.main.temp),
		description: weatherDetails.weather[0].description,
		humidity: weatherDetails.main.humidity + " % Humidity"
	};
	return data;
}

module.exports.getWeather = getWeather;