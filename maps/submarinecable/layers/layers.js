var wms_layers = [];


        var lyr_ESRISatellite_0 = new ol.layer.Tile({
            'title': 'ESRI Satellite',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_DarkMatterretina_1 = new ol.layer.Tile({
            'title': 'Dark Matter (retina)',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '&nbsp;&middot; <a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>',
                url: 'https://a.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}@2x.png'
            })
        });

        var lyr_Voyagerretina_2 = new ol.layer.Tile({
            'title': 'Voyager (retina)',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}@2x.png'
            })
        });
var format_LndernachAnzahlderLandepunkte_3 = new ol.format.GeoJSON();
var features_LndernachAnzahlderLandepunkte_3 = format_LndernachAnzahlderLandepunkte_3.readFeatures(json_LndernachAnzahlderLandepunkte_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LndernachAnzahlderLandepunkte_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LndernachAnzahlderLandepunkte_3.addFeatures(features_LndernachAnzahlderLandepunkte_3);
var lyr_LndernachAnzahlderLandepunkte_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LndernachAnzahlderLandepunkte_3, 
                style: style_LndernachAnzahlderLandepunkte_3,
                popuplayertitle: 'Länder nach Anzahl der Landepunkte',
                interactive: true,
    title: 'Länder nach Anzahl der Landepunkte<br />\
    <img src="styles/legend/LndernachAnzahlderLandepunkte_3_0.png" /> 0 - 5<br />\
    <img src="styles/legend/LndernachAnzahlderLandepunkte_3_1.png" /> 5 - 20<br />\
    <img src="styles/legend/LndernachAnzahlderLandepunkte_3_2.png" /> 20 - 50<br />\
    <img src="styles/legend/LndernachAnzahlderLandepunkte_3_3.png" /> 50 - 100<br />\
    <img src="styles/legend/LndernachAnzahlderLandepunkte_3_4.png" /> 100 - 130<br />' });
var format_Lnder_4 = new ol.format.GeoJSON();
var features_Lnder_4 = format_Lnder_4.readFeatures(json_Lnder_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Lnder_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Lnder_4.addFeatures(features_Lnder_4);
var lyr_Lnder_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Lnder_4, 
                style: style_Lnder_4,
                popuplayertitle: 'Länder',
                interactive: true,
                title: '<img src="styles/legend/Lnder_4.png" /> Länder'
            });
var format_LandepunkteAnzahlderKabel_5 = new ol.format.GeoJSON();
var features_LandepunkteAnzahlderKabel_5 = format_LandepunkteAnzahlderKabel_5.readFeatures(json_LandepunkteAnzahlderKabel_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LandepunkteAnzahlderKabel_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LandepunkteAnzahlderKabel_5.addFeatures(features_LandepunkteAnzahlderKabel_5);
var lyr_LandepunkteAnzahlderKabel_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LandepunkteAnzahlderKabel_5, 
                style: style_LandepunkteAnzahlderKabel_5,
                popuplayertitle: 'Landepunkte (Anzahl der Kabel)',
                interactive: true,
    title: 'Landepunkte (Anzahl der Kabel)<br />\
    <img src="styles/legend/LandepunkteAnzahlderKabel_5_0.png" /> 0 - 2<br />\
    <img src="styles/legend/LandepunkteAnzahlderKabel_5_1.png" /> 2 - 6<br />\
    <img src="styles/legend/LandepunkteAnzahlderKabel_5_2.png" /> 6 - 20<br />' });
var format_Unterwasserkabel_6 = new ol.format.GeoJSON();
var features_Unterwasserkabel_6 = format_Unterwasserkabel_6.readFeatures(json_Unterwasserkabel_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Unterwasserkabel_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Unterwasserkabel_6.addFeatures(features_Unterwasserkabel_6);
var lyr_Unterwasserkabel_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Unterwasserkabel_6, 
                style: style_Unterwasserkabel_6,
                popuplayertitle: 'Unterwasserkabel',
                interactive: true,
    title: 'Unterwasserkabel<br />\
    <img src="styles/legend/Unterwasserkabel_6_0.png" /> aktiv<br />\
    <img src="styles/legend/Unterwasserkabel_6_1.png" /> geplannt<br />\
    <img src="styles/legend/Unterwasserkabel_6_2.png" /> nan<br />' });
var group_Basemaps = new ol.layer.Group({
                                layers: [lyr_ESRISatellite_0,lyr_DarkMatterretina_1,lyr_Voyagerretina_2,],
                                fold: 'open',
                                title: 'Basemaps'});

lyr_ESRISatellite_0.setVisible(false);lyr_DarkMatterretina_1.setVisible(true);lyr_Voyagerretina_2.setVisible(false);lyr_LndernachAnzahlderLandepunkte_3.setVisible(false);lyr_Lnder_4.setVisible(true);lyr_LandepunkteAnzahlderKabel_5.setVisible(true);lyr_Unterwasserkabel_6.setVisible(true);
var layersList = [group_Basemaps,lyr_LndernachAnzahlderLandepunkte_3,lyr_Lnder_4,lyr_LandepunkteAnzahlderKabel_5,lyr_Unterwasserkabel_6];
lyr_LndernachAnzahlderLandepunkte_3.set('fieldAliases', {'fid': 'fid', 'continent': 'Kontinent', 'name_de': 'Land', 'anzahl_landepunkte': 'Anzahl Landepunkte', });
lyr_Lnder_4.set('fieldAliases', {'fid': 'fid', 'continent': 'Kontinent', 'name_de': 'Land', 'anzahl_landepunkte': 'Anzahl Landepunkte', });
lyr_LandepunkteAnzahlderKabel_5.set('fieldAliases', {'fid': 'fid', 'name': 'name', 'cable_count': 'cable_count', });
lyr_Unterwasserkabel_6.set('fieldAliases', {'fid': 'fid', 'name': 'Name', 'rfs_year': 'rfs_year', 'status': 'status', 'landing_point_ids': 'landing_point_ids', 'suppliers': 'suppliers', 'owners': 'owners', 'bild': 'Bild', 'url_bild': 'Bildquelle', 'length_map_sting': 'Kabellänge (gemessen)', 'cable_length_de': 'Kabellänge (original)', 'status_de': 'Status', 'year': 'year', 'year_rfs': 'Jahr', });
lyr_LndernachAnzahlderLandepunkte_3.set('fieldImages', {'fid': 'Hidden', 'continent': 'Hidden', 'name_de': 'Hidden', 'anzahl_landepunkte': 'Hidden', });
lyr_Lnder_4.set('fieldImages', {'fid': 'Hidden', 'continent': 'TextEdit', 'name_de': 'TextEdit', 'anzahl_landepunkte': 'Range', });
lyr_LandepunkteAnzahlderKabel_5.set('fieldImages', {'fid': 'Hidden', 'name': 'TextEdit', 'cable_count': 'Range', });
lyr_Unterwasserkabel_6.set('fieldImages', {'fid': 'Hidden', 'name': 'TextEdit', 'rfs_year': 'Hidden', 'status': 'Hidden', 'landing_point_ids': 'Hidden', 'suppliers': 'Hidden', 'owners': 'Hidden', 'bild': 'TextEdit', 'url_bild': 'TextEdit', 'length_map_sting': 'TextEdit', 'cable_length_de': 'TextEdit', 'status_de': 'TextEdit', 'year': 'Hidden', 'year_rfs': 'TextEdit', });
lyr_LndernachAnzahlderLandepunkte_3.set('fieldLabels', {});
lyr_Lnder_4.set('fieldLabels', {'continent': 'inline label - visible with data', 'name_de': 'inline label - visible with data', 'anzahl_landepunkte': 'inline label - visible with data', });
lyr_LandepunkteAnzahlderKabel_5.set('fieldLabels', {'name': 'inline label - visible with data', 'cable_count': 'inline label - visible with data', });
lyr_Unterwasserkabel_6.set('fieldLabels', {'name': 'inline label - visible with data', 'bild': 'inline label - visible with data', 'url_bild': 'inline label - visible with data', 'length_map_sting': 'inline label - visible with data', 'cable_length_de': 'inline label - visible with data', 'status_de': 'inline label - visible with data', 'year_rfs': 'inline label - visible with data', });
lyr_Unterwasserkabel_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});