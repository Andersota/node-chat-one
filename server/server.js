const path = require( 'path' );
const http = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

const publicPath = path.join( __dirname, '../public' );
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer( app );
var io = socketIO( server );

app.use( express.static( publicPath ) );

io.on( 'connection', ( socket ) => {

	console.log( 'New user Connected' );

	socket.emit( 'newMessage', {
		from : 'admin',
		text : 'welcome to chat',
		createdAt : new Date().getTime()
	});

	socket.broadcast.emit( 'newMessage', {
		from : 'admin',
		text : 'new user joined',
		createdAt : new Date().getTime()
	});

	socket.on( 'createMessage', ( message ) => {
		console.log( message );

		io.emit( 'newMessage', {
			from : message.from,
			text : message.text,
			createdAt : new Date().getTime()
		});

		// socket.broadcast.emit( 'newMessage', {
		// 	from : message.from,
		// 	text : message.text,
		// 	createdAt : new Date().getTime()
		// });
	});

	socket.on( 'disconnect', () => {
		console.log( 'User Disconnected' );
	});
});

server.listen( port, () => {
	console.log( 'Started and listening on port ' + port );
});