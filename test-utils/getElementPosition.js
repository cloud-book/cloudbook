var async = require('async');
var findPositionInWindow = require('../test-utils/findPositionInWindow.js');
var _ = require('lodash');


// get the position of an element inside the window of nw.js
function getElementPosition(cri, selector, callback) {
	async.waterfall([
		function evalFindPos (cb) {
			// evaluate a javascript function that will detect the top and left coordinates of the element relative to the window's origin point
			// and then call that function with a selector that targets the send button
			cri.Runtime.evaluate({
				expression: findPositionInWindow.toString() + '\nfindPositionInWindow(\''+selector+'\')'
			}, cb)
		},
		function getFindPosResults (remoteEval, cb) {
			// get the results of the previous invocation
			cri.Runtime.getProperties({
				objectId: remoteEval.result.objectId
			}, cb)
		}
	], function(err, findPosResults) {
		if (err) return callback(err)

		var left = _.find(findPosResults.result, {
			name: 'left'
		})

		var top = _.find(findPosResults.result, {
			name: 'top'
		})

		callback(null, {
			x: left.value.value,
			y: top.value.value
		})
	})
}

module.exports = getElementPosition;