import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './css/styles.css'
import { theftLoc } from './biketheft.js';


export function bikesResult(apiResponse){
	document.getElementById("result-box").innerHTML = null;
	const resultDisplay = document.getElementById("result-box");
	resultDisplay.removeAttribute("class", "result-display");
	resultDisplay.setAttribute("class", "hidden")
	
	let bikeMfgTally = [];
	let bikeColorTally = [];

	for (let i=0; i < apiResponse.bikes.length; i++){
		let bikeColors = apiResponse.bikes[i].frame_colors;
		bikeColors.forEach(element => {
			bikeColorTally.push(element);
		})
		console.log(bikeColorTally);
		let bikeTitle = apiResponse.bikes[i].title;
		let bikeDate = new Date(apiResponse.bikes[i].date_stolen * 1000);
		let bikeLoc = apiResponse.bikes[i].stolen_location
		let bikeSerial = apiResponse.bikes[i].serial;
		bikeMfgTally.push(apiResponse.bikes[i].manufacturer_name);
		console.log(bikeMfgTally);
		const display1 = document.createElement("h4");
		const display2 = document.createElement("p");
		resultDisplay.append(display1);
		display1.append(`${bikeTitle}---Stolen ${bikeDate} ${bikeLoc}`);
		display2.append(`Color: ${bikeColors.join(" ")} Serial Number: ${bikeSerial}`);
    display1.after(display2);
	}
	resultDisplay.removeAttribute("class", "hidden");
	resultDisplay.setAttribute("class", "result-display")
}

export function bikesError(apiRequest){
	console.log(apiRequest);
	const resultDisplay = document.getElementById("result-display");
	document.getElementById("result-display").innerHTML = null;
	const displayError = document.createElement("h4")
	let errorMsg = `Results cannot be displayed: ${apiRequest.status} ${apiRequest.statusText}`
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