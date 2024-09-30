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
document.getElementById('bill').addEventListener('keypress', function(event) {
    const charCode = event.key.charCodeAt(0);

    if (!((charCode >= 48 && charCode <= 57) ||  
          charCode === 46 ||                     
          charCode === 44                        
    )) {
        event.preventDefault();
        showBillErrorMessage();
        disableButton(true);
    } else {
        hideBillErrorMessage();
        disableButton(false);
    }
});

document.getElementById('bill').addEventListener('input', function(event) {
    let value = this.value.replace(',', '.');
    let numValue = parseFloat(value);

    if (isNaN(numValue) || numValue < 0) {
        showBillErrorMessage();
        disableButton(true);
    } else {
        hideBillErrorMessage();
        disableButton(false);
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
 * COMPUTE THE TOTAL
 */

function computeTip() {
    const bill = parseFloat(document.getElementById("bill").value);
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