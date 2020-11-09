/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=1019849d057cdf106852ca8c1be85295';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

/** GET Request to the OpenWeatherMap API */
const getWeather = async (apiURL) => {
	const res = await fetch(apiURL);
	try {
		const data = await res.json();
		console.log(data);
		return data;
	}
	catch (error) {
		// Handle Errors
		console.log("Error: ", error);
	}
};

/** POST request to add the API data and data entered by the user */
const postWeather = async (url = '', data = {}) => {
	const res = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	try {
		const newData = await res.json();
		return newData;
	}
	catch (error) {
		// Handle Errors
		console.log("Error: ", error);
	}
};

/** Update the UI dynamically */
const updateUI = async () => {
	const request = await fetch('/all');
	try {
		const appData = await request.json();
		console.log('App Data:', appData);
		document.getElementById('date').innerHTML = appData.date;
		document.getElementById('temp').innerHTML = appData.temp;
		document.getElementById('content').innerHTML = appData.feelings;
	}
	catch (error) {
		// Handle Errors
		console.log("Error: ", error);
	}
};


/** Event Listener for the element with the id: generate, 
 * with a callback function to execute when it is clicked */
document.getElementById('generate').addEventListener('click', () => {
	const zipCode = document.getElementById('zip').value;
	const fullURL = baseURL + zipCode + apiKey;
	// User Response
	const feelings = document.getElementById('feelings').value;
	// Check Zipcode is not empty
	// if (zipCode) {
	// GET request to the OpenWeatherMap API
	getWeather(fullURL)
		.then((data) => {
			console.log("Weather Data: ", data.main.temp);
			console.log("Feelings", feelings);
			const weatherData = {
				'temperature': data.main.temp,
				'date': newDate,
				'feelings': feelings
			};
			postWeather('/setWeather', weatherData);
		})
		.then(() => { updateUI() });
	// }
});