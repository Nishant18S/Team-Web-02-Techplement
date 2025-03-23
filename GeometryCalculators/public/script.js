// Function to toggle category expansion
document.addEventListener("DOMContentLoaded", () => {
    let expandableItems = document.querySelectorAll(".expandable");
    
    expandableItems.forEach(item => {
        item.addEventListener("click", () => {
            let subMenu = item.nextElementSibling; // Find the corresponding sub-menu
            if (subMenu) {
                subMenu.classList.toggle("active"); // Toggle visibility
            }
        });
    });
});

// Function to load calculator dynamically
async function loadCalculator(type) {
    try {
        let response = await fetch(`/geometry/view/${type}`); // Load HTML form

        if (response.ok) {
            let content = await response.text();
            document.getElementById("calculator-content").innerHTML = content;
            
            // Clear previous result when loading a new calculator
            let resultElement = document.getElementById(`${type}-result`);
            if (resultElement) resultElement.innerText = "";
        } else {
            document.getElementById("calculator-content").innerHTML = "<h2>Calculator not found!</h2>";
        }
    } catch (error) {
        console.error("Error loading calculator:", error);
    }
}

// Function to handle form submission and perform calculations
async function calculate(type) {
    let form = document.querySelector(`form[data-type="${type}"]`); // Select form using data-type attribute

    if (!form) {
        console.error(`Form with data-type="${type}" not found.`);
        return;
    }

    let formData = new FormData(form);
    let queryParams = new URLSearchParams();

    // Convert form data to query string parameters
    formData.forEach((value, key) => {
        queryParams.append(key, value);
    });

    try {
        let response = await fetch(`/geometry/api/${type}?${queryParams.toString()}`); // Call the API, not EJS

        if (response.ok) {
            let contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                let result = await response.json();
                document.getElementById(`${type}-result`).innerText = `Result: ${JSON.stringify(result)}`;
            } else {
                let errorText = await response.text();
                console.error("Unexpected response format:", errorText);
                document.getElementById(`${type}-result`).innerText = "Error: Unexpected response format.";
            }
        } else {
            document.getElementById(`${type}-result`).innerText = "Error calculating result.";
        }
    } catch (error) {
        console.error("Error performing calculation:", error);
    }
}
