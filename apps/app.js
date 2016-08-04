var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
    }),
    baseLayerPicker: false
});

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

$(document).ready(function () {

});
