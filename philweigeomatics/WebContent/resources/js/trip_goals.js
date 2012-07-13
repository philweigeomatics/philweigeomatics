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