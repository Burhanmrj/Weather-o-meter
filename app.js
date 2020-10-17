const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const https = require("https")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const aboutcontent="We are CS undergrad from DTU currently in 3rd year making this website as a Project under Professor Rahul Gupta.";
const contactcontent="Here are some of the ways you can contact us:";
const api="1d8c7268fc6cf66b6eb5b37c449398c7";

var temperature={};
var icon={};
var parsedData={};


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
							wind:null
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
app.post("/",function(req,res){


	const aquiredLocation=req.body.locationName;
	const units = "metric";
	const url="https://api.openweathermap.org/data/2.5/weather?q="+aquiredLocation+"&units="+units+"&appid="+api;
	https.get(url,function(response){

		console.log(response.statusCode);

			response.on("data", function(data){
				parsedData =JSON.parse(data);
				temperature =parsedData.main.temp+"°C";
				icon = parsedData.weather[0].icon;
				const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
				
				console.log(parsedData)
				name=parsedData.name;
				temp_min = "Min: "+parsedData.main.temp_min+"°C";
				temp_max= "Max: "+parsedData.main.temp_max+"°C";
				description=parsedData.weather[0].description;
				country= ", "+parsedData.sys.country;
				pressure="Pressure: "+parsedData.main.pressure+"hpa";
				humidity="Humidity: "+parsedData.main.humidity+"%";
				visibility ="Visibility: " +parsedData.visibility+"m";
				wind= "wind: "+parsedData.wind.speed+"m/s";
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
										wind:wind
									})
												});


										});
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
