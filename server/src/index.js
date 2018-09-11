"use strict"
// IMPORTS
const Express = require('express');
const BodyParser = require('body-parser');

// Initialisation
const server = Express();

// Static serv..
server.use('/static', Express.static('public'));
// Body Parser config
server.use(BodyParser.urlencoded({extended: true}));
server.use(BodyParser.json());


// Routes
server.get("/", (req, res) => {
	res.send("OK");
});


server.listen(8080, () => {
	console.log("Listen");
})
