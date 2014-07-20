var model = require('./model');

// exports.getRules = function(callback){
// 	query = 'select * from Rules'
// 	model.execute(query, [], function(err, rows){
// 		callback(rows);
// 	});
// }

function getUsersFromGroup(callback, gId) {
	query = 'SELECT u.uId, u.Username, u.fbId, u.Latitude, u.Longitude, u.Accuracy, u.LastUpdate '
		+ 'FROM Users u '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON u.uId = ug.uId '
		+ 'WHERE ug.gId = ?;';
	model.execute(query, gId, function(err, rows){
			callback(err, rows);
	});
}
exports.getUsersFromGroup = getUsersFromGroup;

// Returns complete group metadata
function getGroup(callback, gId){
		query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'WHERE g.gId = ?';
	model.execute(query, [gId], function(err, rows){
		callback(err, rows);
	});
}
exports.getGroup = getGroup;

// Returns collection complete group metadata
function getSubgroupsFromGroup(callback, gId){
	query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'WHERE g.pId = ?';
	model.execute(query, gId, function(err, rows){
		callback(err, rows);
	});
}
exports.getSubgroupsFromGroup = getSubgroupsFromGroup;

/* This function returns JSON object that contains a tree of all the groups under group gId.
 *  If gId == null, this returns a JSON object of trees of all the groups. 
 *  If gId is invalid, returns an error. */
/* Callback format: callback(err, groupTree) */
function getGroupTreeHelper(callback, current, ans) {
	if (current.length === 0) {
		callback(false, ans);
		return;
	}
	var gid = current[current.length - 1];
	current.length = current.length - 1;
	getSubgroupsFromGroup(function(err, rows) {
		for (var i = 0; i < rows.length; i++) {
			current.push(rows[i].gId);
			ans.push(rows[i]);
		}
		getGroupTreeHelper(callback, current, ans);
	}, gid);
}
function getGroupTree(callback, gId) {
	getGroup(function(err, group) {
		getGroupTreeHelper(callback, [gId], group);
	}, gId);
}
exports.getGroupTree = getGroupTree;

//Returns root groups for a user
exports.getRootGroups = function(callback, uId){
	query = 'SELECT rId '
		+ 'FROM Groups g '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON g.gId = ug.gId '
		+ 'WHERE ug.uId = ?;';


	model.execute(query, uId, function(err, rows){
		if (err)
		{
			callback(err, rows);
	    }
	    else
	    {
	    	var result_table = {};
            expandRootTable(callback, result_table, err, rows, 0);
	    }
	});
}
function expandRootTable(final_callback, table, errr, overall_rows, i) {
      if ( i == overall_rows.length)
      {
     	 final_callback(errr, table);
         return;
      }

      console.log(JSON.stringify(overall_rows));
      getGroup(function(err, rows){
      	      console.log(JSON.stringify(rows));
      	  table[i] = rows[0];
          expandRootTable(final_callback, table, err, overall_rows, i + 1);
      }, overall_rows[i].rId);

}

// returns all memberships of the user
exports.getSubgroupsFromUser = function(callback, uId, gId){
	query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON g.gId = ug.gId '
		+ 'WHERE ug.uId = ? AND g.rId = ?;';
	model.execute(query,[uId, gId], function(err, rows){
        if (err || rows.length == 0)
        {
			callback(err, rows);
		}
		else
		{
			expandSubgroupTable(callback, rows, err, rows[0].pId)
		}
	});
}

function expandSubgroupTable(final_callback, table, errr, gId) {
	 if (gId == null) {
         final_callback(errr, table.reverse());
         return;
	 }
      console.log(JSON.stringify(table));
      getGroup(function(err, rows){
      	if (err)
      	{
      		console.log(JSON.stringify(err));
      		final_callback(err, table.reverse());
      	}
      	else
      	{
      	      console.log(JSON.stringify(rows));
      	  table.push( rows[0]);
          expandSubgroupTable(final_callback, table, err, rows[0].pId);
         }
      }, gId);

}

//Returns all groups for a user
//Inputs uId
exports.getAllGroups = function(callback, uId){
	query = 'SELECT * '
		+ 'FROM Groups g '
		+ 'INNER JOIN User_In_Group ug '
		+ 'ON g.gId = ug.gId '
		+ 'WHERE ug.uId = ?';
	model.execute(query, uId, function(err, rows){
		callback(err, rows);
	});
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

exports.getGroupsFromUid = function(uId, callback){
    query = 'SELECT * from User_In_Group WHERE uId = ?';
    model.execute(query, uId, function(err, rows){
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

exports.addUserToGroup = function(callback, uId, gId, isAdmin){
	function removeUserFromRoot(callback, uId, rId){
		query = 'DELETE ug FROM User_In_Group ug '
			+ 'INNER JOIN Groups g '
			+ 'ON g.gId = ug.gId '
			+ 'WHERE ug.uId = ? AND g.rId = ?';
		model.execute(query,[uId, rId], function(err, rows){
			query = 'INSERT into User_In_Group (gId, uId, isAdmin) '
				+ 'VALUES (?,?,?)';
			model.execute(query,[gId, uId, isAdmin], function(err, rows){
				callback(err);
			});
		});
	}

	function callRemoveUserHelper(err, group) {
		if(err == null){
			removeUserFromRoot(callback, uId, group[0].rId);
		}else{
			callback(err);
		}
	}
	getGroup(callRemoveUserHelper, gId);
}

// Returns complete user metadata
function getUsersInSubgroups(callback, gId) {
	getGroupTree(function(err, groups) {
		var count = groups.length;
		var allUsers = [];
		for (var i = 0; i < groups.length; i++) {
			getUsersFromGroup(function(err, users) {
				allUsers = allUsers.concat(users);
				if (--count === 0) {
					callback(false, allUsers);
				}
			}, groups[i].gId);
		}
	}, gId);
}

exports.getColoredUsersInSubgroups = function(callback, gId) {
	getSubgroupsFromGroup(function(err, groups) {
		var obj = [];
		var count = groups.length;
		for (var i = 0; i < groups.length; i++) {
			getUsersInSubgroups(function(err, users) {
				obj.push(users);
				if (--count === 0) {
					callback(false, obj);
				}
			}, groups[i].gId);
		}
	}, gId);
}

