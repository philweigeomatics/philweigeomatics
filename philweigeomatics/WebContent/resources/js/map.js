var map;
if( !map ){
	map = {};
}else if( !map instanceof Object ){
	throw new Error("map is already created and its not an object.");
}

map.init = function(){
	
	// the map is an OpenLayers map object.
    var map = new OpenLayers.Map('map',{
    	projection:"EPSG:900913",
    	displayProjection:"EPSG:4326", // setting what projection the mouse coordinates will be, but 900913 is actually spherical mercator.
    	numZoomLevel: 18
    });
   
    
    var gphy = new OpenLayers.Layer.Google(
        "Google Physical",
        {
        	type: google.maps.MapTypeId.TERRAIN
        }
    );
    
    
    var gmap = new OpenLayers.Layer.Google(
        "Google Streets", // the default
        {
        	sphericalMercator:true,
        	displayInLayerSwitcher: true,
        	attribution:"haha"
        }
    );
    var ghyb = new OpenLayers.Layer.Google(
        "Google Hybrid",
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 10 }
    );
    var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );


    map.addLayers([gphy, gmap, ghyb, gsat]);
    map.addControl(new OpenLayers.Control.LayerSwitcher());
//    gphy.setOpacity(0.5);
    map.setCenter(new OpenLayers.LonLat(-114.01234,51.0235).transform("EPSG:4326","EPSG:900913"), 7);
    
    // assigning the map object to another reference that can be accessed elsewhere.
    window.map.Map = map;
};


