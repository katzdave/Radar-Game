var model = require('./model');

/* Get functions */


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

/* This function returns JSON object that contains a tree of all the groups under group gId.
 *  If gId == null, this returns a JSON object of trees of all the groups. 
 *  If gId is invalid, returns an error. */
/* Callback format: callback(err, groupTree) */
exports.getGroupTree = function(callback, gId) {

}

/* This function checks the database to see if there already is a user associated with this
 * facebook ID. If so, return the user ID. If not, create this user as a new entry, generate
 * an User ID for this user, and return the new user ID. */
/* Callback format: callback(err, uId); */
exports.getUidFromFbid = function(callback, fbId){

}


/* Set functions */

/* This function updates the lattitude and longitude coordinates of the user with user ID uId. */
/* Callback format: callback(err); */
exports.setPosition = function(callback, uId, lat, lng){

}

