map.off();
map.remove();
map = L.map('map_target')
map.setView([30, 31], 1.5)

L.tileLayer("https://api.mapbox.com/v4/mapbox.light.html?access_token=" + mapboxAccessToken, {
    id: "mapbox.light",
    attribution: "data.geojson"
}).addTo(map);

var geojson; 

L.geoJson(maternalData).addTo(map);

function getColor(d) {  
    return  d > 7 ? chroma("08519c") :
            d > 3 ? chroma("4292c6") :
            d >= 0 ? chroma("9ecae1") :
            d = null ? chroma("ffffff"):
                        chroma("ffffff");

}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.lifetime_risk_maternal_death),
        weight: 2, 
        opacity: 0.8, 
        color: "black",
        fillOpacity: 1
    };
}

L.geoJson(maternalData, {style: style}).addTo(map);

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 3, 
        color: "#00001a", 
        dashArray: "",
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}


geojson = L.geoJson(maternalData, {
    style: style, 
    onEachFeature: onEachFeature
}).addTo(map);

function onEachFeature(feature, layer) {
    layer.bindPopup(feature.properties.country_region + "<br>Lifetime Risk of Maternal Death:<br>" + feature.properties.lifetime_risk_maternal_death + "%")
    layer.on({
        mouseover: highlightFeature, 
        mouseout: resetHighlight, 
        });
}

var legend = L.control({position: "bottomleft"});

legend.onAdd = function(map) {
    var div = L.DomUtil.create('div', "info legend"),
    grades = [0, 3, 7],
    labels =[];

for (var i = 0; i < grades.length; i++) {

    labels.push('<i style="background:' + getColor(grades[i] + 1) + '"</i> ' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+'));
    }

    div.innerHTML = labels.join("<br>")
    return div;
};

legend.addTo(map);



