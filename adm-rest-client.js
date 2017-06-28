var request=require('request');
var url = require("url");

var config = function(config) {
    this._config = config;

    if(!this._config.api_endpoint || 0 === !this._config.api_endpoint.length) {
		this._config.api_endpoint = "https://api.omniture.com/admin/1.4/";
    }
};

var call = function(method, args, callback, exheaders) {
	var wsse = require('wsse');
    var that = this;
   
	var _url = this._config.api_endpoint.replace(/(.*)\?.*/, '$1') + 'rest/?method=' + method;
	
	var token = wsse({ username: that._config.username, password: that._config.secret });
	var wsse = {'X-WSSE': token.getWSSEHeader({ nonceBase64: true })};

	var opts = {
		headers: wsse,
		method: 'post', data: args
	};

	// set content type header
	opts.headers["Accept"] = "*/*";
	opts.headers["Content-Type"] = "application/x-www-form-urlencoded";

    exheaders = exheaders || {};
    for (var attr in exheaders) { opts.headers[attr] = exheaders[attr]; }

	var _proxy = null;
	if(process.env.API_PROXY) {
		var curl = url.parse(_url);
		opts.headers["Host"] = curl.host;
		_proxy = process.env.API_PROXY;
	}

   var options = {
     url: _url,
     method: 'POST',
     headers:opts.headers,
     json: args,
	 proxy:_proxy
   };

   request(options, function(err, res, body) {
	if(err) {
        callback(null,err);
        return;
    }        
    callback(null,res);
   });
   
};

exports.config = config;
exports.call = call;