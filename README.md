
# Welcome to the Shake Finder!

#### This project demonstrates the use of AJAX API queries combined with data visualization.  In this case, API calls to the USGS endpoint, selected with UTC dates, times and a maximum magnitude, returns a data object.  Data object is parsed and extrapolated into a display object, then handed to the Cesium API for display as visualization.  The visual object, in this case, a box, is colored by magnitude and the height is relative to the magnitude of the earthquake.

##### Technologies and learning points from this project:
* AJAX calls from JS
* Working with https/http endpoints
* Displaying and formatting various datatyps, including long dates, lat/long, magnitude
* Working with Cesium API, objects and visualization

##### Instructions for use
* Choose a start and end date range
* Choose a magnitude
* Watch the data points appear on the map, properly plotted for lat/long
* View accompanying sidebar data when clicked, includes descriptive name location, magnitude and UTC date/time

##### Screenshots


##### Thanks to
* Special thanks to http://xdsoft.net/jqplugins/datetimepicker for their Jquery date picker code
* Thanks to Cesium for making such an easy to use API!
* Thanks to https://crossorigin.me/ for helping to solve the https/http error problem from using gh-pages
