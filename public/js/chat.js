var messagesEl = jQuery( '#messages' );

var scrollToBottom = function(){

	var newMessage = messagesEl.children( 'li:last-child' );
	var newMessageHeight = newMessage.innerHeight();
	var prevMessageHeight = newMessage.prev().innerHeight();

	var clientHeight = messagesEl.prop( 'clientHeight' );
	var scrollTop = messagesEl.prop( 'scrollTop' );
	var scrollHeight = messagesEl.prop( 'scrollHeight' );

	if( clientHeight + scrollTop + newMessageHeight + prevMessageHeight >= scrollHeight ){
		messagesEl.scrollTop( scrollHeight );
	}
};

var socket = io();

socket.on( 'connect', function(){
	console.log( 'Connected to server' );

	var params = jQuery.deparam( window.location.search );

	socket.emit( 'join', params, function( err ){

		if( err ){
			alert( err );
			window.location.href = '/';
		} else {

		}
	});
});

socket.on( 'disconnect', function(){
	console.log( 'Disconnected from server' );
});

socket.on( 'updateUserList', function( users ){

	var ol = jQuery( '<ol></ol>' );

	users.forEach( function( user ){
		ol.append( jQuery( '<li>' + user + '</li>' ) );
	});

	jQuery( '#users' ).html( ol );
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

	messagesEl.append( html );
	scrollToBottom();
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

	messagesEl.append( html );
	scrollToBottom();
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