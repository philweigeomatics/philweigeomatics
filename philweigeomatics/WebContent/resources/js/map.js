var map;
if( !map ){
	map = {};
}else if( !map instanceof Object ){
	throw new Error("map is already created and its not an object.");
}

map.selectedTripPlansFeature;
map.selectedArrivedFeature;
map.tripPlansPopup;
map.arrivalPopup;

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
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20 }
    );
    var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
    );

   
    // add base layer 
    map.addLayers([ ghyb ]);
    
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
    
//    map.arrivalLayer.style = window.map.theme1;
    
    map.addLayers( [ map.tripLayer, map.arrivalLayer] );

//    map.arrivalLayer.styleMap = window.map.mapTheme1;
    window.map.featureControlTripPlans = new OpenLayers.Control.SelectFeature(
    	map.tripLayer,
    	{
    		box: false,
    		clickout: true,
    		multiple:false,
    		toggle: true,
			onSelect: window.map.onTripPlansFeatureSelect,
			onUnselect: window.map.onFeatureUnselect
    	}
    );
    
    window.map.featureControlArrival = new OpenLayers.Control.SelectFeature(
    		map.arrivalLayer,
    		{
    			box:false,
    			clickout:true,
    			multiple:false,
    			toggle:true,
    			onSelect: window.map.onArrivedFeatureSelect,
    			onUnselect: window.map.onFeatureUnselect
    		}
    		);
    
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl( window.map.featureControlTripPlans );
    map.addControl( window.map.featureControlArrival );
    window.map.featureControlTripPlans.activate();
    window.map.featureControlArrival.activate();
    map.setCenter(new OpenLayers.LonLat(-114.01234,51.0235).transform("EPSG:4326","EPSG:900913"), 7);

    window.map.styleTripPlansFeatures();
    window.map.styleArrivedFeatures();
};




// create a feature ID object
map.featureIds = {
		/* start of plans */
		ferrariWorld:"MapLayer_1",
		gatesHouse:"MapLayer_2",
		eiffelTower:"MapLayer_3",
		theBahamas:"MapLayer_4",
		taiwan:"MapLayer_5",
		tokyo:"MapLayer_6",
		nurburgring:"MapLayer_7",
		silliconValley:"MapLayer_8",
		london:"MapLayer_9",
		amazon:"MapLayer_10",
		
		/* start of arrived */
		taiyuan:"MapLayer_11",
		beijing:"MapLayer_12",
		calgary:"MapLayer_13",
		banff:"MapLayer_14",
		quebec:"MapLayer_15",
		vancouver:"MapLayer_16",
		kelowna:"MapLayer_17",
		jasper:"MapLayer_18"
};

map.theme1 = new OpenLayers.Style({
	/* big Green circle with silver ring*/
	
	"fillColor" : "#00FF00",
	"fillOpacity": 0.8,
	"strokeColor": "#C0C0C0",
	"strokeWidth": 3,
	"pointRadius": 15,
	"cursor":"pointer",
	"label":'${label}',
	"labelYOffset":20,
	"fontWeight":"bold",
	"fontColor":"#FF0000",
	"fontOpacity":1,
	"fontSize":16
});

map.theme2 = new OpenLayers.Style({
//	"fillColor" : "#FF0000",
//	"fillOpacity":0.6,
//	"strokeColor":"#C0C0C0",
//	"strokeWidth":3,
//	"pointRadius":15,
//	"cursor":"pointer"
	"graphic":true,
	"externalGraphic":"resources/img/travel1.png",
	"graphicHeight":48,
	"graphicWidth":48,
	"label":"${city}",
	"labelYOffset":20,
	"fontWeight":"bold",
	"fontColor":"#00FF7F",
	"fontOpacity":1,
	"fontSize":16,
	"cursor":"pointer",
	"fill":true
});

map.theme3 = new OpenLayers.Style({
	"fillColor":"#000000",
	"fillOpacity":0.6,
	"strokeColor":"#C0C0C0",
	"strokeWidth":3,
	"pointRadius":15
});

map.mapTheme1 = new OpenLayers.StyleMap({});

map.mapTheme2 = new OpenLayers.StyleMap({
	"default":map.theme2,
	"select":map.theme3
});


map.styleTripPlansFeatures = function(){
	map.Map.tripLayer.styleMap = map.mapTheme2;
};

map.styleArrivedFeatures = function(){
	map.Map.arrivalLayer.styleMap = map.mapTheme1;
};


var arrivedSymbolizerLookupSelect = {
		"visited":{
			/* big black circle with silver ring*/
			
			"fillColor":"#000000",
			"fillOpacity":0.6,
			"strokeColor":"#C0C0C0",
			"strokeWidth":3,
			"pointRadius":15,
			"cursor":"pointer",
			"label":'${label}',
			"labelYOffset":20,
			"fontWeight":"bold",
			"fontColor":"#FF0000",
			"fontOpacity":1,
			"fontSize":16
		},
		"hometown":{
			"graphic":true,
			"externalGraphic":"resources/img/home_town.png",
			"graphicHeight":48,
			"graphicWidth":48,
			"graphicOpacity":0.6
		},
		"reside":{
			"graphic":true,
			"externalGraphic":"resources/img/home_current.png",
			"graphicHeight":48,
			"graphicWidth":48,
			"graphicOpacity":0.6
		}
};

var arrivedSymbolizerLookupDefault = {
		"visited":{
			/* big Greeb circle with silver ring*/
			
			"fillColor" : "#00FF00",
			"fillOpacity": 0.8,
			"strokeColor": "#C0C0C0",
			"strokeWidth": 3,
			"pointRadius": 15,
			"cursor":"pointer",
			"label":'${label}',
			"labelYOffset":20,
			"fontWeight":"bold",
			"fontColor":"#FF0000",
			"fontOpacity":1,
			"fontSize":16
		},
		"hometown":{
			"graphic":true,
			"externalGraphic":"resources/img/home_town.png",
			"graphicHeight":48,
			"graphicWidth":48,
			"graphicOpacity":1
		},
		"reside":{
			"graphic":true,
			"externalGraphic":"resources/img/home_current.png",
			"graphicHeight":48,
			"graphicWidth":48,
			"graphicOpacity":1
		}
};

map.mapTheme1.addUniqueValueRules("default","type",arrivedSymbolizerLookupDefault);
map.mapTheme1.addUniqueValueRules("select","type",arrivedSymbolizerLookupSelect);

map.onTripPlansPopupClose = function( evt ){
	map.featureControlTripPlans.unselect( map.selectedTripPlansFeature );
};

map.onArrivalPopupClose = function( evt ){
	map.featureControlArrival.unselect( map.selectedArrivedFeature );
};
map.onTripPlansFeatureSelect = function( feature ){
	map.selectedFeature = feature;
	var popup = new OpenLayers.Popup.FramedCloud( feature.id, feature.geometry.getBounds().getCenterLonLat(), null, 
			"<table><tr><td>interested in:</td><td>"+feature.attributes["interest"]+"</td></tr><tr><td>Goal:</td><td>"+feature.attributes["forPhil"]+"</td></tr>", null, true, map.onPopupClose );
	feature.popup = popup;
	map.Map.addPopup( popup );
};

map.onArrivedFeatureSelect = function( feature ){
	// TODO: implement this
};

map.onFeatureUnselect = function( feature ){
	map.Map.removePopup( feature.popup );
	feature.popup.destroy();
	feature.popup = null;
};