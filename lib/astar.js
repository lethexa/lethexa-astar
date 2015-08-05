
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
		var list = [];
		var node = getNodeById(nodeId);
		while(node) {
			//console.log('pathnode: ', node.id);
			list.push(node.id);
			node = getNodeById(node.predId);
		}
		return list;
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

	var getDistance = function(node1, node2) {
		var dx = node1.entry.position[0] - node2.entry.position[0];
		var dy = node1.entry.position[1] - node2.entry.position[1];
		var dz = node1.entry.position[2] - node2.entry.position[2];
		return Math.sqrt(dx*dx + dy+dy + dz*dz);
	};

	this.getCostsFromTo = function(nodeId1, nodeId2) {
		var node1 = getNodeById(nodeId1);
		var node2 = getNodeById(nodeId2);
		var result = getDistance(node1, node2);
		return result;
	};

	var getManhattanDistance = function(node1, node2) {
		var dx = node1.entry.position[0] - node2.entry.position[0];
		var dy = node1.entry.position[1] - node2.entry.position[1];
		var dz = node1.entry.position[2] - node2.entry.position[2];
		return Math.abs(dx) + Math.abs(dy) + Math.abs(dz);
	};

	this.getHeuristicsFromTo = function(nodeId1, nodeId2) {
		var node1 = getNodeById(nodeId1);
		var node2 = getNodeById(nodeId2);
		var result = getManhattanDistance(node1, node2);
		return result;
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

		this.removeMinPriorityNode = function() {
			var minFNode;
			openList.forEach(function(node) {
				if(minFNode === undefined) {
					minFNode = node;
				}
				else if(options.getFValueOf(node) < options.getFValueOf(minFNode)) {
					minFNode = node;	
				}
			});
			self.removeNode(minFNode);
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
	options.createPathFromTargetToStartNode = options.createPathFromTargetToStartNode || function(nodeId) {};
	options.setPredessessorOfNode =	options.setPredessessorOfNode || function(nodeId, predId) {};
	options.getGValueOf = options.getGValueOf || function(nodeId) {};
	options.setGValueOf = options.setGValueOf || function(nodeId, gValue) {};
	options.getFValueOf = options.getFValueOf || function(nodeId) {};
	options.setFValueOf = options.setFValueOf || function(nodeId, fValue) {};
	options.getCostsFromTo = options.getCostsFromTo || function(nodeId1, nodeId2) {};
	options.getHeuristicsFromTo = options.getHeuristicsFromTo || function(nodeId1, nodeId2) {};

	var expandNode = function(currentNode) {
		//console.log('*******');
        	options.getNeighborsOf(currentNode).forEach( function(successor) {
			//console.log('successor: ', successor );
            		if( closedList.contains(successor) ) {
                		return;
			}

			//console.log('G current: ', options.getGValueOf(currentNode) );
			//console.log('G succ: ', options.getGValueOf(successor) );
			//console.log('Cost: ', options.getCostsFromTo(currentNode, successor) );


            		var tentative_g = options.getGValueOf(currentNode) + options.getCostsFromTo(currentNode, successor);
			//console.log('tentative_g', tentative_g);
            		
			if( openList.contains(successor) && tentative_g >= options.getGValueOf(successor) ) {
                		return;
			}

			options.setPredessessorOfNode(successor, currentNode);
			options.setGValueOf(successor, tentative_g);

	           	var f = tentative_g + options.getHeuristicsFromTo(successor, toNode);
                	openList.removeNode(successor);
		
			//console.log('**** F: ', f);

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
            		currentNode = openList.removeMinPriorityNode();
			//console.log('fromNode', fromNode);
			//console.log('toNode', toNode);
			//console.log('current: ', currentNode);
            		if( currentNode === toNode ) {
				//console.log('========>', toNode);
                		return options.createPathFromTargetToStartNode(toNode);
			}
            		closedList.putNode(currentNode);
            		expandNode(currentNode);
        	} while( !openList.isEmpty() );
		//console.log('---------');
        	return undefined;		
	};
};


