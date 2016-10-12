//Require http module
var http = require('http');
var url = require('url');
var router = require('./router');
//Require FileSystem(fs) module
var fs = require('fs');
const querystring = require('querystring');

//Create server
http.createServer(function(request, response){

	urlStr = url.parse(request.url);


	if(request.url === "/"){
		router.home(request, response);
	}

	else if((urlStr.pathname === "/weather.html")){
		latitude = querystring.parse(urlStr.query).lat;
		longitude = querystring.parse(urlStr.query).lng;
		place = querystring.parse(urlStr.query).place;
		router.weatherReport(request, response,latitude, longitude, place);
	}

}).listen(3000, "127.0.0.1");

console.log("Server running at IP 127.0.0.1");
