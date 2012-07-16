var map;
if( !map ){
	map = {};
}else if( !map instanceof Object ){
	throw new Error("map is already created and its not an object.");
}

var formatGJson;
var formatJson;
map.init = function(){
	
	
	// the map is an OpenLayers map object.
    var map = new OpenLayers.Map('map',{
    	projection:"EPSG:900913",
    	displayProjection:"EPSG:4326", // setting what projection the mouse coordinates will be, but 900913 is actually spherical mercator.
    	numZoomLevel: 18
    });
    window.map.Map = map;
    
  
   
    
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
        	isBaseLayer:true
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

   
    // add base layer 
    map.addLayers([ gmap, ghyb ]);
    
    var in_options = {
            'internalProjection': map.baseLayer.projection,
            'externalProjection': "EPSG:4326"
        }; 
    
    
    map.tripLayer = new OpenLayers.Layer.Vector("Trip Plans",{
    	strategies: [new OpenLayers.Strategy.Fixed()],
    	protocol: new OpenLayers.Protocol.HTTP({
    		url:"resources/data/tripPlans.json",
    		format: new OpenLayers.Format.GeoJSON( in_options )
    	})
    });
    
    map.arrivalLayer = new OpenLayers.Layer.Vector("Arrived",{
    	strategies: [new OpenLayers.Strategy.Fixed()],
    	protocol: new OpenLayers.Protocol.HTTP({
    		url:"resources/data/arrived.json",
    		format: new OpenLayers.Format.GeoJSON( in_options )
    	})
    });
    
    map.addLayers( [ map.tripLayer, map.arrivalLayer] );

    map.featureControl = new OpenLayers.Control.SelectFeature(
    	[map.tripLayer, map.arrivalLayer],
    	{
    		box: false,
    		clickout: true,
    		multiple:false,
    		toggle: true
    	}
    );
    
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl( map.featureControl );
    map.featureControl.activate();
    map.setCenter(new OpenLayers.LonLat(-114.01234,51.0235).transform("EPSG:4326","EPSG:900913"), 7);

};




// create a feature ID object
map.featureIds = {
		ferrariWorld:"MapLayer_1",
		gatesHouse:"MapLayer_2",
		eiffelTower:"MapLayer_3",
		nurburgring:"MapLayer_4"
};

map.tripPlans = {
	"type":"FeatureCollection",
	"features":[
		{
			"id":"MapLayer_1",
			"type":"Feature",
			"properties":{
				"city":"Abu Dhabi",
				"interest": "Ferrari World",
				"link": "http://www.ferrariworldabudhabi.com/",
				"forPhil": "See the Ferrari World"
			},
			"geometry":{
							"type":"Point",
							"coordinates":[54.607126,24.483738]
						}
		},
		{
			"id":"MapLayer_2",
			"type":"Feature",
			"properties":{
				"city":"Medina, Washington",
				"interest": "Bill Gates House",
				"link":"http://en.wikipedia.org/wiki/Bill_Gates'_house",
				"forPhil":"Talk to him before he dies"
			},
			"geometry":{
				"type":"Point",
				"coordinates":[-122.243204,47.624908]
			}
		}
	],
	"use":"Layer",
	"name":"Trip Plans"
};

map.arrived = {
			"type":"FeatureCollection",
			"features":[
				{
					"id":"MapLayer_10",
					"type":"Feature",
					"properties":{
					},
					"geometry":{
									"type":"Point",
									"coordinates":[112.551745, 37.871627 ]
								}
				},
				{
					"id":"MapLayer_11",
					"type":"Feature",
					"properties":{
					},
					"geometry":{
						"type":"Point",
						"coordinates":[116.403765, 39.908061 ]
					}
				}
			]
		};