var model = require('./model');

// exports.getRules = function(callback){
// 	query = 'select * from Rules'
// 	model.execute(query, [], function(err, rows){
// 		callback(rows);
// 	});
// }

// Returns complete user metadata
exports.getUsersFromGroup = function(callback, gId){
	query = 'SELECT u.uId, u.Username, u.fbId, u.Latitude, u.Longitude, u.Accuracy, u.LastUpdate '
		+ 'FROM Users u '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON u.uId = ug.uId '
		+ 'WHERE ug.gId = ?;';
	model.execute(query, gId, function(err, rows){
			callback(err, rows);
	});
}

// Returns complete group metadata
exports.getGroup = function(callback, gId){
		query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'WHERE g.gId = ?';
	model.execute(query, gId, function(err, rows){
		callback(err, rows);
	});
}

// Returns collection complete group metadata
exports.getSubgroupsFromGroup = function(callback, gId){
	query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'WHERE g.pId = ?';
	model.execute(query, gId, function(err, rows){
		callback(err, rows);
	});
}

//Returns root groups for a user
exports.getRootGroups = function(callback, uId){
	query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON g.gId = ug.gId '
		+ 'WHERE ug.uId = ? AND ISNULL(g.pId);';
	model.execute(query, uId, function(err, rows){
		callback(err, rows);
	});
}

//Returns tiered groups for a user
//Inputs uId, gId of root
exports.getTieredGroups = function(callback, uId, gId){
	query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON g.gId = ug.gId '
		+ 'WHERE ug.uId = ? AND ISNULL(g.pId);';
	model.execute(query, uId, function(err, rows){
		callback(err, rows);
	});
}

/* This function returns JSON object that contains a tree of all the groups under group gId.
 *  If gId == null, this returns a JSON object of trees of all the groups. 
 *  If gId is invalid, returns an error. */
/* Callback format: callback(err, groupTree) */
exports.getGroupTree = function(callback, gId) {

}

/* This function checks the database to see if there already is a user associated with this
 * facebook ID. If so, return the user. Else return an error */
/* Callback format: callback(err, user); */
exports.getUserFromFbid = function(callback, fbId){
	query = 'SELECT * from Users WHERE fbId = ?';
	model.execute(query, fbId, function(err, rows){
		callback(err, rows);
	});
}

/* This function attempts to insert a user into the database.
 * Will fail if they ar already present */
/* Callback format: callback(err); */
exports.registerUser = function(callback, fbId, username){
	query = 'INSERT into Users (fbId, Username) '
		+ 'VALUES (?,?)';
	model.execute(query,[fbId, username], function(err, rows){
		callback(err);
	});
}

/* This function updates the lattitude and longitude coordinates of the user with user ID uId.
 * Will fail if the user id is not present
/* Callback format: callback(err); */
exports.setPosition = function(callback, uId, lat, lng, acc){
	query = 'UPDATE Users '
		+ 'SET Latitude = ?, Longitude = ?, Accuracy = ?, LastUpdate = NOW() '
		+ 'WHERE uId = ?';
	model.execute(query,[lat, lng, acc, uId], function(err, rows){
		callback(err);
	});
}

