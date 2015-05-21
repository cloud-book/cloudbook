var _ = require('lodash');
var async = require('async');

// simulate a click in the client
function click(cri, x, y, callback) {
	var baseEventInfo = { x: x, y: y, button: 'left', clickCount: 1}

	var mousePressed = _.clone(baseEventInfo)
	mousePressed.type = 'mousePressed'

	var mouseReleased = _.clone(baseEventInfo)
	mouseReleased.type = 'mouseReleased'

	async.series([
		_.bind(cri.Input.dispatchMouseEvent, cri.Input, mousePressed),
		_.bind(cri.Input.dispatchMouseEvent, cri.Input, mouseReleased)
	], callback)	
}

function sendtext(cri,text,callback){
	var letters = text.split("");
	var functions = [];
	var keyup = {type:"keyUp"};
	var keydown = {type:"keyDown"};
	for(var i=0;i < letters.length;i++){
		keydown.text = letters[i];
		functions.push(_.bind(cri.Input.dispatchKeyEvent,cri.Input,_.clone(keydown)));
		functions.push(_.bind(cri.Input.dispatchKeyEvent,cri.Input,keyup));
		
	}
	async.series(functions,callback);
}


module.exports = {click:click,sendtext:sendtext};