var assert = require('assert');
var astar = require('../lib/astar');


describe('AStarRouting', function () {
	describe('#calculateRoute()', function () {
		it('should return a valid route through the mesh', function () {
			var mesh = new astar.Net();
			mesh.addNode(1, {position: [0,0,0]});
			mesh.addNode(2, {position: [1,0,0]});
			mesh.addNode(3, {position: [2,0,0]});
			mesh.addNode(4, {position: [3,0,0]});
			mesh.addNode(5, {position: [3,0,0]});
			mesh.connect(1, 2);
			mesh.connect(2, 3);
			mesh.connect(3, 4);
			mesh.connect(3, 5);

			var routing = new astar.AStarRouting(1, 5, mesh);
			var result = routing.calculateRoute(); 
			
			assert.deepEqual(result, [5, 3, 2, 1]);
		});
	});
});




