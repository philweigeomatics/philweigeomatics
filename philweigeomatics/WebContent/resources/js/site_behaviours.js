var hobbies = {
		
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
	
};