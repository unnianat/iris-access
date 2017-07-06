'use strict';

const express = require('express');
const service = express();
const request = require('superagent');

require('dotenv').config({path: '../.env'});

service.get('/service/:application', (req, res, next) => {
	var temp = "hello";
	if( req.params.application == 'Reach' )    
	{
		//res.json({result: `Unnikrishnan Kavungal Anat`});
		

var auth = new Buffer( process.env.SERVICE_NOW_USER + ':' + process.env.SERVICE_NOW_PASSWORD).toString('base64'); //create --user user:password to add to header

request.post(process.env.SERVICE_NOW_URL)
    .set('Content-Type', 'application/json')
	.set('Accept','application/json')
	.set('Authorization','Basic ' + auth) //adding authentication
    .send('{\'short_description\':\'Unable to connect to office wifi again\',' +
		   '\'assignment_group\':\'287ebd7da9fe198100f92cc8d1d2154e\',' +
		   '\'urgency\':\'2\',' +
		   '\'impact\':\'2\'}')
    .end(function(err, ress){
		if(err) {
            console.log(err);

            return ress.sendStatus(500);
			
        }else{
			console.log(ress.body.result);
			
			temp = ress.body.result.number;
			console.log("RR " +temp);
			res.json({result: `Incident created: ${temp} https://dev19318.service-now.com/nav_to.do?uri=%2Fincident.do%3Fsys_id%3D${ress.body.result.sys_id}`});	
		}
    });

	
	}
	


});

module.exports = service;