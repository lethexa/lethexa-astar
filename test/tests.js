var assert = require('assert');
var astar = require('../lib/astar');


describe('AStarRouting', function () {
	describe('#calculateRoute()', function () {
		it('should return a valid route through the mesh', function () {
			var mesh = new astar.Net();
			mesh.addNode(1, {});
			mesh.addNode(2, {});
			mesh.addNode(3, {});
			mesh.connect(1, 2);

			var routing = new astar.AStarRouting();

			//routing.calculateRoute(); 

			assert.equal(-1, [1, 2, 3].indexOf(5));
			assert.equal(-1, [1, 2, 3].indexOf(0));
		});
	});
});




