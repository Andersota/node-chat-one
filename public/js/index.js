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

jQuery( '#message-form' ).on( 'submit', function( event ){

	event.preventDefault();

	var messageEl = jQuery( '[name=message]' );

	socket.emit( 'createMessage', {
		from : 'User',
		text : messageEl.val()
	}, function( data ){
		console.log( 'Got it ' + data.text );
	});
});