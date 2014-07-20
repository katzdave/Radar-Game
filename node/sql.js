var model = require('./model');

exports.getRules = function(callback){
	query = 'select * from Rules'
	model.execute(query, [], function(err, rows){
		callback(rows);
	});
}

// Returns complete user metadata
exports.getUsersFromGroup = function(callback, gId){
	query = 'SELECT u.uId, u.Username, u.Phone, u.Latitude, u.Longitude, u.Accuracy, u.LastUpdate '
		+ 'FROM Users u '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON u.uId = ug.uId '
		+ 'WHERE ug.gId = ?;';
	model.execute(query, gId, function(err, rows){
			callback(err, rows);
	});
}

// Returns complete group metadata
exports.getSubgroupsFromGroup = function(callback, gId){
	query = 'SELECT g.gId, g.pId, g.Groupname, g.Description, g.Password, g.isPublic '
		+ 'FROM Groups g '
		+ 'WHERE g.pId = ?';
	model.execute(query, gId, function(err, rows){
		callback(err, rows);
	});
}