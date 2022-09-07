import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import { theftLoc } from './biketheft.js';


export function bikesResult(apiResponse){
	const resultDisplay = document.getElementById("result-display");
	document.getElementById("result-display").innerHTML = null;
	console.log(apiResponse);

	for (let i=0; i < apiResponse.bikes.length; i++){
		let bikeColors = apiResponse.bikes[i].frame_colors;
		let bikeTitle = apiResponse.bikes[i].title;
		let bikeDate = new Date(apiResponse.bikes[i].date_stolen * 1000);
		let bikeLoc = apiResponse.bikes[i].stolen_location
		let bikeSerial = apiResponse.bikes[i].serial;
		const display1 = document.createElement("h4");
		const display2 = document.createElement("p");
		resultDisplay.after(display1);
		display1.append(`${bikeTitle}---Stolen ${bikeDate} ${bikeLoc}`);
		display2.append(`Color: ${bikeColors.join(" ")} Serial Number: ${bikeSerial}`);
    display1.after(display2);
	}
}

export function bikesError(apiRequest, apiResponse){
	const resultDisplay = document.getElementById("result-display");
	document.getElementById("result-display").innerHTML = null;
	const displayError = document.createElement("h4")
	let errorMsg = `Results cannot be displayed: ${apiRequest.status} ${apiRequest.statusText} // ${apiResponse.message}`
	resultDisplay.after(displayError);
	displayError.append(errorMsg);
}

function formSubmit(event){
	event.preventDefault();
	
	let locInput = document.getElementById("loc-input").value;
	let mileRadius = document.getElementById("miles-radius").value;
	theftLoc(locInput, mileRadius);
}

window.addEventListener("load", function(){
	document.getElementById("user-input").addEventListener("submit", formSubmit);
})