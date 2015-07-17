var run = require('../task/run.js')
var findPositionInWindow = require('../test-utils/findPositionInWindow.js')
var inputmanager = require('../test-utils/inputmanager.js')
var getElementPosition = require('../test-utils/getElementPosition.js')

var chromeRemoteInterface = require('chrome-remote-interface')
var path = require('path')
var _ = require('lodash')
var should = require('should')


describe('Cloudbook', function() {
	this.timeout(20000)

	var nw, cri

	it('Create new project with name testdir', function(done) {
		var requests = []

		// enable network in cri
		cri.Network.enable()

		// listen to outgoing requests
		 cri.Network.requestWillBeSent(function(params) {
		 	requests.push(params)
		 })

		// get the send button's position
		getElementPosition(cri, '#newproject', function(err, pos) {
			if (err) return done(err)

			// simulate the click
			inputmanager.click(cri, pos.x + 5, pos.y + 5, function(err, result) {
				if (err) return done(err)
				inputmanager.sendtext(cri,"testdir",function(err,result){
					getElementPosition(cri, '#advprojbtn', function(err, pos) {
						if (err) return done(err);
						inputmanager.click(cri, pos.x + 5, pos.y + 5, function(err, result) {
							setTimeout(function(){done()},1000);
						});

					});
				});
			});
		});
	});


	// run nw.js and connect the remote interface before every test case
	beforeEach(function(done) {
		nw = run()

		setTimeout(function() {
			chromeRemoteInterface(function(c) {
				cri = c
				done()
			}).once('error', function() {
				done(new Error('Cannot connect to Chrome'))
			})
		}, 1000)
	})

	// shut down the connection and close nw.js after each test case
	afterEach(function(done) {
		if (cri) {
			cri.close()
		}

		if (nw.isAppRunning()) {
			nw.getAppProcess().on('close', done).kill()
		} else {
			setTimeout(done, 1000)
		}
	})

})