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

jQuery( '#message-form' ).on( 'submit', function( event ){

	event.preventDefault();

	var messageEl = jQuery( '[name=message]' );

	socket.emit( 'createMessage', {
		from : 'User',
		text : messageEl.val()
	},
	function( data ){
		console.log( 'Got it ' + data.text );
	});
});

var locationButton = jQuery( '#location-button' );

locationButton.on( 'click', function( event ){

	if( ! navigator.geolocation ){

		alert( 'Geolocation not supported' );
		return;
	}

	navigator.geolocation.getCurrentPosition( function( position ){

		socket.emit( 'createLocationMessage', {
			latitude : position.coords.latitude,
			longitude : position.coords.longitude
		});
	},
	function(){
		alert( 'Unable to find location' );
	});

});