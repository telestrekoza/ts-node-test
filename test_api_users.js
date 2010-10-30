/*
 * api running test case
 */

(function() {

var testCase = require('lib/nodeunit').testCase;

module.exports = testCase({
	setUp: function() {
		var OAuth = require('lib/node-oauth/').OAuth,
			querystring = require('querystring'),
			config = require('config'),
			oaSettings = config.oa;
		
		this.oa = new OAuth(
			  oaSettings.requestUrl
			, oaSettings.accessTokenUrl
			, oaSettings.key, oaSettings.secret
			, oaSettings.version, oaSettings.callbackUrl, oaSettings.sign
		);
		this.config = config;
		this.oaSettings = oaSettings;
		this.urlGetVersion = "http://node.kliopa.net/node/api.js/users/getVersion.json";
		this.urlGetUserInfo = "http://node.kliopa.net/node/api.js/users/getUserInfo.json";
	},
	
	testOA: function(test) {
	    test.expect(3);
	    test.ok(this.config, "Config is missing");
	    test.ok(this.oaSettings, "OA settings are missing in config");
		test.ok(this.oa, "OA object was not created");
		test.done();
	},
	
	testOAApiVersion: function(test) {
	    test.expect(2);
	    var oaSet = this.oaSettings,
	        config = this.config;
	    this.oa.get( this.urlGetVersion, oaSet.access_token, oaSet.access_token_secret,  function (error, data, response) {
    		var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.equal(res, config.apiVersion, "returned version is not same as expected");
			test.done();
		});
	},
	
	testOAGetUserInfo: function(test) {
    	test.expect(2);
		var oaSet = this.oaSettings,
		    result = this.result,
		    args = '?userId=2';
		this.oa.get( this.urlGetUserInfo+args, oaSet.access_token, oaSet.access_token_secret,  function (error, data, response) {
			var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.deepEqual(res.id, 2, "returned data is not same as expected");
			test.done();
		});
	},
});

})();
