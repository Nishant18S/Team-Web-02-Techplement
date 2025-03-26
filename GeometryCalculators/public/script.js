// Wait for the DOM to load before executing scripts
document.addEventListener("DOMContentLoaded", () => {
    let expandableItems = document.querySelectorAll(".expandable");

    expandableItems.forEach(item => {
        item.addEventListener("click", () => {
            let subMenu = item.nextElementSibling;
            if (subMenu && subMenu.classList.contains("sub-menu")) {
                subMenu.classList.toggle("active");
            }
        });
    });
});

// Function to load the calculator dynamically
async function loadCalculator(type) {
    try {
        let response = await fetch(`/geometry/view/${type}`); // Fetch the calculator HTML page
        console.log(response);

        if (response.ok) {
            let content = await response.text();
            let calculatorContent = document.getElementById("calculator-content");

            if (calculatorContent) {
                calculatorContent.innerHTML = content;

                // Ensure previous results are cleared
                let resultElement = document.getElementById(`${type}-result`);
                if (resultElement) resultElement.innerHTML = "";
            }
        } else {
            document.getElementById("calculator-content").innerHTML = "<h2>Calculator not found!</h2>";
        }
    } catch (error) {
        console.error("Error loading calculator:", error);
        document.getElementById("calculator-content").innerHTML = "<h2>Error loading calculator.</h2>";
    }
}

// Function to handle form submission and calculations
async function calculate(type) {
    let form = document.querySelector(`form[data-type="${type}"]`);

    if (!form) {
        console.error(`Form with data-type="${type}" not found.`);
        return;
    }

    let formData = new FormData(form);
    let queryParams = new URLSearchParams();

    formData.forEach((value, key) => {
        queryParams.append(key, value);
    });

    try {
        let response = await fetch(`/geometry/${type}?${queryParams.toString()}`);
        console.log(response);

        if (response.ok) {
            let contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                let result = await response.json();
                let resultElement = document.getElementById(`${type}-result`);

                if (resultElement) {
                    resultElement.innerHTML = ""; // Clear previous content

                    for (let key in result) {
                        let line = document.createElement("p");
                        line.textContent = `${key}: ${result[key]}`;
                        resultElement.appendChild(line);
                    }
                }
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
        document.getElementById(`${type}-result`).innerText = "Error processing request.";
    }
}
