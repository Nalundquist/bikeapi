import { theftloc } from './biketheft.js'

let locInput = document.getElementById("loc-input").value;
let mileRadius = document.getElementById("mile-radius").value;

export function bikesResult(apiResponse, loc, prox){
	const resultDisplay = document.getElementById("result-display");
	document.getElementById("result-display").innerHTML = null;
	
	for (let i=0; i < apiResponse.data.length; i++){
		let bikeColors = apiResponse.data[i].bikes.frame_colors;
		let bikeTitle = apiResponse.data[i].bikes.title;
		let bikeDate = new Date(apiResponse.data[i].bikes.date_stolen * 1000);
		let bikeLoc = apiResponse.data[i].bikes.stolen_location
		let bikeSerial = apiResponse.data[i].bikes.serial;
		const display1 = document.createElement("h4");
		const display2 = document.createElement("p");
		resultDisplay.append("display1");
		display1.append(`${bikeTitle}---Stolen ${bikeDate} ${bikeLoc}`);
		display2.append(`Color: ${bikeColors.join(" ")} Serial Number: ${bikeSerial}`);
    display1.after(display2);
	}
}