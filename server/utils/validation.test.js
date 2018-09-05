var expect = require( 'expect' );

const { isRealString } = require( './validation.js' );

describe( 'isRealString', () => {

	it( 'Should allow string', ( done ) => {

		var name = 'Test';

		var result = isRealString( name );

		expect( result ).toBeTruthy();

		done();
	});

	it( 'Should reject non-string', ( done ) => {

		var name = 100;

		var result = isRealString( name );

		expect( result ).toBeFalsy();

		done();
	});

	it( 'Should reject string with only spaces', ( done ) => {

		var name = '   ';

		var result = isRealString( name );

		expect( result ).toBeFalsy();

		done();
	});
});