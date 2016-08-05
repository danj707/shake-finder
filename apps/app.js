//new Cesium object, displays planet
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker: false
});

//camera flies to...
//viewer.camera.flyTo({
//    destination: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222, 6000.0),
//    orientation: {
//        heading: Cesium.Math.toRadians(35.0),
//        pitch: Cesium.Math.toRadians(-35.0),
//        roll: 0.0
//    },
//    duration: 4.0, // in seconds
//    complete: function () {
//        // called when the flight finishes
//    }
//});

//adds a pin to the below lat/long
//var counter = 0;
//var pinBuilder = new Cesium.PinBuilder();
//var entity = viewer.entities.add({
//    position: Cesium.Cartesian3.fromDegrees(-75.10, 39.57),
//    label: {
//        text: 'pin' + counter,
//        verticalOrigin: Cesium.VerticalOrigin.TOP
//    },
//    billboard: {
//        image: pinBuilder.fromColor(Cesium.Color.SALMON, 48).toDataURL(),
//        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
//    }
//
//});

var getEQdata = function (quake) {

    var request = {
        format: 'geojson',
        starttime: '2016-05-01',
        endtime: '2016-08-04',
        minmagnitude: 7
    };

    $.ajax({
            url: "http://earthquake.usgs.gov/fdsnws/event/1/query",
            data: request,
            type: "GET",
        })
        .done(function (result) { //this waits for the ajax to return with a succesful promise object
            //            var searchResults = showSearchResults(request.tagged, result.items.length);
            //
            //            $('.search-results').html(searchResults);
            //            //$.each is a higher order function. It takes an array and a function as an argument.
            //            //The function is executed once for each item in the array.
            //            $.each(result.items, function (i, item) {
            //                var question = showQuestion(item);
            //                $('.results').append(question);
            //            });
            console.log(result);
        })
        //        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
        //            var errorElem = showError(error);
        //            $('.search-results').append(errorElem);
        //        });
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
        //console.log(quake);
    });

});
