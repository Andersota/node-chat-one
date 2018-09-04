var expect = require( 'expect' );

var { generateMessage } = require( './message.js' );

describe( 'generateMessage', () => {

	it( 'Should generate message object', ( done ) => {

		var from = 'Test User';
		var text = 'The test message.';

		var message = generateMessage( from, text );

		expect( message.from ).toBe( from );
		expect( message.text ).toBe( text );
		expect( message.createdAt ).toBeTruthy();

		done();
	})
});