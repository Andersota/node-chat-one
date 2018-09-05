const moment = require( 'moment' );

var generateMessage = ( from, text ) => {

	return {
		from : from,
		text : text,
		createdAt : moment().valueOf()
	};
};

var generateLocationMessage = ( from, latitude, longitude ) => {

	var url = 'https://www.google.com/maps?q=';

	return {
		from : from,
		text : url + latitude + ',' + longitude,
		createdAt : moment().valueOf()
	};
};

module.exports = {
	generateMessage : generateMessage,
	generateLocationMessage : generateLocationMessage
};