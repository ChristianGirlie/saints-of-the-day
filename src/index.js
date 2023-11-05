function fetchSaintData(callback) {
	fetch("saints.json")
		.then((response) => response.json())
		.then((data) => callback(data))
		.catch((error) => console.error("Error fetching saints data: " + error));
}

// Function to display the saint's information
function displaySaintForDate(data) {
    // Variables
    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Months are zero-based, so add 1.
    const currentDay = today.getDate();
    const h1 = document.createElement("h1");
  
    const currentMonthName = currentMonth === 11 ? "November" : "December";
    const currentDate = `${currentDay < 10 ? "0" : ""}${currentDay}/${currentMonth < 10 ? "0" : ""}${currentMonth}`;
  
    const saintForDate = data[currentMonthName].find(saint => saint["Feast Day (DD/MM)"] === currentDate);
  
    if (saintForDate) {
      
      h1.textContent = saintForDate["Saint Name"];
  
      const img = document.createElement("img");
      img.src = saintForDate["Link to Image Online"];
  
      const a = document.createElement("a");
      a.href = saintForDate["Wiki Link"];
      a.textContent = "Learn more on Wikipedia";
  
      const p = document.createElement("p");
      p.textContent = saintForDate["Famous Quote"];
  
      const container = document.getElementById("saint-info-container");
      container.innerHTML = ""; // Clear previous content
      container.appendChild(h1);
      container.appendChild(img);
      container.appendChild(a);
      container.appendChild(p);
    }
  }

fetchSaintData(displaySaintForDate);