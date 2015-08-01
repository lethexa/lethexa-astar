
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

	var getNextFromOpenList = function() {
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

	this.calculateRoute = function() {
		var currentNode;
        	putNodeOnOpenList(fromNode);
        	do {
            		currentNode = getNextFromOpenList();
            		if( currentNode === toNode )
                		return createPathFromTargetToStartNode(toNode);

            		putNodeOnClosedList(currentNode);
            		expandNode(currentNode);
        	} while( !isOpenListEmpty() );
        	return undefined;		
	};
};


