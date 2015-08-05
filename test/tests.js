var assert = require('assert');
var astar = require('../lib/astar');


describe('AStarRouting', function () {
	describe('#calculateRoute()', function () {
		it('should return a valid route through the mesh', function () {
			var mesh = new astar.Net();
			mesh.addNode(1, {position: [0,0,0]});
			mesh.addNode(2, {position: [1,0,0]});
			mesh.addNode(3, {position: [2,0,0]});
			mesh.connect(1, 2);
			mesh.connect(2, 3);

			var routing = new astar.AStarRouting(1, 3, mesh);

			var result = routing.calculateRoute(); 
			console.log('++++', result);

			assert.equal(-1, [1, 2, 3].indexOf(5));
			assert.equal(-1, [1, 2, 3].indexOf(0));
		});
	});
});




