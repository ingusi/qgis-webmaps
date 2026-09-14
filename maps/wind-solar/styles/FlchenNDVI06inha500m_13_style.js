var size = 0;
var placement = 'point';

var style_FlchenNDVI06inha500m_13 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("flaeche_ha");
    var labelFont = "10px, sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    if ("" !== null) {
        labelText = String("");
    }
    if (value >= 0.050000 && value <= 0.080000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255,244,0,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 0.080000 && value <= 0.130000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255,197,0,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 0.130000 && value <= 0.200000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255,150,0,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 0.200000 && value <= 0.260000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255,104,0,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 0.260000 && value <= 0.400000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255,57,0,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 0.400000 && value <= 0.640289) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(255,10,0,1.0)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    };

    return style;
};
