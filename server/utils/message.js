var generateMessage = ( from, text ) => {

	return {
		from : from,
		text : text,
		createdAt : new Date().getTime()
	};
};

var generateLocationMessage = ( from, latitude, longitude ) => {

	var url = 'https://www.google.com/maps?q=';

	return {
		from : from,
		text : url + latitude + ',' + longitude,
		createdAt : new Date().getTime()
	};
};

module.exports = {
	generateMessage : generateMessage,
	generateLocationMessage : generateLocationMessage
};