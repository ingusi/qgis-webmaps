var wms_layers = [];


        var lyr_ESRIGraylight_0 = new ol.layer.Tile({
            'title': 'ESRI Gray (light)',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_OpenStreetMap_1 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var lyr_Hintergrundbild_2 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Hintergrundbild<br />' ,
        
maxResolution:28004.466152261964,

        minResolution:350.0558269032746,

        source: new ol.source.ImageStatic({
            url: "./layers/Hintergrundbild_2.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [364380.897902, 5857704.686666, 1794749.492290, 7515234.208631]
        })
    });
var format_Dresden_3 = new ol.format.GeoJSON();
var features_Dresden_3 = format_Dresden_3.readFeatures(json_Dresden_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Dresden_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Dresden_3.addFeatures(features_Dresden_3);
var lyr_Dresden_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Dresden_3,
maxResolution:28004.466152261964,
 minResolution:162.17554375571817,

                style: style_Dresden_3,
                popuplayertitle: 'Dresden',
                interactive: true,
                title: '<img src="styles/legend/Dresden_3.png" /> Dresden'
            });
var format_Dresden_4 = new ol.format.GeoJSON();
var features_Dresden_4 = format_Dresden_4.readFeatures(json_Dresden_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Dresden_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Dresden_4.addFeatures(features_Dresden_4);
var lyr_Dresden_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Dresden_4,
maxResolution:162.17554375571817,
 minResolution:11.201786460904787,

                style: style_Dresden_4,
                popuplayertitle: 'Dresden',
                interactive: true,
                title: '<img src="styles/legend/Dresden_4.png" /> Dresden'
            });
var lyr_2015SatellitenbildWinter_5 = new ol.layer.Image({
        opacity: 1,
        
    title: '2015 Satellitenbild Winter<br />' ,
        
maxResolution:162.17554375571817,

        
        source: new ol.source.ImageStatic({
            url: "./layers/2015SatellitenbildWinter_5.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var lyr_2025SatellitenbildWinter_6 = new ol.layer.Image({
        opacity: 1,
        
    title: '2025 Satellitenbild Winter<br />' ,
        
maxResolution:162.17554375571817,

        
        source: new ol.source.ImageStatic({
            url: "./layers/2025SatellitenbildWinter_6.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var lyr_VegetationNDVIderletzten5JahreWinter_7 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Ø Vegetation (NDVI) der letzten 5 Jahre | Winter<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreWinter_7_0.png" /> -0,0901<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreWinter_7_1.png" /> 0,1129<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreWinter_7_2.png" /> 0,3158<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreWinter_7_3.png" /> 0,5188<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreWinter_7_4.png" /> 0,7218<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreWinter_7_5.png" /> 0,9248<br />' ,
        
maxResolution:162.17554375571817,

        
        source: new ol.source.ImageStatic({
            url: "./layers/VegetationNDVIderletzten5JahreWinter_7.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var lyr_VegetationsnderungNDVIseit2015_8 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Vegetationsänderung (NDVI) seit 2015<br />\
    <img src="styles/legend/VegetationsnderungNDVIseit2015_8_0.png" /> Zunahme<br />\
    <img src="styles/legend/VegetationsnderungNDVIseit2015_8_1.png" /> stabil<br />\
    <img src="styles/legend/VegetationsnderungNDVIseit2015_8_2.png" /> Verlust<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/VegetationsnderungNDVIseit2015_8.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var lyr_2025SatellitenbildSommer_9 = new ol.layer.Image({
        opacity: 1,
        
    title: '2025 Satellitenbild Sommer<br />' ,
        
maxResolution:162.17554375571817,

        
        source: new ol.source.ImageStatic({
            url: "./layers/2025SatellitenbildSommer_9.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var lyr_2015SatellitenbildSommer_10 = new ol.layer.Image({
        opacity: 1,
        
    title: '2015 Satellitenbild Sommer<br />' ,
        
maxResolution:162.17554375571817,

        
        source: new ol.source.ImageStatic({
            url: "./layers/2015SatellitenbildSommer_10.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var lyr_VegetationNDVIderletzten5JahreSommer_11 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Ø Vegetation (NDVI) der letzten 5 Jahre | Sommer<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreSommer_11_0.png" /> 0,1170<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreSommer_11_1.png" /> 0,2796<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreSommer_11_2.png" /> 0,4422<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreSommer_11_3.png" /> 0,6048<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreSommer_11_4.png" /> 0,7673<br />\
    <img src="styles/legend/VegetationNDVIderletzten5JahreSommer_11_5.png" /> 0,9299<br />' ,
        
maxResolution:162.17554375571817,

        
        source: new ol.source.ImageStatic({
            url: "./layers/VegetationNDVIderletzten5JahreSommer_11.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var lyr_VegetationsnderungNDVIseit2015_12 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Vegetationsänderung (NDVI) seit 2015<br />\
    <img src="styles/legend/VegetationsnderungNDVIseit2015_12_0.png" /> Zunahme<br />\
    <img src="styles/legend/VegetationsnderungNDVIseit2015_12_1.png" /> stabil<br />\
    <img src="styles/legend/VegetationsnderungNDVIseit2015_12_2.png" /> Verlust<br />' ,
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/VegetationsnderungNDVIseit2015_12.png",
            attributions: ' ',
            projection: 'EPSG:3857',
            alwaysInRange: true,
            imageExtent: [1533165.464700, 6632565.924100, 1548571.065500, 6645890.841800]
        })
    });
var format_FlchenNDVI06inha500m_13 = new ol.format.GeoJSON();
var features_FlchenNDVI06inha500m_13 = format_FlchenNDVI06inha500m_13.readFeatures(json_FlchenNDVI06inha500m_13, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FlchenNDVI06inha500m_13 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FlchenNDVI06inha500m_13.addFeatures(features_FlchenNDVI06inha500m_13);
var lyr_FlchenNDVI06inha500m_13 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_FlchenNDVI06inha500m_13,
maxResolution:14.00223307613098,
 
                style: style_FlchenNDVI06inha500m_13,
                popuplayertitle: 'Flächen NDVI < 0,6 in ha (> 500 m²)',
                interactive: true,
    title: 'Flächen NDVI < 0,6 in ha (> 500 m²)<br />\
    <img src="styles/legend/FlchenNDVI06inha500m_13_0.png" /> 0,05 - 0,08 ha<br />\
    <img src="styles/legend/FlchenNDVI06inha500m_13_1.png" /> 0,08 - 0,13 ha<br />\
    <img src="styles/legend/FlchenNDVI06inha500m_13_2.png" /> 0,13 - 0,20 ha<br />\
    <img src="styles/legend/FlchenNDVI06inha500m_13_3.png" /> 0,20 - 0,26 ha<br />\
    <img src="styles/legend/FlchenNDVI06inha500m_13_4.png" /> 0,26 - 0,40 ha<br />\
    <img src="styles/legend/FlchenNDVI06inha500m_13_5.png" /> > 0,4 ha<br />' });
var format_groflchigeRodung4000m_14 = new ol.format.GeoJSON();
var features_groflchigeRodung4000m_14 = format_groflchigeRodung4000m_14.readFeatures(json_groflchigeRodung4000m_14, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_groflchigeRodung4000m_14 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_groflchigeRodung4000m_14.addFeatures(features_groflchigeRodung4000m_14);
var lyr_groflchigeRodung4000m_14 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_groflchigeRodung4000m_14,
maxResolution:162.17554375571817,
 minResolution:11.847009361052901,

                style: style_groflchigeRodung4000m_14,
                popuplayertitle: 'großflächige Rodung (> 4000 m²)',
                interactive: true,
                title: '<img src="styles/legend/groflchigeRodung4000m_14.png" /> großflächige Rodung (> 4000 m²)'
            });
var format_DresdnerHeide_15 = new ol.format.GeoJSON();
var features_DresdnerHeide_15 = format_DresdnerHeide_15.readFeatures(json_DresdnerHeide_15, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_DresdnerHeide_15 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_DresdnerHeide_15.addFeatures(features_DresdnerHeide_15);
var lyr_DresdnerHeide_15 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_DresdnerHeide_15,
maxResolution:162.17554375571817,
 
                style: style_DresdnerHeide_15,
                popuplayertitle: 'Dresdner Heide',
                interactive: false,
                title: '<img src="styles/legend/DresdnerHeide_15.png" /> Dresdner Heide'
            });
var group_VegetationsdichteSOMMER = new ol.layer.Group({
                                layers: [lyr_2025SatellitenbildSommer_9,lyr_2015SatellitenbildSommer_10,lyr_VegetationNDVIderletzten5JahreSommer_11,lyr_VegetationsnderungNDVIseit2015_12,],
                                fold: 'close',
                                title: 'Vegetationsdichte SOMMER'});
var group_VegetationsdichteWINTER = new ol.layer.Group({
                                layers: [lyr_2015SatellitenbildWinter_5,lyr_2025SatellitenbildWinter_6,lyr_VegetationNDVIderletzten5JahreWinter_7,lyr_VegetationsnderungNDVIseit2015_8,],
                                fold: 'close',
                                title: 'Vegetationsdichte WINTER'});

lyr_ESRIGraylight_0.setVisible(true);lyr_OpenStreetMap_1.setVisible(false);lyr_Hintergrundbild_2.setVisible(true);lyr_Dresden_3.setVisible(true);lyr_Dresden_4.setVisible(true);lyr_2015SatellitenbildWinter_5.setVisible(true);lyr_2025SatellitenbildWinter_6.setVisible(true);lyr_VegetationNDVIderletzten5JahreWinter_7.setVisible(true);lyr_VegetationsnderungNDVIseit2015_8.setVisible(true);lyr_2025SatellitenbildSommer_9.setVisible(true);lyr_2015SatellitenbildSommer_10.setVisible(true);lyr_VegetationNDVIderletzten5JahreSommer_11.setVisible(true);lyr_VegetationsnderungNDVIseit2015_12.setVisible(false);lyr_FlchenNDVI06inha500m_13.setVisible(true);lyr_groflchigeRodung4000m_14.setVisible(true);lyr_DresdnerHeide_15.setVisible(true);
var layersList = [lyr_ESRIGraylight_0,lyr_OpenStreetMap_1,lyr_Hintergrundbild_2,lyr_Dresden_3,lyr_Dresden_4,group_VegetationsdichteWINTER,group_VegetationsdichteSOMMER,lyr_FlchenNDVI06inha500m_13,lyr_groflchigeRodung4000m_14,lyr_DresdnerHeide_15];
lyr_Dresden_3.set('fieldAliases', {'fid': 'fid', 'schluessel': 'schluessel', 'name': 'Stadt', 'flaeche_qkm': 'Fläche in km²', 'einwohner': 'Einwohner', 'flaeche_wald_gesamt': 'Gesamtwaldfläche', 'flaeche_heide': 'Größe der Dresdner Heide', });
lyr_Dresden_4.set('fieldAliases', {'fid': 'fid', 'schluessel': 'schluessel', 'name': 'Stadt', 'flaeche_qkm': 'Fläche in km²', 'einwohner': 'Einwohner', 'flaeche_wald_gesamt': 'Gesamtwaldfläche', 'flaeche_heide': 'Größe der Dresdner Heide', });
lyr_FlchenNDVI06inha500m_13.set('fieldAliases', {'fid': 'fid', 'wald_referenz_jahr': 'wald_referenz_jahr', 'wald_union_jahre': 'wald_union_jahre', 'flaeche_ha': 'Fläche in ha', });
lyr_groflchigeRodung4000m_14.set('fieldAliases', {'fid': 'fid', 'wald_referenz_jahr': 'wald_referenz_jahr', 'wald_union_jahre': 'wald_union_jahre', 'flaeche_ha': 'Fläche in ha', 'bild': 'Bild', 'quelle': 'Quelle', });
lyr_DresdnerHeide_15.set('fieldAliases', {'fid': 'fid', 'schluessel': 'schluessel', 'ortsteil': 'Name', 'kreis': 'kreis', 'flaeche_qkm': 'Fläche in km²', });
lyr_Dresden_3.set('fieldImages', {'fid': 'TextEdit', 'schluessel': 'TextEdit', 'name': 'TextEdit', 'flaeche_qkm': 'TextEdit', 'einwohner': 'Range', 'flaeche_wald_gesamt': 'TextEdit', 'flaeche_heide': 'TextEdit', });
lyr_Dresden_4.set('fieldImages', {'fid': 'TextEdit', 'schluessel': 'TextEdit', 'name': 'TextEdit', 'flaeche_qkm': 'TextEdit', 'einwohner': 'Range', 'flaeche_wald_gesamt': 'TextEdit', 'flaeche_heide': 'TextEdit', });
lyr_FlchenNDVI06inha500m_13.set('fieldImages', {'fid': 'TextEdit', 'wald_referenz_jahr': 'Range', 'wald_union_jahre': 'TextEdit', 'flaeche_ha': 'TextEdit', });
lyr_groflchigeRodung4000m_14.set('fieldImages', {'fid': 'TextEdit', 'wald_referenz_jahr': 'Range', 'wald_union_jahre': 'TextEdit', 'flaeche_ha': 'TextEdit', 'bild': 'TextEdit', 'quelle': 'TextEdit', });
lyr_DresdnerHeide_15.set('fieldImages', {'fid': 'TextEdit', 'schluessel': 'TextEdit', 'ortsteil': 'TextEdit', 'kreis': 'TextEdit', 'flaeche_qkm': 'TextEdit', });
lyr_Dresden_3.set('fieldLabels', {'fid': 'hidden field', 'schluessel': 'hidden field', 'name': 'hidden field', 'flaeche_qkm': 'header label - visible with data', 'einwohner': 'header label - visible with data', 'flaeche_wald_gesamt': 'header label - visible with data', 'flaeche_heide': 'header label - visible with data', });
lyr_Dresden_4.set('fieldLabels', {'fid': 'hidden field', 'schluessel': 'hidden field', 'name': 'header label - visible with data', 'flaeche_qkm': 'header label - visible with data', 'einwohner': 'header label - visible with data', 'flaeche_wald_gesamt': 'header label - visible with data', 'flaeche_heide': 'header label - visible with data', });
lyr_FlchenNDVI06inha500m_13.set('fieldLabels', {'fid': 'hidden field', 'wald_referenz_jahr': 'hidden field', 'wald_union_jahre': 'hidden field', 'flaeche_ha': 'header label - visible with data', });
lyr_groflchigeRodung4000m_14.set('fieldLabels', {'fid': 'hidden field', 'wald_referenz_jahr': 'hidden field', 'wald_union_jahre': 'hidden field', 'flaeche_ha': 'header label - visible with data', 'bild': 'header label - visible with data', 'quelle': 'header label - visible with data', });
lyr_DresdnerHeide_15.set('fieldLabels', {'fid': 'hidden field', 'schluessel': 'hidden field', 'ortsteil': 'header label - visible with data', 'kreis': 'header label - always visible', 'flaeche_qkm': 'header label - visible with data', });
lyr_DresdnerHeide_15.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});