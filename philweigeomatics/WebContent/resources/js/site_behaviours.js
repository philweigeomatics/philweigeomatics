var hobbies = {
		
};

var myskills = {
		currentIndex: 0
};



var siteInit = function(){
	
	// select only after loading, or jquery will find nothing.
	hobbies.thumbnail1_jq = $("#thumbnail1");
	hobbies.thumbnail2_jq = $("#thumbnail2");
	hobbies.thumbnail3_jq = $("#thumbnail3");
	hobbies.pix_jq = $("#myhobbies_pix");
	hobbies.bikepix_relPath = "resources/img/gsxr_w_helmet_small_600by384.jpg";
	hobbies.bookspix_relPath = "resources/img/books600by384.jpg";
	hobbies.moviespix_relPath = "resources/img/movies_600by384.jpg";
	hobbies.textArea_jq = $("#myhobbies_text_wrapper div");
	
	
	
	hobbies.thumbnail1_jq.click( function(){
		hobbies.pix_jq.css("background","url(\""+ hobbies.bikepix_relPath+"\") no-repeat scroll 0 center transparent");
		hobbies.textArea_jq.html( en_ca.myhobbies.motorcycling );
	});
	
	hobbies.thumbnail2_jq.click( function(){
		hobbies.pix_jq.css("background","url(\""+ hobbies.bookspix_relPath+"\") no-repeat scroll 0 center transparent");
		hobbies.textArea_jq.html( en_ca.myhobbies.reading );
	});
	
	hobbies.thumbnail3_jq.click( function(){
		hobbies.pix_jq.css("background","url(\""+ hobbies.moviespix_relPath+"\") no-repeat scroll 0 center transparent");
		hobbies.textArea_jq.html( en_ca.myhobbies.watching_movies);
	});
	
	// ************  My skills  ************** //
	myskills.textArea_jq = $("#myskills_text_wrapper div");
	myskills.prevButton = $("#myskills_switcher a.leftfloat");
	myskills.nextButton = $("#myskills_switcher a.rightfloat");
	myskills.iconmap = $("#myskills_iconmap_wrapper map");
	myskills.iconimg = $("#myskills_iconmap_wrapper img");
	
	function setMarginTopForSkillTextArea(){
		// get the height of the text area and change the margin-top to half of it.
		var height = myskills.textArea_jq.height()/2;
		console.log("height is "+height);
		myskills.textArea_jq.css("margin-top","-"+height+"px");
	}
	
	// Load text for programming languages first.
	if( skillmap && skillmap.programmingLanguages && skillmap.programmingLanguages.desc ){
		myskills.textArea_jq.html( skillmap.programmingLanguages.desc );
		
		setMarginTopForSkillTextArea();
	}
	
	// assigning events
	if( skillmap.objArray && skillmap.objArray instanceof Array && skillmap.objArray.length > 0 ){
		
		myskills.nextButton.click( function(){		
			if( myskills.currentIndex + 1 < skillmap.objArray.length ){
				var o = skillmap.objArray[ ++myskills.currentIndex ];
			}else{
				var o = skillmap.objArray[ ( myskills.currentIndex = 0) ];
			}	
			myskills.textArea_jq.html( o.desc );
			if( o.area && o.area instanceof Array ){
				var str = "";
				for( a in o.area ){
					if( typeof o.area[a] === "string" )
						str += o.area[a];
				}
				myskills.iconmap.html( str );
			}
			myskills.iconimg.attr("src", o.imgSrc );
			setMarginTopForSkillTextArea();
		});
		
		myskills.prevButton.click( function(){
			if( myskills.currentIndex - 1 >=  0 ){
				var o = skillmap.objArray[ --myskills.currentIndex];
			}else{
				var o = skillmap.objArray[( myskills.currentIndex = skillmap.objArray.length - 1)];
			}
			myskills.textArea_jq.html(o.desc );
			if( o.area && o.area instanceof Array ){
				var str = "";
				for( a in o.area ){
					if( typeof o.area[a] === "string" )
						str += o.area[a];
				}
				
				myskills.iconmap.html( str );
			}
			myskills.iconimg.attr("src", o.imgSrc );
			setMarginTopForSkillTextArea();
		});
	}
	
	
};