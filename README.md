# Weather-o-meter
The weather gathering is done through the OpenWeatherMap api. We have used two api namely:
Current weather data: Access current weather data for any location on Earth including over 200,000 cities! We collect and process weather data from different sources such as global and local weather models, satellites, radars and vast network of weather stations. Data is available in JSON, XML, or HTML format.
This api requires the name of the location (preferably city). After aquiring the name the web app makes https request to the api to gather the weather data, which is in the form of JSON.

One Call API: Make just one API call and get all your essential weather data for a specific location with our new OpenWeather One Call API.
This api requires the latitude and longitude of the location. In order to get the latitude and longitude we used the geoCoder which basically retrieves the latitude and longitude from just the name of the location. We used the geoCoder of openstreetmap. After aquiring the coordinates, the web app makes https request to the api to gather the weather data, which is in the form of JSON.
For the map section We used the Weather maps 1.0 integrated with the Leaflet library.
OpenWeatherMap offers some TileLayers:
Pressure Contours.
Clouds
Clouds Classic
Precipitation
Precipitation Classic
Rain
Rain Classic
Snow
Temperature
Wind Speed
Pressure
