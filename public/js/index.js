var socket = io();

socket.on( 'connect', function(){
	console.log( 'Connected to server' );

	socket.emit( 'createMessage', {
		from  : 'rachel@email.com',
		text : 'New message'
	});
});

socket.on( 'newMessage', function( message ){
	console.log( message );
});

socket.on( 'disconnect', function(){
	console.log( 'Disconnected from server' );
});