
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
			id: id,
			entry: entry,
			gValue: 0,
			fValue: 0,
			predId: undefined,
			neighbors: []
		};
	};

	var getNodeById = function(nodeId) {
		return mesh[nodeId];
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
		node1.neighbors.push(id2);
		node2.neighbors.push(id1);
	};
	
	this.getNeighborsOf = function(nodeId) {
		var node = getNodeById(nodeId);
		return node.neighbors;
	};
	
	this.createPathFromTargetToStartNode = function(nodeId) {
		console.log(nodeId);
		while(node) {
			var node = getNodeById(nodeId);
			console.log(node);
			node = node.predId;
		}
	};

	this.setPredessessorOfNode = function(nodeId, predId) {
		var node = getNodeById(nodeId);
		var pred = getNodeById(predId);
		node.predId = predId;
	};
	
	this.getGValueOf = function(nodeId) {
		var node = getNodeById(nodeId);
		return node.gValue;
	};

	this.setGValueOf = function(nodeId, gValue) {
		var node = getNodeById(nodeId);
		node.gValue = gValue;
	};

	this.getFValueOf = function(nodeId) {
		var node = getNodeById(nodeId);
		return node.fValue;
 	};

	this.setFValueOf = function(nodeId, fValue) {
		var node = getNodeById(nodeId);
		node.fValue = fValue;
	};

	this.getCostsFromTo = function(nodeId1, nodeId2) {
		return 1.0;
	};

	this.getHeuristicsFromTo = function(nodeId1, nodeId2) {
		return 1.0;
	};
};




/**
 * The A* pathfinding algorithm 
 * @class AStarRouting
 * @constructor
 * @param fromNode {object} The startnode
 * @param toNode {object} The endnote
 */
module.exports.AStarRouting = function( fromNode, toNode, options ) {
	var PriorityQueue = function() {
		var openList = [];
		var self = this;

		this.getMinPriorityNode = function() {
			var minFNode;
			openList.forEach(function(node) {
				if(minFNode === undefined) {
					minFNode = node;
				}
				else if(options.getFValueOf(node) < options.getFValueOf(minFNode)) {
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





	var openList = new PriorityQueue();
	var closedList = new PriorityQueue();

	options = options || {}; 
	options.getNeighborsOf = options.getNeighborsOf || function(nodeId) {};
	options.createPathFromTargetToStartNode = function(nodeId) {};
	options.setPredessessorOfNode =	options.setPredessessorOfNode || function(nodeId, predId) {};
	options.getGValueOf = options.getGValueOf || function(nodeId) {};
	options.setGValueOf = options.setGValueOf || function(nodeId, gValue) {};
	options.getFValueOf = options.getFValueOf || function(nodeId) {};
	options.setFValueOf = options.setFValueOf || function(nodeId, fValue) {};
	options.getCostsFromTo = options.getCostFromTo || function(nodeId1, nodeId2) {};
	options.getHeuristicsFromTo = options.getHeuristicsFromTo || function(node1, node2) {};

	var expandNode = function(currentNode) {
        	options.getNeighborsOf(currentNode).forEach( function(successor) {
			console.log('successor: ', successor );
            		if( closedList.contains(successor) ) {
                		return;
			}

            		var tentative_g = options.getGValueOf(currentNode) + options.getCostsFromTo(currentNode, successor);
            		if( openList.contains(successor) && tentative_g >= options.getGValueOf(successor) ) {
                		return;
			}

			options.setPredessessorOfNode(successor, currentNode);
			options.setGValueOf(successor, tentative_g);

	           	var f = tentative_g + options.getHeuristicsFromTo(successor, toNode);
                	openList.removeNode(successor);

            		options.setFValueOf(successor, f);
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
			console.log('fromNode', fromNode);
			console.log('toNode', toNode);
			console.log('current: ', currentNode);
            		if( currentNode === toNode ) {
                		return options.createPathFromTargetToStartNode(toNode);
			}
            		closedList.putNode(currentNode);
            		expandNode(currentNode);
        	} while( !openList.isEmpty() );
        	return undefined;		
	};
};


