var model = require('./model');

exports.getRules = function(callback){
	query = 'select * from Rules'
	model.execute(query, [], function(err, rows){
		callback(rows);
	});
}

exports.getUsersFromGroup = function(callback, gId){
	query = 'SELECT u.uId, u.Username, u.Phone, u.Latitude, u.Longitude, u.Accuracy, u.LastUpdate '
		+ 'FROM Users u '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON u.uId = ug.uId '
		+ 'WHERE ug.gId = 1;';
	model.execute(query, [], function(err, rows){
		if (err == null){
			callback(rows);
		}
	});
}