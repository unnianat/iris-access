'use strict';
const request = require('superagent');
const service = require('../server/service');
const http = require('http');

require('dotenv').config({path: '../.env'});

const server = http.createServer(service);
server.listen();

server.on('listening', function() {
    console.log(`IRIS-Access is listening on ${server.address().port} in ${service.get('env')} mode.`);

    const announce = () => {
        request.put(`http://` + process.env.SERVER_HOST + `:` + process.env.SERVER_PORT + `/service/access/${server.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error connecting to Iris Access"); 
            }
        });
    };
    announce();
    setInterval(announce, 15*1000);
});