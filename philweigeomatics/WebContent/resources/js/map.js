var map;
if( !map ){
	map = {};
}else if( !map instanceof Object ){
	throw new Error("map is already created and its not an object.");
}

map.init = function(){
    var map = new OpenLayers.Map('map',{
    	projection:"EPSG:900913",
    	displayProjection:"EPSG:4326",
    	numZoomLevel: 18
    });
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    
    var gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {type: google.maps.MapTypeId.TERRAIN}
    );
    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {numZoomLevels:20}
    );
    var ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
    );
    var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );


    map.addLayers([gphy, gmap, ghyb, gsat]);

    map.setCenter(new OpenLayers.LonLat(51.12, -114.234), 5);
};


