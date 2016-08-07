//Bing key so Cesium doesn't throw an error everytime it loads
Cesium.BingMapsApi.defaultKey = 'ApcaGOvmoUuBrD2eHpVvRbOnrnJ8Fp33DrW8o6QLsJNZIpVHWGz9voYcM-BkEHYT';

//new Cesium object, displays planet, generic zoom/display level
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker: false
});

//build Ajax call, pull in start/end dates from form, gives an alert if no matches were found
var getEQdata = function (quake) {
    var request = {
        format: 'geojson',
        starttime: quake.date_timepicker_start,
        endtime: quake.date_timepicker_end,
        minmagnitude: quake.magnitude
    };
    $.ajax({
            url: "https://crossorigin.me/http://earthquake.usgs.gov/fdsnws/event/1/query",
            data: request,
            type: "GET",
        })
        .done(function (result) {
            if (result.features.length == 0) {
                alert("There were no matches for your search. Try widening your search dates or lowering the magnitude.");
            } else {
                //build viewer object from USGS return data
                for (var i = 0; i < result.features.length; i++) {
                    var lat = result.features[i].geometry.coordinates[0];
                    var long = result.features[i].geometry.coordinates[1];
                    var mag = result.features[i].properties.mag;
                    var name = result.features[i].properties.place;
                    var height;
                    var material;
                    var date = new Date(result.features[i].properties.time);

                    //set magnitude color and poly height based off magnitude
                    if (mag > 7) {
                        height = 1000000;
                        material = Cesium.Color.DARKRED.withAlpha(0.5);
                    } else if (mag > 6) {
                        height = 750000;
                        material = Cesium.Color.MEDIUMBLUE.withAlpha(0.5);
                    } else if (mag > 5) {
                        height = 500000;
                        material = Cesium.Color.DARKGREEN.withAlpha(0.5);
                    } else if (mag > 4) {
                        height = 400000;
                        material = Cesium.Color.DARKORANGE.withAlpha(0.5);
                    } else if (mag > 3) {
                        height = 300000;
                        material = Cesium.Color.YELLOW.withAlpha(0.5);
                    } else if (mag > 2) {
                        height = 200000;
                        material = Cesium.Color.HOTPINK.withAlpha(0.5);
                    } else if (mag > 1) {
                        height = 100000;
                        material = Cesium.Color.MEDIUMPURPLE.withAlpha(0.5);
                    } else {
                        height = 50000;
                        material = Cesium.Color.RED.withAlpha(0.5);
                    }

                    //creates a polygon, in this case, a square ("box"), on position 'fromDegrees', fills with material and height defined above
                    var shakeBox = viewer.entities.add({
                        name: 'Shake Viewer',
                        position: Cesium.Cartesian3.fromDegrees(lat, long),
                        description: '<p>Location: ' + name + '</p>' +
                            '<p>Magnitude: ' + mag + '</p>' +
                            '<p>Date & Time: ' + date + '</p>',
                        box: {
                            dimensions: new Cesium.Cartesian3(150000.0, 150000.0, height),
                            //length, width and height
                            material: material,
                            //what fill color and transparency to use
                            outline: true,
                            //outline yes or no
                            outlineColor: Cesium.Color.BLACK
                        }
                    });
                }
            }
        })

    .fail(function (jqXHR, error) {
        alert("An AJAX api query has failed. Please reload the search and try again, or narrow the search criteria.");
    });
};


//function to create the quakeForm object
function quakeForm() {
    //list of all input field IDs, these match the id's used in the html form
    this.inputFieldIds = ['date_timepicker_start', 'date_timepicker_end', 'magnitude'];
}

//prototype methods for the quakeForm object
quakeForm.prototype = {

    //collects the data from the form by id (matches above), get the value and adds to array
    collectFormData: function () {
        var output = {};
        //for each of the input fields match the IDs and their values, and add them to the output array
        this.inputFieldIds.forEach(function (element) {
            output[element] = $('#' + element).val();
        });
        return output;
    },
};

var quakeForm = new quakeForm();

$(document).ready(function () {

    //Thx to http://xdsoft.net/jqplugins/datetimepicker for their jquery date/time snip!//
    $('#date_timepicker_start').datetimepicker({
        format: 'Y/m/d',
        onShow: function (ct) {
            this.setOptions({
                maxDate: $('#date_timepicker_end').val() ? $('#date_timepicker_end').val() : false
            })
        },
        timepicker: false
    });

    $('#date_timepicker_end').datetimepicker({
        format: 'Y/m/d',
        onShow: function (ct) {
            this.setOptions({
                minDate: $('#date_timepicker_start').val() ? $('#date_timepicker_start').val() : false
            })
        },
        timepicker: false
    });

    //submit handling functions, get the form data, generate object and display
    $('.searchbox').submit(function (event) {
        viewer.dataSources.removeAll();
        event.preventDefault(event);
        var quake = quakeForm.collectFormData();
        getEQdata(quake);
    });

    //reload the form on click.  Unable to find alternate way (new box object) to better reset form after building the Cesium object
    $('.searchbox').on('click', '#reset', function (event) {
        event.preventDefault(event);
        location.reload();
    });

});
