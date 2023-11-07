function fetchSaintData(callback) {
	fetch("src/saints.json")
		.then((response) => response.json())
		.then((data) => callback(data))
		.catch((error) => console.error("Error fetching saints data: " + error));
}

// Function to display the saint's information
function displaySaintForDate(data) {
	// Variables
	const today = new Date();
	const currentMonth = today.getMonth() + 1;
	const currentDay = today.getDate();
	// const currentDay = 29; // for testing
	const todaysDate = document.querySelector(".todaysDate");
	const card_wrapper = document.querySelector(".card_wrapper");
	const imgCon = document.querySelector(".imgCon");
	const saintNames = document.querySelectorAll(".saintName");
	const saintNameH1 = document.querySelector(".header .saintName");
	const saintInfoLink = document.querySelector(".saintInfoLink");
	const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
	let currentMonthName;

	switch (currentMonth) {
		case 1:
			currentMonthName = "January";
			break;
		case 2:
			currentMonthName = "February";
			break;
		case 3:
			currentMonthName = "March";
			break;
		case 4:
			currentMonthName = "April";
			break;
		case 5:
			currentMonthName = "May";
			break;
		case 6:
			currentMonthName = "June";
			break;
		case 7:
			currentMonthName = "July";
			break;
		case 8:
			currentMonthName = "August";
			break;
		case 9:
			currentMonthName = "September";
			break;
		case 10:
			currentMonthName = "October";
			break;
		case 11:
			currentMonthName = "November";
			break;
		case 12:
			currentMonthName = "December";
			break;
		default:
			currentMonthName = "Unknown";
	}

	// Format to DD/MM
	const currentDate = `${currentDay < 10 ? "0" : ""}${currentDay}/${currentMonth < 10 ? "0" : ""}${currentMonth}`;

	//  Create the full today's date string
	todaysDate.textContent = `${daysOfWeek[today.getDay() - 1]} ${addSuffixToDay(currentDay)} ${currentMonthName}`;

	// Get the specific saint's data
	const saintForDate = data[currentMonthName].find((saint) => saint["feast-day"] === currentDate);

	if (saintForDate) {
		saintNames.forEach((name) => {
			name.textContent = saintForDate["saint-name"];
		});

		formatH1(saintNameH1, saintForDate["saint-name"]);

		saintInfoLink.href = saintForDate["wiki-link"];

		imgCon.style.backgroundImage = `url(${saintForDate["image-url"]})`;

		card_wrapper.style.backgroundImage = `url(${saintForDate["image-url"]})`;
	}
}

fetchSaintData(displaySaintForDate);

function addSuffixToDay(day) {
	if (day >= 11 && day <= 13) {
		return day + "th";
	}
	switch (day % 10) {
		case 1:
			return day + "st";
		case 2:
			return day + "nd";
		case 3:
			return day + "rd";
		default:
			return day + "th";
	}
}

function formatH1(h1, text) {
	let length = text.length;

	if (length >= 21 && length <= 24) {
		h1.style.fontSize = "1.5rem";
	} else if (length >= 25 && length <= 29) {
		h1.style.fontSize = "1.4rem";
	}
}

//  --- Handling the links section ---

const copyLinkBtn = document.querySelector("#copyLinkBtn");
const widgetPagePreviewBtn = document.querySelector("#widgetPagePreviewBtn");

function linkCreation() {
	// Variables
	let flowerOptions = document.getElementsByName("flowerOptions");
	const flowerImages = document.querySelectorAll(".flowerImages");
	let flowerResult = "";

	flowerOptions.forEach((option) => {
		flowerImages.forEach((flower) => {
			if (option.checked && option.value == "true") {
				flowerResult = option.value;
				flower.style.opacity = 1;
			} else if (option.checked && option.value == "false") {
				flowerResult = option.value;
				flower.style.opacity = 0;
			}
		});
	});

	//  Getting the current URL from the tab
	let url = new URL(window.location.href);
	let defaultLink = url.href;
	defaultLink += "p/";



	let completedLink = defaultLink + "?flowers=" + flowerResult;

	console.log(completedLink);

	link(completedLink);
}

function link(url) {
	//  Copy the link button
	copyLinkBtn.addEventListener("click", () => {
		navigator.clipboard.writeText(url);
		copyLinkBtn.style.color = "#4F9A55";
		copyLinkBtn.style.border = "1px solid #58AC5F";

		setTimeout(() => {
			copyLinkBtn.style.color = "black";
			copyLinkBtn.style.border = "1px solid black";
		}, 1000);
	});
	
	//  View the live preview of the widget button
	widgetPagePreviewBtn.addEventListener("click", () => {
		let a = document.createElement("a");
		a.href = url;
		a.target = "_blank";
		a.click();
	});

}

setInterval(() => {
	linkCreation();
}, 100);
