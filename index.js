/*
 * FUNCTIONS FOR THE TIP CALCULATOR 
 */

function toggleCustomInput() {
    const tipOption = document.getElementById("tipOption").value;
    const customTipInput = document.getElementById("customTip");
    if (tipOption === "custom") {
        customTipInput.style.display = "block";
    } else {
        customTipInput.style.display = "none";
        customTipInput.value = "";
    }
}

/*
 * VALIDATE THE TIP PERCENTAGE
 */

document.getElementById('customTip').addEventListener('keypress', function(event) {
    const charCode = event.key.charCodeAt(0);

    if (!((charCode >= 48 && charCode <= 57) ||  
          charCode === 46 ||                     
          charCode === 44                        
    )) {
        event.preventDefault();
        showTipErrorMessage();
        disableButton(true);
    } else {
        hideTipErrorMessage();
        disableButton(false);
    }
});

document.getElementById('customTip').addEventListener('input', function(event) {
    let value = this.value.replace(',', '.');
    let numValue = parseFloat(value);

    if (isNaN(numValue) || numValue < 0.1 || numValue > 100) {
        showTipErrorMessage();
        disableButton(true);
    } else {
        hideTipErrorMessage();
        disableButton(false);
    }
});

function showTipErrorMessage() {
    document.getElementById('errorTip').style.display = 'block';
}

function hideTipErrorMessage() {
    document.getElementById('errorTip').style.display = 'none';
}

function disableButton(disable) {
    document.getElementById('compute').disabled = disable;
}

/*
 * VALIDATE THE BILL AMOUNT
 */
// document.getElementById('bill').addEventListener('keypress', function(event) {
//     const charCode = event.key.charCodeAt(0);

//     if (!((charCode >= 48 && charCode <= 57) || charCode === 46)) {
//         event.preventDefault();
//         showBillErrorMessage();
//         disableButton(true);
//     } else {
//         hideBillErrorMessage();
//         disableButton(false);
//     }
// });



document.getElementById('bill').addEventListener('keypress', function(event) {
    const charCode = event.key.charCodeAt(0);
    const inputValue = this.value;

    // Check if the key pressed is a number (0-9) or a decimal point (.)
    if (!((charCode >= 48 && charCode <= 57) || charCode === 46)) {
        event.preventDefault();
        showBillErrorMessage();
        disableButton(true);
    } else {
        // Check if the user tries to insert a second decimal point
        if (charCode === 46 && inputValue.includes('.')) {
            event.preventDefault();  // Prevent inserting a second decimal point
            showBillErrorMessage();  // Show the error message
            disableButton(true);     // Disable the button if there's an error
        } else if (inputValue.includes('.')) {
            // If a decimal point already exists, check if the user is trying to insert more than 2 digits after the decimal
            const decimalPart = inputValue.split('.')[1];
            if (decimalPart && decimalPart.length >= 2) {
                event.preventDefault();  // Prevent more than 2 decimal digits
                showBillErrorMessage();  // Show the error message for too many decimal places
                disableButton(true);     // Disable the button
            } else {
                hideBillErrorMessage();  // Hide the error message
                disableButton(false);    // Enable the button
            }
        } else {
            hideBillErrorMessage();  // Hide the error message for valid input
            disableButton(false);    // Enable the button for valid input
        }
    }
});


function showBillErrorMessage() {
    document.getElementById('errorBill').style.display = 'block';
}

function hideBillErrorMessage() {
    document.getElementById('errorBill').style.display = 'none';
}

function disableButton(disable) {
    document.getElementById('compute').disabled = disable;
}












document.getElementById('bill').addEventListener('input', function (event) {
    // Save the cursor position before formatting
    const cursorPosition = this.selectionStart;

    // Get the input value and remove any existing commas
    let input = this.value.replace(/,/g, '');

    // If input is not a valid number, prevent formatting
    if (isNaN(input) || input === '') {
        return;
    }

    // Split the input into integer and decimal parts
    let parts = input.split('.');
    let integerPart = parts[0];  // Integer part of the number
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';  // Decimal part if any

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the formatted integer part and decimal part
    this.value = integerPart + decimalPart;

    // Restore the cursor position after formatting
    const newCursorPosition = cursorPosition + (this.value.length - input.length);
    this.setSelectionRange(newCursorPosition, newCursorPosition);
});



function parseFormattedNumber(input) {
    let cleanedInput = input.replace(/,/g, '');

    let parsedNumber = parseFloat(cleanedInput);

    if (isNaN(parsedNumber)) {
        showBillErrorMessage();
        return 0;
    }
    return parsedNumber;
}















/*
 * COMPUTE THE TOTAL
 */

function computeTip() {
    //const bill = parseFloat(document.getElementById("bill").value);
    const bill = parseFormattedNumber(document.getElementById('bill').value)
    const tipOption = document.getElementById("tipOption").value;
    let tipPercent;

    if (tipOption === "custom") {
        tipPercent = parseFloat(document.getElementById("customTip").value);
    } else {
        tipPercent = parseFloat(tipOption);
    }

    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;

    document.getElementById("tipAmount").innerText = `TIP AMOUNT: ${tipAmount.toFixed(2)} lei`;
    document.getElementById("total").innerText = `TOTAL: ${total.toFixed(2)} lei`;

    document.getElementById("bill").value = "";
    document.getElementById("tipOption").value = "0";
    document.getElementById("customTip").style.display = "none";
    document.getElementById("customTip").value = "";
}   

function resetForm() {
    document.getElementById("bill").value = "";
    document.getElementById("tipOption").value = "0";
    document.getElementById("customTip").style.display = "none";
    document.getElementById("customTip").value = "";
    document.getElementById("tipAmount").innerText = "TIP AMOUNT: 0.00";
    document.getElementById("total").innerText = "TOTAL: 0.00";
    disableButton(false);
    hideBillErrorMessage();
    hideErrorMessage();
    hideTipErrorMessage();
}

/*
 * FUNCTIONS FOR THE RANDOM PAYER GENERATOR 
 */

let myArray = [];
const input = document.getElementById('payer');
const errorMessage = document.getElementById('errorMessage');

input.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        addToArray();
        input.placeholder = '✔ ADDED! INSERT NEXT';
    }
});

input.addEventListener('keypress', function(event) {
    const charCode = event.key.charCodeAt(0);

    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122))) {
        event.preventDefault();
        showErrorMessage();
    } else {
        hideErrorMessage();
    }
});

function showErrorMessage() {
    errorMessage.style.display = 'block';
    setTimeout(function() {
        errorMessage.style.display = 'none';
    }, 2000);
}
function hideErrorMessage() {
    errorMessage.style.display = 'none';
}

function addToArray() {
    const inputValue = input.value.trim();
    if (inputValue) {
        myArray.push(inputValue);
        input.value = '';
        /*console.log('Array-ul curent: ' + JSON.stringify(myArray));*/
    }
}

function chooseLuckyPayer() {
    if (myArray.length > 0) {
        const randomIndex = Math.floor(Math.random() * myArray.length);
        const randomItem = myArray[randomIndex];
        selectedItem.textContent = randomItem;
        selectedItem.classList.remove('fadeIn');
        void selectedItem.offsetWidth;
        selectedItem.classList.add('fadeIn');
    } else {
        selectedItem.textContent = 'NU SUNT PERSOANE INTRODUSE';
    }
    input.placeholder = '';
}