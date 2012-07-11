var en_ca;

if( !en_ca ){
	en_ca = {};
}else if( en_ca instanceof Object ){
	throw new Error( "en_ca is initialized but it is not an object");
}

en_ca.myhobbies = {
		motorcycling: "I have always",
		reading:" I love reading",
		watching_movies:"Who doesn't like watching movies?"
};

en_ca.myworks = {
		
};