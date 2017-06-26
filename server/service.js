'use strict';

const express = require('express');
const service = express();
const request = require('superagent');

service.get('/service/:application', (req, res, next) => {
	if( req.params.application == 'Reach' )    
	{
		res.json({result: `Unnikrishnan Kavungal Anat`});
	}
	else
	{
	  	res.json({result: `Ryan Ramos`});
	}


});

module.exports = service;