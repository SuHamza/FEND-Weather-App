// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/** Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;

const server = app.listen(port, () => {
	console.log("Server Running!");
	console.log(`Running on LocalHost: ${port}`);
});

/** GET Route that returns the projectData object */
app.get('/all', (req, res) => {
	console.log(projectData);
	res.send(projectData);
});

/** POST Route that adds incoming data to projectData */
app.post('/setWeather', (req, res) => {
	let data = req.body;
	// console.log(data);
	projectData['temp'] = data.temperature;
	projectData['date'] = data.date;
	projectData['feelings'] = data.feelings;
});