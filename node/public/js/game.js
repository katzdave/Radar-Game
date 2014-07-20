
var groupusers;
function listusers() {
    $.post('/listgroupusers', function(data) {
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

var subgroups;
function listsubgroups() {
    $.post('/listsubgroups', function(data) {
	subgroups = data.result;
	var html = '';
	for (var i = 0; i < data.result.length; i++) {
	    html += '<li class="grou" ondrop="drop(event, ' + i + ')" ondragover="allowDrop(event)">';
	    html += data.result[i].Name;
	    html += '<img src="' + data.result[i].imageURL + '" />';
	    html += '</li>';
	}
	$('#groupslist').html(html);
    });
}

function drag(event, userIndex) {
    event.dataTransfer.setData('user', groupusers[userIndex]);
}

function drop(event, groupIndex) {
    event.preventDefault();
}

function allowDrop(event) {
    event.preventDefault();
}

google.load('visualization', '1', {packages:['orgchart']});  
google.setOnLoadCallback(drawChart);  
function drawChart() {  
  data = new google.visualization.DataTable();  
  data.addColumn('string', 'Node');  
  data.addColumn('string', 'Parent');  
  node0 = '<li class="grou" ondrop="drop(event)" ondragover="allowDrop(event)">' +
 	 'HvZ' +
 	 '<img src="http://humansvszombies.org/images/logo.jpg" />' +
          '</li>';
  node1 = '<li class="grou" ondrop="drop(event)" ondragover="allowDrop(event)">' +
 	 'Humans' +
 	 '<img src="http://fc05.deviantart.net/fs44/f/2009/115/b/9/My_stick_person_by_xIIStrawberriesIIx.png" />' +
 	 '</li>';
  node2 = '<li class="grou" ondrop="drop(event)" ondragover="allowDrop(event)">' +
          'Zombies' +
 	 '<img src="http://foxfiredev.net/wp-content/uploads/2014/03/Zombie.jpg" />' +
 	 '</li>';
 
  data.addRows([  
    [node0, ''],
    [node1, node0],
    [node2, node0]
  ]);  
  chart = new google.visualization.OrgChart(document.getElementById('groups'));  
  chart.draw(data, {allowHtml: true, nodeClass: 'treenode', selectedNodeClass: 'treenode_select'});  
  google.visualization.events.addListener(chart, 'select', function(data) {
    // code
  });
}  

$(document).ready(function() {
  drawChart();
});
