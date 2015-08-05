Installation
------------

	npm install
	grunt

Testing
-------

	npm test

Usage
-----

	var astar = require('lethexa-astar');

	var mesh = new astar.Net();
	mesh.addNode(1, {position: [0,0,0]});
	mesh.addNode(2, {position: [1,0,0]});
	mesh.addNode(3, {position: [2,0,0]});
	mesh.addNode(4, {position: [3,1,0]});
	mesh.addNode(5, {position: [4,1,0]});
	mesh.addNode(6, {position: [5,0,0]});
	mesh.addNode(7, {position: [3,-5,0]});
	mesh.addNode(8, {position: [4,-5,0]});
	mesh.connect(1, 2);
	mesh.connect(2, 3);
	mesh.connect(3, 4);
	mesh.connect(4, 5);
	mesh.connect(5, 6);

	mesh.connect(3, 7);
	mesh.connect(7, 8);
	mesh.connect(8, 6);


	var routing = new astar.AStarRouting(1, 6, mesh);
	var resultPath = routing.calculateRoute(); 
			
	console.log(resultPath);

Contributors
------------

* Tim Leerhoff <tleerhof@web.de>

