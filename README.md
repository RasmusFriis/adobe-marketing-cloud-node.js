This is a brand new updated version of the Adobe Marketing Cloud Developer Connection usage in Node.js
taken from https://github.com/Adobe-Marketing-Cloud/marketing-cloud-node-sdk

I have updated some of functions, which did not work as expected, 
remember to import the *WSSE" module, which should be used in the adm-rest-client.js file

You shold use the files like this:

///////////////////////////////////////////////////////

'use strict';

var client = require('./marketing-cloud');

/* Adobe Identities */
var username = "Insert your adobe username";
var secret = "Insert your adobe secret";

// configuration values
var config = {
	username: username,
	secret: secret
};

// sets client configuration
client.config(config);

/* Choose on of the functions from https://marketing.adobe.com/developer/api-explorer */
var call = 'Insert your Adobe api method'; // for instance Classifications.CreateExport

/* Choose your arguments, I have used the ones from Classifications.CreateExport */
var args = {
  "all_rows": "1",
  "campaign_filter_end_date": "2017-05-01",
  "campaign_filter_start_date": "2016-11-01",
  "date_filter_end_date": "2017-05-01",
  "date_filter_start_date": "2016-11-01",
  "element": "******",
  "email_address": "********",
  "encoding": "UTF-8",
  "rsid_list": ["**********"]
};

module.exports = (event, callback) => {
 
  client.rest(call, args,
    function(err, response) {
        if(err) {
          callback(null,err);
          return;
        }      
        callback(null,response);
    }
  );  
};
