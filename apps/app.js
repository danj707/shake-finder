//new Cesium object, displays planet
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker: false
});

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
                console.log("Success: " + result.features.length + " matches ");
                for (var i = 0; i < result.features.length; i++) {
                    var lat = result.features[i].geometry.coordinates[0];
                    var long = result.features[i].geometry.coordinates[1];
                    var mag = result.features[i].properties.mag;
                    var name = result.features[i].properties.place;
                    var height;

                    if (mag > 7) {
                        height = 750000;
                    } else if (mag > 6) {
                        height = 500000;
                    } else if (mag > 5) {
                        height = 300000;
                    } else if (mag > 4) {
                        height = 200000;
                    } else if (mag > 3) {
                        height = 100000;
                    } else if (mag > 2) {
                        height = 50000;
                    } else if (mag > 1) {
                        height = 25000;
                    }

                    //creates a polygon, in this case, a rectangle, on position = 'fromDegrees'
                    var redBox = viewer.entities.add({
                        name: "Loc: " + name + "Magnitude: " + mag,
                        position: Cesium.Cartesian3.fromDegrees(lat, long),
                        box: {
                            dimensions: new Cesium.Cartesian3(200000.0, 150000.0, height),
                            //length, width and height
                            material: Cesium.Color.RED.withAlpha(0.5),
                            //what fill color and transparency to use
                            outline: true,
                            //outline yes or no
                            outlineColor: Cesium.Color.BLACK
                                //border color to use
                        }
                    });
                    //console.log("Loc: " + result.features[i].properties.place + "Magnitude: " + result.features[i].properties.mag);
                }
            }
        })

    .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
        alert(error);
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
        //for each of the input fields match the IDs and their values, and add them to the output array;
        this.inputFieldIds.forEach(function (element) {
            output[element] = $('#' + element).val();
        });
        return output;
    },
};

var quakeForm = new quakeForm();

$(document).ready(function () {

    $('#date_timepicker_start').datetimepicker({
        format: 'Y/m/d',
        onShow: function (ct) {
            this.setOptions({
                maxDate: jQuery('#date_timepicker_end').val() ? jQuery('#date_timepicker_end').val() : false
            })
        },
        timepicker: false
    });

    $('#date_timepicker_end').datetimepicker({
        format: 'Y/m/d',
        onShow: function (ct) {
            this.setOptions({
                minDate: jQuery('#date_timepicker_start').val() ? jQuery('#date_timepicker_start').val() : false
            })
        },
        timepicker: false
    });

    $('.searchbox').submit(function (event) {
        event.preventDefault(event);
        // zero out results if previous search has run
        //$('.results').html('');
        // get the value of the tags the user submitted

        var quake = quakeForm.collectFormData();
        getEQdata(quake);
    });
});
