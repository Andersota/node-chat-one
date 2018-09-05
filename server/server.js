const path = require( 'path' );
const http = require( 'http' );
const express = require( 'express' );
const socketIO = require( 'socket.io' );

const { generateMessage, generateLocationMessage } = require( './utils/message.js' );
const { isRealString } = require( './utils/validation.js' );

const publicPath = path.join( __dirname, '../public' );
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer( app );
var io = socketIO( server );

app.use( express.static( publicPath ) );

io.on( 'connection', ( socket ) => {

	console.log( 'New user Connected' );

	socket.on( 'join', ( params, callback ) => {

		if( ! isRealString( params.name ) || ! isRealString( params.room ) ){

			callback( 'Name and Room are required' );
		}

		socket.join( params.room );

		socket.emit( 'newMessage', generateMessage( 'admin', 'welcome to chat' ) );

		socket.broadcast.to( params.room ).emit( 'newMessage', generateMessage( 'admin', params.name + ' joined' ) );

		callback();
	});

	socket.on( 'createMessage', ( message, callback ) => {
		console.log( message );

		io.emit( 'newMessage', generateMessage( message.from, message.text ) );

		callback( {
			text : 'Worked'
		});
	});

	socket.on( 'createLocationMessage', ( coords ) => {

		io.emit( 'newLocationMessage', generateLocationMessage( 'admin', coords.latitude, coords.longitude ) );
	});

	socket.on( 'disconnect', () => {
		console.log( 'User Disconnected' );
	});
});

server.listen( port, () => {
	console.log( 'Started and listening on port ' + port );
});