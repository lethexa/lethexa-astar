
/**
 * A mesh to pathfind on
 * @class Net
 * @constructor
 */
module.exports.Net = function() {
	var mesh = {};

	/**
 	 * Adds a node with the specified id to the net
 	 * @method addNode
 	 * @param id {Number} The id of the node
 	 * @param entry {object} The data to save in the node
 	 */
	this.addNode = function(id, entry) {
		mesh[id] = {
			entry: entry,
			gValue: 0,
			fValue: 0,
			neighbors: []
		};
	};

	/**
 	 * Creates connections between nodes in the net
 	 * @method connect
 	 * @param id1 {Number} the id of the first node
 	 * @param id2 {Number} the id of the second node
 	 */
	this.connect = function(id1, id2) {
		if(mesh[id1] === undefined)
			throw new Error('Unknown object1 with id:' + id1);
		if(mesh[id2] === undefined)
			throw new Error('Unknown object2 with id:' + id2);
		var node1 = mesh[id1];
		var node2 = mesh[id2];
		node1.neighbors = node1.neighbors || [];
		node2.neighbors = node2.neighbors || [];
		node1.neighbors.push(node2);
		node2.neighbors.push(node1);
	};
};


var PriorityQueue = function() {
	var openList = [];
	var self = this;

	this.getMinPriorityNode = function() {
		var minFNode;
		openList.forEach(function(node) {
			if(minFNode === undefined) {
				minFNode = node;
			}
			else if(getFValue(node) < getFValue(minFNode)) {
				minFNode = node;	
			}
		});
		return minFNode;
	};

	this.putNode = function(node) {
		self.removeNode(node);
		openList.push(node);
        };

	this.removeNode = function(node) {
		var index = openList.indexOf(node);
		if(index >= 0) {
			openList.splice(index, 1);
		}
	};

	this.contains = function(node) {
		return openList.indexOf(node) >= 0;
	};

	this.isEmpty = function() {
		return openList.length === 0;
	};
};


/**
 * The A* pathfinding algorithm 
 * @class AStarRouting
 * @constructor
 * @param fromNode {object} The startnode
 * @param toNode {object} The endnote
 */
module.exports.AStarRouting = function( fromNode, toNode ) {
	var openList = new PriorityQueue();
	var closedList = new PriorityQueue();

	var getNeighborsOf = function(node) {
	};

	var createPathFromTargetToStartNode = function(node) {
	};

	var setPredessessorOfNode = function(node, pred) {
	};

	var getGValueOf = function(node) {
	};

	var setGValueOf = function(node, gValue) {
	};

	var getFValueOf = function(node) {
	};

	var setFValueOf = function(node, fValue) {
	};

	var getCostsFromTo = function(node1, node2) {
	};

	var getHeuristicsFromTo = function(node1, node2) {
	};

	var expandNode = function(currentNode) {
        	getNeighborsOf(currentNode).forEach( function(successor) {
            		if( closedList.contains(successor) ) {
                		return;
			}

            		var tentative_g = getGValueOf(currentNode) + getCostsFromTo(currentNode, successor);
            		if( openList.contains(successor) && tentative_g >= getGValueOg(successor) ) {
                		return;
			}

			setPredessessorOfNode(successor, currentNode);
			setGValueOf(successor, tentative_g);

	           	var f = tentative_g + getHeuristicsFromTo(successor, toNode);
                	openList.removeNode(successor);

            		setFValueOn(successor, f);
            		openList.putNode(successor);
        	});
	};

	/**
 	 * Calculates the route from node to node
 	 * @method calculateRoute
 	 * @return {array} The list of ids of the route
 	 */
	this.calculateRoute = function() {
		var currentNode;
        	openList.putNode(fromNode);
        	do {
            		currentNode = openList.getMinPriorityNode();
            		if( currentNode === toNode )
                		return createPathFromTargetToStartNode(toNode);

            		closedList.putNode(currentNode);
            		expandNode(currentNode);
        	} while( !openList.isEmpty() );
        	return undefined;		
	};
};


