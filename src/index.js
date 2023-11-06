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
    // const currentDay = today.getDate();
    const currentDay = 3;
    const todaysDate = document.querySelector(".todaysDate");
    const imgCon = document.querySelector(".imgCon");
    const saintName = document.querySelector(".saintName");
    const saintInfoLink = document.querySelector(".saintInfoLink");
    const linkBtn = saintInfoLink.querySelector("button");
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
    todaysDate.textContent = `${daysOfWeek[today.getDay()-1]} ${addSuffixToDay(currentDay)} ${currentMonthName}`;

    // Get the specific saint's data 
    const saintForDate = data[currentMonthName].find((saint) => saint["feast-day"] === currentDate);

    if (saintForDate) {
        saintName.textContent = saintForDate["saint-name"];
        //  If name is over a certain length, decrease the font size
        formatH1(saintName, saintForDate["saint-name"]);


        saintInfoLink.href = saintForDate["wiki-link"];
        linkBtn.textContent = `Learn about ${saintForDate["saint-name"]}`;
        imgCon.style.backgroundImage = `url(${saintForDate["image-url"]})`;
        // imgCon.src = `${saintForDate["image-url"]}`;
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
    h1.textContent = text;
    let length = text.length;

    console.log(length);

    //  long = 21, 24, 24 = font-size: 1.5rem;

    if (length >= 10) {
        h1.style.fontSize = "font-size: 1.5rem;"
    }
}

