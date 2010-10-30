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
		this.result= { test1: "Hallo", test2: "World", a1: "b2" };
		this.urlTestPostFunction = "http://node.kliopa.net/node/api.js/test/testFunction.json";
		this.urlTestGetFunction = this.urlTestPostFunction + "?" + querystring.stringify(this.result);
		this.urlGetVersion = "http://node.kliopa.net/node/api.js/test/getVersion.json";
		this.urlGetAuth = "http://node.kliopa.net/node/api.js/test/getAuth.json";
		this.urlNotExistingMethod = "http://node.kliopa.net/node/api.js/test/getNotExist.json";
		this.urlNotExistingURL = "http://node.kliopa.net/node/api.js/_test/_getNotExistingURL.json";
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
			test.deepEqual(res, config.apiVersion, "returned version is not same as expected");
			test.done();
		});
	},
	
	testOAApiAuth: function(test) {
        test.expect(2);
	    var oaSet = this.oaSettings,
            config = this.config;
	    this.oa.get( this.urlGetAuth, oaSet.access_token, oaSet.access_token_secret,  function (error, data, response) {
    		var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.ok(res.oauth_consumer_key, "consumer key cant be empty");
			test.done();
		});
	},
	
	testOAGet: function(test) {
    	test.expect(2);
		var oaSet = this.oaSettings,
		    result = this.result;
		this.oa.get( this.urlTestGetFunction, oaSet.access_token, oaSet.access_token_secret,  function (error, data, response) {
			var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.deepEqual(res, result, "returned data is not same as expected");
			test.done();
		});
	},
	
	testOAPost: function(test) {
        test.expect(2);
		var oaSet = this.oaSettings,
		    result = this.result;
		this.oa.post( this.urlTestPostFunction, oaSet.access_token, oaSet.access_token_secret, result,  function (error, data, response) {
			var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.deepEqual(res, result, "returned data is not same as expected");
			test.done();
		});
	},
	
	//test Errors
	testOAGetNotExistingMethod: function(test) {
    	test.expect(2);
		var oaSet = this.oaSettings,
		    result = this.result;
		this.oa.get( this.urlNotExistingMethod, oaSet.access_token, oaSet.access_token_secret,  function (error, data, response) {
			var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.deepEqual(res.message, 'Method not found', "returned data is not same as expected");
			test.done();
		});
	},
	
	testOAGetNotExistingURL: function(test) {
        test.expect(1);
		var oaSet = this.oaSettings,
		    result = this.result;
		this.oa.get( this.urlNotExistingURL, oaSet.access_token, oaSet.access_token_secret,  function (error, data, response) {
			//TODO: need api change to send 404
			test.ok(error, "This url should give some error");
			test.done();
		});
	}
});

})();
