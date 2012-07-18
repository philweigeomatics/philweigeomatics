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
map.features = [];
map.bounds = null;

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
        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22,
        	resolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
                          19567.87923828125, 9783.939619140625, 4891.9698095703125,
                          2445.9849047851562, 1222.9924523925781, 611.4962261962891,
                          305.74811309814453, 152.87405654907226, 76.43702827453613,
                          38.218514137268066, 19.109257068634033, 9.554628534317017,
                          4.777314267158508, 2.388657133579254, 1.194328566789627,
                          0.5971642833948135, 0.25, 0.1, 0.05]}
    );
    var gsat = new OpenLayers.Layer.Google(
        "Google Satellite",
        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22,resolutions: [156543.03390625, 78271.516953125, 39135.7584765625,
                                                                                19567.87923828125, 9783.939619140625, 4891.9698095703125,
                                                                                2445.9849047851562, 1222.9924523925781, 611.4962261962891,
                                                                                305.74811309814453, 152.87405654907226, 76.43702827453613,
                                                                                38.218514137268066, 19.109257068634033, 9.554628534317017,
                                                                                4.777314267158508, 2.388657133579254, 1.194328566789627,
                                                                                0.5971642833948135, 0.25, 0.1, 0.05]}
    );

   
    // add base layer 
    map.addLayers([ gsat ]);
    
    var in_options = {
            'internalProjection': map.baseLayer.projection,
            'externalProjection': "EPSG:4326"
        }; 
    
    
    window.map.tripLayer = new OpenLayers.Layer.Vector("Trip Plans",{
    	strategies: [new OpenLayers.Strategy.Fixed()],
    	protocol: new OpenLayers.Protocol.HTTP({
    		url:"resources/data/tripPlans.json",
    		format: new OpenLayers.Format.GeoJSON( in_options )
    	}),
    	eventListeners:{
    		"featureselected":function(evt){
    			window.map.selectedTripPlansFeature = evt.feature;
    			var feature = evt.feature;
    			var linkRow;
    			if( feature.attributes["linkType"] === utils.linkType.wikipedia){
    				linkRow = "<tr><th class='strong'>link:</th><td><a href=\""+feature.attributes["link"]+"\" target=\"_blank\"><img src=\"resources/img/wikipedia_icon.png\" alt=\"wikipedia\"/></a></td></tr>";
    			}else if( feature.attributes["linkType"] === utils.linkType.website){
    				linkRow = "<tr><th class='strong'>link:</th><td><a href=\""+feature.attributes["link"]+"\" target=\"_blank\"><img src=\"resources/img/IE_icon.png\" alt=\"wikipedia\"/></a></td></tr>";
    			}else{
    				linkRow = "<tr><th class='strong'></th><td></td></tr>";
    			}
    			var popup = new OpenLayers.Popup.FramedCloud( feature.id, feature.geometry.getBounds().getCenterLonLat(), null, 
    					"<table>"+
    					"<tr><th class='strong'>interested in:</th><td>"+feature.attributes["interest"]+"</td></tr>"+
    					"<tr><th class='strong'>Goal:</th><td>"+feature.attributes["forPhil"]+"</td></tr>"+
    					linkRow+
    					"</table>", null, true, map.onPopupClose
    			);
    			popup.panMapIfOutOfView = true;
    			feature.popup = popup;
    			map.addPopup( popup );
    		},
    		
    		"featureunselected":function(evt){
    			if( evt !== null){
    				window.map.selectedTripPlansFeature = null;
    				var feature = evt.feature;
    				if( feature ){
    					map.removePopup( feature.popup );
    					feature.popup.destroy();
    					feature.popup = null;
    				}
    			}
    		},
    		"featuresadded":function(evt){
    			var addedFeatures = evt.features;
    			var wMap = window.map;
    			wMap.features.concat( addedFeatures );
    			for( var i = 0; i<addedFeatures.length; i++ ){
    				if( !wMap.bounds ){
        				wMap.bounds = addedFeatures[i].geometry.getBounds();
        			}else{
        				wMap.bounds.extend( addedFeatures[i].geometry.getBounds());
        			}
    			}
    			
    			map.zoomToExtent( wMap.bounds );
    		}
    	}
    });
    
    
    
    window.map.arrivalLayer = new OpenLayers.Layer.Vector("Arrived",{
    	strategies: [new OpenLayers.Strategy.Fixed()],
    	protocol: new OpenLayers.Protocol.HTTP({
    		url:"resources/data/arrived.json",
    		format: new OpenLayers.Format.GeoJSON( in_options )
    	}),
    	eventListeners:{
    		"featureselected":function(evt){
    			window.map.selectedArrivedFeature = evt.feature;
    			var feature = evt.feature;
    			var popup = new OpenLayers.Popup.FramedCloud( feature.id, feature.geometry.getBounds().getCenterLonLat(), null, 
    					"<p>"+feature.attributes["forPhil"]+"</p>", null, true, map.onPopupClose,
    					{
    						closeOnMove:true
    					}
    				);
    			popup.panMapIfOutOfView = true;
    			feature.popup = popup;
    			map.addPopup( popup );
    		},
    		"featureunselected":function(evt){
				if( evt !== null){
					window.map.selectedArrivedFeature = null;
					var feature = evt.feature;
					if( feature ){
						map.removePopup( feature.popup );
						feature.popup.destroy();
						feature.popup = null;
					}
				}
    		},
    		"featuresadded":function(evt){
    			var addedFeatures = evt.features;
    			var wMap = window.map;
    			wMap.features.concat( addedFeatures );
    			for( var i = 0; i<addedFeatures.length; i++ ){
    				if( !wMap.bounds ){
        				wMap.bounds = addedFeatures[i].geometry.getBounds();
        			}else{
        				wMap.bounds.extend( addedFeatures[i].geometry.getBounds());
        			}
    			}
    			map.zoomToExtent( wMap.bounds );
    		}
    	}
    });

    map.addLayers( [ window.map.tripLayer, window.map.arrivalLayer] );

    window.map.featureControl = new OpenLayers.Control.SelectFeature(
    		[ window.map.tripLayer, window.map.arrivalLayer],
    		{
    			box:false,
    			clickout:true,
    			multiple:false,
    			toggle:true
    		}
    );
    
    map.addControl(new OpenLayers.Control.LayerSwitcher());
    map.addControl( window.map.featureControl );
    window.map.featureControl.activate();
//    map.setCenter(new OpenLayers.LonLat(-114.01234,51.0235).transform("EPSG:4326","EPSG:900913"), 7);

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
//	"strokeColor":"#C0C0C0",
//	"strokeWidth":3,
//	"pointRadius":15,
//	"cursor":"pointer",
	
	"label":"${city}",
	"labelYOffset":20,
	"fontWeight":"bold",
	"fontColor":"#00FF7F",
	"fontOpacity":1,
	"fontSize":16,
	"cursor":"pointer",
	"fill":true,
	"graphic":true,
	"externalGraphic":"resources/img/travel1.png",
	"graphicHeight":48,
	"graphicWidth":48
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
	map.tripLayer.styleMap = map.mapTheme2;
};

map.styleArrivedFeatures = function(){
	map.arrivalLayer.styleMap = map.mapTheme1;
};


var arrivedSymbolizerLookupSelect = {
		"visited":{
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
			"graphicOpacity":0.6,
			"cursor":"pointer"
		},
		"reside":{
			"graphic":true,
			"externalGraphic":"resources/img/home_current.png",
			"graphicHeight":48,
			"graphicWidth":48,
			"graphicOpacity":0.6,
			"cursor":"pointer"
		}
};

var arrivedSymbolizerLookupDefault = {
		"visited":{
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
			"graphicOpacity":1,
			"cursor":"pointer"
		},
		"reside":{
			"graphic":true,
			"externalGraphic":"resources/img/home_current.png",
			"graphicHeight":48,
			"graphicWidth":48,
			"graphicOpacity":1,
			"cursor":"pointer"
		}
};

map.mapTheme1.addUniqueValueRules("default","type",arrivedSymbolizerLookupDefault);
map.mapTheme1.addUniqueValueRules("select","type",arrivedSymbolizerLookupSelect);

//map.onTripPlansPopupClose = function( evt ){
//	map.featureControlTripPlans.unselect( map.selectedTripPlansFeature );
//};
//
//map.onArrivalPopupClose = function( evt ){
//	map.featureControlArrival.unselect( map.selectedArrivedFeature );
//};
//map.onTripPlansFeatureSelect = function( feature ){
	
//};
//
//map.onArrivedFeatureSelect = function( feature ){
//	// TODO: implement this
//};
//
//map.onFeatureUnselect = function( feature ){
//	map.Map.removePopup( feature.popup );
//	feature.popup.destroy();
//	feature.popup = null;
//};