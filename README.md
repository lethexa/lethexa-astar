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
	mesh.addNode(1, {});
	mesh.addNode(2, {});
	mesh.addNode(3, {});
	mesh.connect(1, 2);

	var routing = new astar.AStarRouting();
	var path = routing.calculateRoute();

