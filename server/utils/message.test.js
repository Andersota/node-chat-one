var expect = require( 'expect' );

var { generateMessage, generateLocationMessage } = require( './message.js' );

describe( 'generateMessage', () => {

	it( 'Should generate message object', ( done ) => {

		var from = 'Test User';
		var text = 'The test message.';

		var message = generateMessage( from, text );

		expect( message.from ).toBe( from );
		expect( message.text ).toBe( text );
		expect( message.createdAt ).toBeTruthy();

		done();
	});
});

describe( 'generateLocationMessage', () => {

	it( 'Should generate location message object', ( done ) => {

		var from = 'Test User';
		var latitude = 10;
		var longitude = 10;
		var url = 'https://www.google.com/maps?q=';

		var message = generateLocationMessage( from, latitude, longitude );

		expect( message.from ).toBe( from );
		expect( message.text ).toBe( url + latitude + ',' + longitude );
		expect( message.createdAt ).toBeTruthy();

		done();
	});
});