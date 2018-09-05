var socket = io();

socket.on( 'connect', function(){
	console.log( 'Connected to server' );
});

socket.on( 'disconnect', function(){
	console.log( 'Disconnected from server' );
});

socket.on( 'newMessage', function( message ){
	console.log( message );

	var formattedTime = moment( message.createdAt ).format( 'h:mm a' );

	var template = jQuery( '#message-template' ).html();

	var html = Mustache.render( template, {
		from : message.from,
		text : message.text,
		createdAt : formattedTime
	});

	jQuery( '#messages' ).append( html );
});

socket.on( 'newLocationMessage', function( message ){

	console.log( message );

	var formattedTime = moment( message.createdAt ).format( 'h:mm a' );

	var template = jQuery( '#location-message-template' ).html();
	
	var html = Mustache.render( template, {
		from : message.from,
		text : message.text,
		createdAt : formattedTime
	});

	jQuery( '#messages' ).append( html );
});


var messageForm = jQuery( '#message-form' );

messageForm.on( 'submit', function( event ){

	event.preventDefault();

	var messageEl = jQuery( '[name=message]' );

	socket.emit( 'createMessage', {
		from : 'User',
		text : messageEl.val()
	},
	function( data ){
		messageEl.val( '' );
	});
});



var locationButton = jQuery( '#location-button' );

locationButton.on( 'click', function( event ){

	if( ! navigator.geolocation ){

		alert( 'Geolocation not supported' );
		return;
	}

	locationButton.attr( 'disabled', 'disabled' ).text( 'Sending Location...' );

	navigator.geolocation.getCurrentPosition( function( position ){

		locationButton.removeAttr( 'disabled' ).text( 'Send Location' );

		socket.emit( 'createLocationMessage', {
			latitude : position.coords.latitude,
			longitude : position.coords.longitude
		});
	},
	function(){
		alert( 'Unable to find location' );
		locationButton.removeAttr( 'disabled' ).text( 'Send Location' )
	});
});