/* creating the namespace */
var lib;
if( !lib ){
	lib = {};
}else if( !lib instanceof Object ){
	throw new Error("lib is already declared and its not an object");
}

lib.addEventListener = function( eventTarget, eventType, eventHandler ){
	if( eventTarget.addEventListener ){
		eventTarget.addEventListener( eventType, eventHandler, false );
	}else if( eventTarget.attachEvent ){
		eventType = "on"+eventType;
		eventTarget.attachEvent( eventType, eventHandler );
	}else{
		eventTarget["on"+eventType] = eventHandler;
	}
};