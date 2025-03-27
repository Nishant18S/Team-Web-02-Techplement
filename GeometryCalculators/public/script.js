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

// Register Form Username & Password Validation

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("register-form")?.addEventListener("submit", function (event) {
        const username = document.querySelector("input[name='username']").value;
        const password = document.querySelector("input[name='password']").value;
        const errorDiv = document.getElementById("register-error");

        // Username Regex: 3-20 characters, only letters, numbers, underscores (_), and dots (.)
        const usernameRegex = /^[a-zA-Z0-9](?!.*[_.@]{2})[a-zA-Z0-9._@]{1,18}[a-zA-Z0-9]$/;

        // Strong Password Regex: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let errorMessage = "";

        if (!usernameRegex.test(username)) {
            errorMessage = "Username must be 3-20 characters, can contain letters, numbers, _ and ., but no spaces or special symbols.";
        } else if (!passwordRegex.test(password)) {
            errorMessage = "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character.";
        }

        if (errorMessage) {
            event.preventDefault(); // Stop form submission
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = "red";
        }
    });
});

