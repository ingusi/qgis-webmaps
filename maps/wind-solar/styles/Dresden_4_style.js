var size = 0;
var placement = 'point';

var style_Dresden_4 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("");
    var labelFont = "13.0px \'Open Sans\', sans-serif";
    var labelFill = "#323232";
    var bufferColor = "#959595";
    var bufferWidth = 0.6000000000000001;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if (feature.get("name") !== null && resolution > 19 && resolution < 700) {
        labelText = String(feature.get("name"));
    }
    var style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(225,89,137,0.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};
