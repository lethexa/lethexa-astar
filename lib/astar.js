
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


/**
 * The A* pathfinding algorithm 
 * @class AStarRouting
 * @constructor
 * @param fromNode {object} The startnode
 * @param toNode {object} The endnote
 */
module.exports.AStarRouting = function( fromNode, toNode ) {
	var openList = [];
	var closedList = [];

	var getNeighborsOf = function(node) {
	};

	var getMinPriorityFromOpenList = function() {
	};

	var putNodeOnOpenList = function(node) {
        };

	var removeNodeFromOpenList = function(node) {
	};

        var putNodeOnCloseList = function(node) {
        };

	var createPathFromTargetToStartNode = function(node) {
	};

	var isOpenListEmpty = function() {
	};

	var isNodeOnClosedList = function(node) {
	};

        var isNodeOnOpenList = function(node) {
        };

	var setPredessessorOfNode = function(node, pred) {
	};

	var getGValueOf = function(node) {
	};

	var setGValueOf = function(node, gValue) {
	};

	var setFValueOf = function(node, fValue) {
	};

	var getCostsFromTo = function(node1, node2) {
	};

	var getHeuristicsFromTo = function(node1, node2) {
	};

	var expandNode = function(currentNode) {
        	getNeighborsOf(currentNode).forEach( function(successor) {
            		if( isNodeOnClosedList(successor) ) {
                		return;
			}

            		var tentative_g = getGValueOf(currentNode) + getCostsFromTo(currentNode, successor);
            		if( isNodeOnOpenList(successor) && tentative_g >= getGValueOg(successor) ) {
                		return;
			}

			setPredessessorOfNode(successor, currentNode);
			setGValueOf(successor, tentative_g);

	           	var f = tentative_g + getHeuristicsFromTo(successor, toNode);
            		if( isNodeOnOpenList(successor) ) {
                		removeNodeFromOpenList(successor);
            		}
            		setFValueOn(successor, f);
            		putNodeOnOpenList(successor);
        	});
	};

	/**
 	 * Calculates the route from node to node
 	 * @method calculateRoute
 	 * @return {array} The list of ids of the route
 	 */
	this.calculateRoute = function() {
		var currentNode;
        	putNodeOnOpenList(fromNode);
        	do {
            		currentNode = getMinPriorityFromOpenList();
            		if( currentNode === toNode )
                		return createPathFromTargetToStartNode(toNode);

            		putNodeOnClosedList(currentNode);
            		expandNode(currentNode);
        	} while( !isOpenListEmpty() );
        	return undefined;		
	};
};


