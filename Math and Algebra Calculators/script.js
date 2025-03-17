// Show the sidebar and hide the intro screen
window.onload = function() {
    setTimeout(function() {
        document.getElementById('intro').style.display = 'none'; // Hide the intro image
        document.getElementById('sidebar').style.display = 'block'; // Show sidebar
    }, 2000); // Wait for 2 seconds before transitioning
};

// Function to hide the intro image
function hideImage() {
    const image = document.getElementById("introImage");
    image.style.display = "none";
}

// Function to show specific calculators
function showCalculator(calculatorId) {
    // Hide all calculators
    const calculators = document.querySelectorAll('.calculator');
    calculators.forEach(calc => calc.style.display = 'none');

    // Show the selected calculator
    const selectedCalculator = document.getElementById(calculatorId);
    selectedCalculator.style.display = 'block';
    
    hideImage();  // Hide the intro image when a calculator is shown
}

// Function to clear input fields and results
function clearInputs(calculatorId) {
    const calculator = document.getElementById(calculatorId);
    const inputs = calculator.querySelectorAll('input');
    const results = calculator.querySelectorAll('p, div');

    // Clear inputs
    inputs.forEach(input => input.value = '');
    results.forEach(result => result.textContent = '');
}

// Example of Calculate functions (you can expand these functions for each specific calculator)
function calculateComplex() {
    const real1 = parseFloat(document.getElementById('real1').value);
    const imaginary1 = parseFloat(document.getElementById('imaginary1').value);
    const real2 = parseFloat(document.getElementById('real2').value);
    const imaginary2 = parseFloat(document.getElementById('imaginary2').value);

    // Adding the real and imaginary parts
    const realResult = real1 + real2;
    const imaginaryResult = imaginary1 + imaginary2;

    // Format the result in the form of a + bi or a - bi
    let complexResult;
    if (imaginaryResult < 0) {
        complexResult = `${realResult} - ${Math.abs(imaginaryResult)}i`;
    } else {
        complexResult = `${realResult} + ${imaginaryResult}i`;
    }

    // Display the results
    document.getElementById('complexResult').textContent = `Complex Number: ${complexResult}`;
    document.getElementById('realPart').textContent = `Real: ${realResult}`;
    document.getElementById('imaginaryPart').textContent = `Imaginary: ${imaginaryResult}`;
}

function calculatePercentage() {
    const originalValue = parseFloat(document.getElementById('originalValue').value);
    const percentage = parseFloat(document.getElementById('percentage').value);

    const result = (originalValue * percentage) / 100;
    document.getElementById('percentageResult').textContent = `Percentage: ${result}`;
}

function calculateCube() {
    const number = parseFloat(document.getElementById('cubeInput').value);
    const result = number ** 3;
    document.getElementById('cubeResult').textContent = `Cube: ${result}`;
}

// Recursive function for calculating prime factors
function recursivePrime(n, d) {
    if (n <= 1) return [];
    if (n == 2) return [2];  // 2 is the only even prime number
    let factors = [];
    let flag = false;
    while (n % d == 0) {
        factors.push(d);
        n /= d;
        flag = true;
    }
    if (flag) {
        return factors.concat(recursivePrime(n, d + 1));
    }
    return recursivePrime(n, d + 1);
}

// Prime Factorization Calculator
function calculateFactors() {
    // Get the user input and convert it to an integer
    const number = parseInt(document.getElementById("factorInput").value);

    // Check if the input is a valid number and greater than 1
    if (isNaN(number) || number < 2) {
        document.getElementById("factorResult").textContent = "Please enter a valid number greater than 1.";
        return;
    }

    // Call the recursive function to calculate prime factors
    const factors = recursivePrime(number, 2);

    // Display the result in the <p> element
    if (factors.length > 0) {
        document.getElementById("factorResult").textContent = `Prime factors: ${factors.join(", ")}`;
    } else {
        document.getElementById("factorResult").textContent = "No prime factors found.";
    }
}

// Listen for keydown events to trigger actions
document.addEventListener('keydown', function(event) {
    // Find the currently visible calculator
    const visibleCalculator = document.querySelector('.calculator:not([style*="display: none"])');

    if (visibleCalculator) {
        // Determine the calculator type based on its ID
        const calculatorId = visibleCalculator.id;

        if (event.key === 'Enter') {
            // Trigger the appropriate calculate function based on the visible calculator
            if (calculatorId === 'complexCalculator') {
                calculateComplex();
            } else if (calculatorId === 'percentageCalculator') {
                calculatePercentage();
            } else if (calculatorId === 'cubeCalculator') {
                calculateCube();
            } else if (calculatorId === 'factorCalculator') {
                calculateFactors();
            }
        } else if (event.key === 'Delete') {
            // Clear the inputs and results based on the visible calculator
            clearInputs(calculatorId);
        }
    }
});
// Function to toggle sidebar visibility on small screens
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
  }
  
//   // Add event listener to the hamburger menu
//   document.querySelector('.hamburger').addEventListener('click', toggleSidebar);
// Function to hide the intro image
function hideImage() {
    const image = document.getElementById("introImage");
    image.style.display = "none";
}
// Inequality Calculator
function showInequalityCalculator() {
    const inequality = document.getElementById('inequalityInput').value;
  
    if (!inequality) {
      alert("Please enter a valid inequality");
      return;
    }
  
    // For simplicity, let's assume it solves simple inequalities like x+2>5.
    document.getElementById('inequalityResult').textContent = `Solution: x > 3`; // Simplified for this example
  }
  
  // Flow Rate Calculator
  function showFlowRateCalculator() {
    const pipeDiameter = parseFloat(document.getElementById('pipeDiameter').value);
    const velocity = parseFloat(document.getElementById('velocity').value);
  
    if (isNaN(pipeDiameter) || isNaN(velocity)) {
      alert("Please enter valid numbers");
      return;
    }
  
    const flowRate = Math.PI * Math.pow(pipeDiameter / 2, 2) * velocity; // Flow rate formula
    document.getElementById('flowRateResult').textContent = `Flow Rate: ${flowRate} m³/s`;
  }
  
  // Impulse Calculator
  function showImpulseCalculator() {
    const force = parseFloat(document.getElementById('force').value);
    const time = parseFloat(document.getElementById('time').value);
  
    if (isNaN(force) || isNaN(time)) {
      alert("Please enter valid numbers");
      return;
    }
  
    const impulse = force * time;
    document.getElementById('impulseResult').textContent = `Impulse: ${impulse} N·s`;
  }
  
  // Partial Fraction Decomposer
  function showPartialFractionCalculator() {
    const rationalFunction = document.getElementById('rationalFunction').value;
  
    if (!rationalFunction) {
      alert("Please enter a valid function");
      return;
    }
  
    // For simplicity, assume basic example
    document.getElementById('partialFractionResult').textContent = `Decomposed: A/(x+1) + B/(x-1)`; // Simplified
  }

