// IMPORTS
// import Express from 'express';
const Express = require('express');

const server = Express();

server.get("/", (req, res) => {
	res.send("OK");
});

server.listen(8080, () => {
	console.log("Listen");
})
