const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const https = require("https")
const alert = require('alert');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const aboutcontent="We are CS undergrad from DTU currently in 3rd year making this website as a Project under Professor Rahul Gupta.";
const contactcontent="Here are some of the ways you can contact us:";
const api="1d8c7268fc6cf66b6eb5b37c449398c7";
var $ = require('jquery')
var temperature={};
var icon={};
let parsedData={};
var lat={};
var lon={};
var url2={};
var message={};
var today = new Date();
var day=today.getDay();
var week=['SUN','MON','TUE','WED','THR','FRI','SAT'];
var months=['Jan','Feb','Mar','Apr','May','Jun',"Jul",'Aug','Sep','Oct','Nov','Dec'];
console.log(today.getHours())

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let nodeGeocoder = require('node-geocoder');
let options = {
  provider: 'openstreetmap'
};
 
let geoCoder = nodeGeocoder(options);

  
app.get("/",function(req,res){
	res.render("header",{	name:null,
							temperature: null,
							url:null,
							temp_min:null,
							temp_max:null,
							description: null,
							country:null,
							pressure:null,
							visibility: null,
							humidity:null,
							wind:null,
							message:null
							
													})
})
app.get("/About",function(req,res){
	res.render("About",{aboutcontent:aboutcontent})

})
app.get("/Contact",function(req,res){
	res.render("Contact",{contactcontent: contactcontent})

})
app.get("/Docs",function(req,res){
	res.render("Docs")

})
app.get("/Advanced",function(req,res){
	res.render("Advanced")
})
app.get("/leaflet-owm",function(req,res){
	res.render("leaflet-owm")
})
app.post("/",function(req,res){


	const aquiredLocation=req.body.locationName;
	const units = "metric";
	const url="https://api.openweathermap.org/data/2.5/weather?q="+aquiredLocation+"&units="+units+"&appid="+api;
	https.get(url,function(response){

		console.log(response.statusCode);
		if(response.statusCode==404)
		{
			message="Enter a valid location";
			res.render("header",{	name:null,
							temperature: null,
							url:null,
							temp_min:null,
							temp_max:null,
							description: null,
							country:null,
							pressure:null,
							visibility: null,
							humidity:null,
							wind:null,
							message:message
							
						});
		}
		else
		{
			response.on("data", function(data){
				parsedData =JSON.parse(data);
				temperature =parsedData.main.temp+"°C";
				icon = parsedData.weather[0].icon;
				const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
				
				console.log(parsedData)
				name=parsedData.name;
				coordinates=parsedData.coord;
				temp_min = "Min: "+parsedData.main.temp_min+"°C";
				temp_max= "Max: "+parsedData.main.temp_max+"°C";
				description=parsedData.weather[0].description;
				country= ", "+parsedData.sys.country;
				pressure="Pressure: "+parsedData.main.pressure+"hpa";
				humidity="Humidity: "+parsedData.main.humidity+"%";
				visibility ="Visibility: " +(parsedData.visibility)/1000+"km";
				wind= "Wind: "+parsedData.wind.speed+"m/s";
				res.render("header",{	temperature:temperature,
										url:url,
										temp_min:temp_min,
										temp_max:temp_max,
										description: description,
										url:url,
										country:country,
										pressure:pressure,
										humidity: humidity,
										visibility: visibility,
										wind:wind,
										message:null
									})
												});

}
										});
		
});
app.post("/Advanced",function(req,resp){

	var aquiredLocation=req.body.locationName;
	aquiredLocation=capitalizeFirstLetter(aquiredLocation);
	const units = "metric";
	geoCoder.geocode(aquiredLocation)
  .then((res)=> {
  	
  	var country = res[0].country;
  	var state = res[0].state;
    lat=res[0].latitude;
    lon=res[0].longitude;
    
  
  	
 	url2="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&units="+units+"&appid="+api;
	console.log(url2)
	https.get(url2,function(response){
		console.log(response.statusCode)
		response.on("data", function(data){
				parsedData =JSON.parse(data);
				console.log(parsedData)
				resp.render("Advanced",{parsedData:parsedData,
										aquiredLocation:aquiredLocation,
										week:week,
										day:day,
										months:months,
										country:country,
										state:state
									})
			});
	});

	 });
  
});
	
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
