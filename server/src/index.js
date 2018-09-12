// "use strict"
// IMPORTS
const Express = require('express');
const BodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;

// Initialisation
const server = Express();

// Static serv..
server.use('/static', Express.static('public'));
// Body Parser config
server.use(BodyParser.urlencoded({extended: true}));
server.use(BodyParser.json());

// Routes
server.get("/", (req, res) => {
	res.setHeader("Content-Type", "text/html");
	res.status(200).send("<h1> Welcome </h1>");
});

server.use("/api/", apiRouter());

server.listen(8080, () => {
	console.log("Listen");
})
