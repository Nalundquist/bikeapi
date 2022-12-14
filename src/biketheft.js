import { bikesResult } from "./index.js";
import { bikesError } from "./index.js";

export function theftLoc(loc, prox){
	let bikePromise = new Promise(function(resolve, reject){
		let apiRequest = new XMLHttpRequest();
		const url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${loc}&distance=${prox}&stolenness=proximity`;

		apiRequest.addEventListener("loadend", function(){
			const apiResponse = JSON.parse(this.responseText);

			if(this.status === 200){
				resolve(apiResponse);
			} else {
				reject (this);
			}
		})
		apiRequest.open("GET", url, true);
		apiRequest.send();	
	})

	bikePromise.then(function(apiResponse){
		bikesResult(apiResponse);
	}, function(errorMsg) {
		bikesError(errorMsg);
	})
}

