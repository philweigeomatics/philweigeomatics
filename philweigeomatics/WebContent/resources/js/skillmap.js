/*
 * 1.programming Languages contain: Java, JavaScript, C++, C, HTML & CSS, XML & JSON, SQL, MatLab, Coldfusion
 * 2.java frameworks and API: Servlet, JSP, JPA, JDBC, Hibernate, Spring, Android, iText,
 * 3.Javascript Framework API: Dojo, JQuery, Google Map API, Google Earth API, OpenLayers, DWR
 * 4. 
 */

var skillmap;

if( !skillmap ){
	skillmap = {};
}else{
	throw new Error("skillmap is already initialized and it is not an object.");
}

// Below is how the skill map is distributed //
// ,and this is how the object properties are//
// named.
//*******************************************//
//     ---------------------------------     //
//     |      1        2       3       |     //
//     |      4        5       6       |     //
//     |      7        8       9       |     //
//     ---------------------------------     //
// 										     //
//*******************************************//


skillmap.one = "0,0,128,128";
skillmap.two = "136,0,264,128";
skillmap.three = "272,0,400,128";
skillmap.four = "0,136,136,264";
skillmap.five = "136,136,264,264";
skillmap.six = "272,136,400,264";
skillmap.seven = "0,272,128,400";
skillmap.eight ="136,272,264,400";
skillmap.nine = "272,272,400,400";

/**
 * The full coordinates distribution of the skillmap.
 */
skillmap.coords = [ skillmap.one, skillmap.two, skillmap.three, skillmap.four, skillmap.five, skillmap.six, skillmap.seven, skillmap.eight, skillmap.nine ];

skillmap.programmingLanguages={
		size:9,
		desc:"<p>From school to work, from personal projects to work projects, I have come across these programming and scripting languages. Recently, I have been mainly developing mobile and web applications. I am also looking to learn Scala as I am liking the syntax and its funcitonal concept.</p>",
		
		/**
		 * titleArray is based on the map layout
		 */
		titleArray: ["Java", "C++", "C", "JavaScript","SQL", "XML/JSON","ColdFusion","Html/CSS","MatLAB"],
		area:[],
		imgSrc: "resources/img/IconSet_ProgrammingLanguages.png"
	};
skillmap.javaFrameworksAPI = {
		size: 8,
		desc:"<p>I have used these Java Frameworks for mobile and web application development. They all provide functions in different aspects very well.</p>",
		titleArray:["Java Servlets","Java Server Pages","JDBC","Java Persistence API", "Android","Hibernate","Spring Framework","iText"],
		area:[],
		imgSrc:"resources/img/IconSet_FrameworksAndAPI.png"
};

skillmap.javascriptFrameworksAPI = {
		size: 7,
		desc:"<p>As RIAs (Rich Internet Applications) and Mobile Web Applications are becoming more and more widly adopted, more cutting-edge javascript libraries are becoming available; some are open source and some are commercial. I like open source libraries as they provide additional feasibility and still remain commercial level quality. <a href=\"http://jquery.com\">jQuery</a> is known for its powerful selectors and event handling modules</a> and <a href=\"http://dojotoolkits.org\">Dojo</a> provides enterprise level UI widgets. The choice of each library is really project-dependent.</p>",
		titleArray:["jQuery","Dojo Toolkits","Direct Web Remoting","Google Map API","Google Earth API","OpenLayers","MapGuide JavaScript API"],
		area:[],
		imgSrc:"resources/img/IconSet_JavaScriptLibraries.png"
};

( skillmap.makeSkillmapArea = function(){
	var i = 0;
	for( title in skillmap.programmingLanguages.titleArray ){
		var tr = skillmap.programmingLanguages.titleArray;
		skillmap.programmingLanguages.area.push( "<area shape=\"rect\" coords=\""+skillmap.coords[i]+"\" alt=\""+tr[title]+"\" title=\""+tr[title]+"\"/>");
		i++;
	}
	
	i = 0;
	for( title in skillmap.javaFrameworksAPI.titleArray ){
		var tr = skillmap.javaFrameworksAPI.titleArray;
		skillmap.javaFrameworksAPI.area.push( "<area shape=\"rect\" coords=\""+skillmap.coords[i]+"\" alt=\""+tr[title]+"\" title=\""+tr[title]+"\"/>");
		i++;
	}
	
	i = 0;
	for( title in skillmap.javascriptFrameworksAPI.titleArray ){
		var tr = skillmap.javascriptFrameworksAPI.titleArray;
		skillmap.javascriptFrameworksAPI.area.push( "<area shape=\"rect\" coords=\""+skillmap.coords[i]+"\" alt=\""+tr[title]+"\" title=\""+tr[title]+"\"/>");
		i++;
	}
	
	skillmap.objArray = [ skillmap.programmingLanguages, skillmap.javaFrameworksAPI, skillmap.javascriptFrameworksAPI ];
	console.log("makeSkillmapArea is called");
} )();
