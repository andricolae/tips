/***********************************
 * FUNCTIONS FOR THE TIP CALCULATOR
 ***********************************/

/*
 * SHOW CUSTOM TIP INPUT
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
 * VALIDATE THE CUSTOM TIP PERCENTAGE
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
document.getElementById('bill').addEventListener('keypress', function(event) {
    const charCode = event.key.charCodeAt(0);

    if (!((charCode >= 48 && charCode <= 57) || charCode === 46)) {
        event.preventDefault();
        showBillErrorMessage();
        disableButton(true);
    } else {
        hideBillErrorMessage();
        disableButton(false);
    }
});
*/

/*
 * VALIDATE THE BILL AMOUNT
 */
document.getElementById('bill').addEventListener('keypress', function(event) {
    const charCode = event.key.charCodeAt(0);
    const inputValue = this.value;

    if (!((charCode >= 48 && charCode <= 57) || charCode === 46)) {
        event.preventDefault();
        showBillErrorMessage();
        disableButton(true);
    } else {
        if (charCode === 46 && inputValue.includes('.')) {
            event.preventDefault();
            showBillErrorMessage();
            disableButton(true);
        } else if (inputValue.includes('.')) {
            const decimalPart = inputValue.split('.')[1];
            if (decimalPart && decimalPart.length >= 2) {
                event.preventDefault();
                showBillErrorMessage();
                disableButton(true);
            } else {
                hideBillErrorMessage();
                disableButton(false);
            }
        } else {
            hideBillErrorMessage();
            disableButton(false);
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

/*
 * BILL THOUSANDS SEPARATOR
 */
document.getElementById('bill').addEventListener('input', function (event) {
    const cursorPosition = this.selectionStart;

    let input = this.value.replace(/,/g, '');

    if (isNaN(input) || input === '') {
        return;
    }

    let parts = input.split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    this.value = integerPart + decimalPart;

    const newCursorPosition = cursorPosition + (this.value.length - input.length);
    this.setSelectionRange(newCursorPosition, newCursorPosition);
});

/*
 * FLOAT NUMBER PARSER
 */
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
 * COMPUTE THE TIP AND TOTAL AMOUNT
 */
function computeTip() {
    /*const bill = parseFloat(document.getElementById("bill").value);*/
    const bill = parseFormattedNumber(document.getElementById('bill').value)
    const tipOption = document.getElementById("tipOption").value;
    let tipPercent;

    if (tipOption === "custom") {
        tipPercent = parseFloat(document.getElementById("customTip").value);
        let x = document.getElementById("custonTip");

        if (x = "") {
            showTipErrorMessage();
            disableButton(true);
        }
        return;
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

/******************************************
 * FUNCTIONS FOR THE RANDOM PAYER GENERATOR
 ******************************************/

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
    document.getElementById('insertedItems').innerHTML = myArray;
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
