/*
 * api running test case
 */

(function() {

var testCase = require('lib/nodeunit').testCase,
    apiVersion = '1.0.alpha1';

module.exports = testCase({
	setUp: function() {
		var OAuth = require('lib/node-oauth/').OAuth,
			querystring = require('querystring');
		
		this.oa = new OAuth(
			  "http://node.kliopa.net/node/oauth/service.js/request_token"
			, "http://node.kliopa.net/node/oauth/service.js/access_token"
			, "WZBmfGH0u9cExrDB5iYow",  "9XpDfArpTBTONhraJoIF2zNN9Eg11vIwzLDlKzans"
			, "1.0", "http://node.kliopa.net/node/oauth/service.js/trace", "HMAC-SHA1"
		);
		this.result = { test: 'hallo', world: "test2" };
		this.oauth_access_token = "96588107-KMninabrVbLAjAl0bFx6AhE9SXTZMkA8lIK8TPkjb";
		this.oauth_access_token_secret = "ahuOyEgcJe4j5XkSA0ggx5YjO9XkOSOIwrItZ8jI";
		this.url1 = "http://node.kliopa.net/node/api.js/test/testFunction.json?"+querystring.stringify(this.result);
		this.url2 = "http://node.kliopa.net/node/api.js/test/getVersion.json";
	},
	
	testOA: function(test) {
		test.ok(this.oa, "OA object was not created");
		test.done(); 
	},
	
	testOAGet: function(test) {
		test.expect(2);
		var result = this.result;
		this.oa.get( this.url1, this.oauth_access_token, this.oauth_access_token_secret,  function (error, data, response) {
			var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.deepEqual(res, result, "returned data is not same as expected");
			test.done();
		});
	},
	
	testOAApiVersion: function(test) {
	    test.expect(2);
	    this.oa.get( this.url2, this.oauth_access_token, this.oauth_access_token_secret,  function (error, data, response) {
    		var res = !error ? JSON.parse(data) : null;
			test.ok(!error, "Server send error back");
			test.deepEqual(res, apiVersion, "returned version is not same as expected");
			test.done();
		});
	}
});

})();
