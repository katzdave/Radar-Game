
google.load('visualization', '1', {packages:['orgchart']});
google.setOnLoadCallback(drawChart);
var groupusers;
var subgroups;
var chart = undefined;

function listusers() {
    var gId = (!chart || chart.getSelection().length === 0) ?
    	this_gId : subgroups[chart.getSelection()[0].row].gId;
    $.post('/listgroupusers', {gId: gId}, function(data) {
	groupusers = data.result;
	var html = '';
	for (var i = 0; i < data.result.length; i++) {
	    html += '<li class="link" draggable="true" ondragstart="drag(event, ' + i + ')">';
	    html += data.result[i].Username;
	    html += '</li>';
	}
	$('#usersul').html(html);
    });
}

function drawChart() {
    $.post('/listsubgroups', {gId: this_gId}, function(res) {
        subgroups = res.result;
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Node');
        data.addColumn('string', 'Parent');
	var rows = [];
        for (var i = 0; i < res.result.length; i++) {
	    var html = '<li class="grou" ondrop="drop(event, ' + i + ')" ondragover="allowDrop(event)">';
	    html += '<div>' + res.result[i].Groupname + '</div>';
	    html += '<img src="' + res.result[i].ImageUrl + '" />';
	    html += '<div id="subgroupinfo' + i + '" class="subgroupinfo"></div>';
	    html += '</li>';
	    var gId = res.result[i].gId;
	    var pId = res.result[i].pId;
	    rows.push([{v: gId.toString(), f: html}, pId && pId.toString()]);
	}
	data.addRows(rows);
        chart = new google.visualization.OrgChart(document.getElementById('groups'));
        chart.draw(data, {allowHtml: true, nodeClass: 'treenode', selectedNodeClass: 'treenode_select'});
        google.visualization.events.addListener(chart, 'select', function(data) {
	  listusers();
        });
	updateGroupDetails();
    });
}

function updateGroupDetails() {
	for (var i = 0; i < subgroups.length; i++) {
	  function listgroupuserswrapper(index) {
	    $.post('/listgroupusers', {gId: subgroups[i].gId}, function(res) {
	      var html = res.result.length + ' members';
	      $('#subgroupinfo' + index).html(html);
	    });
	  };
	  listgroupuserswrapper(i);
	}
}

function addusertogroup(uId, gId) {
    $.post('/addusertogroup', {uId: uId, gId: gId}, function(res) {
	listusers();
	updateGroupDetails();
    });
}

function drag(event, userIndex) {
    event.dataTransfer.setData('user', groupusers[userIndex].uId);
}

function drop(event, groupIndex) {
    event.preventDefault();
    addusertogroup(event.dataTransfer.getData('user'), subgroups[groupIndex].gId);
}

function allowDrop(event) {
    event.preventDefault();
}

$(document).ready(function() {
  listusers();
});
