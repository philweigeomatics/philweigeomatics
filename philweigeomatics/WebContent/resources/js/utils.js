var utils;
if( !utils ){
	utils = {};
}else if( !utils instanceof Object ){
	throw new Error("utils is already initialized and it is not an object");
}

utils.linkType = {
		wikipedia:"wikipedia",
		website:"website",
		google:"google"
};

utils.asciiTable = {
		html:{
			comma:"&#44;",
			colon:"&#58;",
			semicolon:"&#59;",
			quote_double:"&#34;",
			quote_single:"&#39;",
			number:"&#35;",
			dollar:"&#36;"
		}
};