var expect = require( 'expect' );

const { Users } = require( './users.js' );

var users;

beforeEach( ()=> {

	users = new Users();

	users.users = [ {
		id : '1',
		name : 'user1',
		room : 'room1'
	},
	{
		id : '2',
		name : 'user2',
		room : 'room2'
	},
	{
		id : '3',
		name : 'user3',
		room : 'room1'
	}];
});

describe( 'Users', () => {

	it( 'Should add a user', ( done ) => {

		var users = new Users();

		var user = {
			id : '123', 
			name : 'testName', 
			room : 'testRoom'
		};

		var newUser = users.addUser( user.id, user.name, user.room );

		expect( users.users.length ).toBe( 1 );

		done();
	});

	it( 'Should remove user with id', ( done ) => {

		var id = '1';

		var user = users.removeUser( id );

		expect( user.id ).toBe( id );
		expect( users.users.length ).toBe( 2 );

		done();
	});

	it( 'Should not remove user with id', ( done ) => {

		var id = '10';

		var user = users.removeUser( id );

		expect( user ).toBeFalsy();
		expect( users.users.length ).toBe( 3 )

		done();
	});

	it( 'Should find user with id', ( done ) => {

		var id = '1';

		var user = users.getUser( id );

		expect( user ).toBe( users.users[0] );

		done();
	});

	it( 'Should not find user with id', ( done ) => {

		var id = '10';

		var user = users.getUser( id );

		expect( user ).toBeFalsy();

		done();
	});

	it( 'Should return users names for room', ( done ) => {

		var names = users.getUserList( 'room1' );

		expect( names ).toEqual( [ 'user1', 'user3' ] );

		done();
	});
});