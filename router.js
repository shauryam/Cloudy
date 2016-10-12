var http = require('http');
var fs = require('fs');
var querystring = require('querystring');
var weather = require('./weather');

function home(request, response){
	response.writeHead(200, {"Content-type":"text/html"});
		var html = fs.readFile('views/index.html', function(err, data){
			if(err) throw err;
			response.write(data);
			response.end();
		});
}
function weatherReport(request, response, lat, lng, place){
	weather.getWeather(request, response, lat, lng, place);
}

module.exports.home = home;
module.exports.weatherReport = weatherReport;