/*
 * api running test case
 */

(function() {

var testCase = require('lib/nodeunit').testCase,
    Base = require('lib/classes/oop');
    apiVersion = '1.0.alpha1',
    path = './../../htdocs-node/node';

module.exports = testCase({
	setUp: function() {
        this.Publisher = Base.loadFile(path + '/util/publisher.js').Publisher;
        this.host = 'node.telestrekoza.com';
        this.url = "/channels/pub";
        this.req = {
		    username: "testUnitUser",
		    notice: "hallo World!",
		    date: new Date()
		};
		this.reqString = JSON.stringify( this.req );
	},
	
	
	testLibAccessible: function(test) {
	    test.ok(this.Publisher, "Publisher is not present");
	    test.done();
	},
	
	testPublisherInit: function(test) {
	    test.expect(4);
	    var cfg;
	    this.Publisher.init({ url: this.url,
	       headers: {
	           host: this.host
        }});
        cfg = this.Publisher.get();
        test.equal(this.url, cfg.url, "Url isn't configured properly");
        test.equal(this.host, cfg.headers.host, "Host isn't configured properly");
        
        this.Publisher.init({ url: this.url });
        cfg = this.Publisher.get();
        test.equal(this.url, cfg.url, "Url isn't configured properly");
        
        this.Publisher.init({
           headers: {
               host: this.host
        }});
        cfg = this.Publisher.get();
        test.equal(this.host, cfg.headers.host, "Host isn't configured properly");
        
        
        test.done();
	},
	
    testSentStringToChannel: function(test) {
        test.expect(2);
        this.Publisher.init({url: this.url,
            headers:{
                host: this.host
        }});
        this.Publisher.publish(this.reqString, function(r) {
            test.ok(r && r.statusCode, "response is not set");
            var status = r ? r.statusCode : null;
            test.ok( status >=200 && status < 300, "server send wrong status code");
            test.done();
        }, this);
    },
    
    testSentObjectToChannel: function(test) {
        test.expect(2);
        this.Publisher.init({url: this.url,
            headers:{
                host: this.host
        }});

        this.Publisher.publish(this.req, function(r) {
            test.ok(r && r.statusCode, "response is not set");
            var status = r ? r.statusCode : null;
            test.ok( status >=200 && status < 300, "server send wrong status code");
            test.done();
        }, this);
    }

});

})();
