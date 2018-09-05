var socket = io();

socket.on( 'connect', function(){
	console.log( 'Connected to server' );
});

socket.on( 'disconnect', function(){
	console.log( 'Disconnected from server' );
});

socket.on( 'newMessage', function( message ){
	console.log( message );

	var li = jQuery( '<li></li>' );
	li.text( message.from + ': ' + message.text );

	jQuery( '#messages' ).append( li );
});

socket.on( 'newLocationMessage', function( message ){

	console.log( message );

	var li = jQuery( '<li></li>' );
	var a = jQuery( '<a target="_blank">My Current Location</a>' );

	li.text( message.from + ': ' );
	a.attr( 'href', message.text );
	li.append( a );

	jQuery( '#messages' ).append( li );
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