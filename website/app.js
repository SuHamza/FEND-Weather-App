/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = '&appid=1019849d057cdf106852ca8c1be85295';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

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
/** Event Listener for the element with the id: generate, 
 * with a callback function to execute when it is clicked */
document.getElementById('generate').addEventListener('click', () => {
	const zipCode = document.getElementById('zip').value;
	const fullURL = baseURL + zipCode + apiKey;
	getWeather(fullURL);
});