//js for first creation of event.

exports.createNewEvent = function(req, res){
	res.send(JSON.stringify(req.user));
  //first ask for a login
  res.render('facebook.html');
  

};
