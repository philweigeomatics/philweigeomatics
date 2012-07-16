/*
 * This file contains data about where Phil really wants to go for a trip or even longer stay.
 */


//*********** Check Dependancies ***************//
if( !asciiTable ){
	throw new Error("asciiTable object from site_behaviours.js is not loaded");
}



/**
 * The namespace object.
 */
var trip_goal;

if( !trip_goal ){
	trip_goal = {};
}else if( ! trip_goal instanceof Object ){
	throw new Error("trip_goal is already initiated and it is not an object.");
}


trip_goal.places = [
        {
			city:"Abu Dhabi",
			interest: "Ferrari World",
			link:"http://www.ferrariworldabudhabi.com/",
			loc:"",
			forPhil:"See the Ferrari World",
			isVisited: false
		},
		{
			city:"Medina, Washington",
			interest: "Bill Gates"+asciiTable.html.quote_single+" House",
			link:"http://en.wikipedia.org/wiki/Bill_Gates'_house",
			loc:"",
			forPhil:"See the Bill Gates"+asciiTable.html.quote_single+" House and maybe talk to him in person.",
			isVisited: false
		},
		{
			city:"Paris",
			interest: "Eiffel Tower",
			link: "http://en.wikipedia.org/wiki/Eiffel_Tower",
			loc:"",
			forPhil:"See the tower"+asciiTable.html.semicolon+"I would love to live there for a few months.",
			isVisited: false
		}
];

trip_goal.test = {
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
							"type:":"Point",
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

var te = {
	"type":"FeatureCollection",
	"features":[
		{
			"id":"MapLayer_10",
			"type":"Feature",
			"properties":{
				city:"Taiyuan",
				forPhil:"Home Town"
			},
			"geometry":{
							"type:":"Point",
							"coordinates":[112.551745, 37.871627 ]
						}
		},
		{
			"id":"MapLayer_11",
			"type":"Feature",
			"properties":{
				city:"Beijing",
				forPhil:"High School"
			},
			"geometry":{
				"type":"Point",
				"coordinates":[116.403765, 39.908061 ]
			}
		}
	],
	"use":"Layer",
	"name":"Arrived"
};