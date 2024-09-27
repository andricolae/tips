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

function computeTip() {
    const bill = parseFloat(document.getElementById("bill").value);
    const tipOption = document.getElementById("tipOption").value;
    let tipPercent;

    if (tipOption === "custom") {
        tipPercent = parseFloat(document.getElementById("customTip").value);
    } else {
        tipPercent = parseFloat(tipOption);
    }

    if (isNaN(bill) || bill <= 0) {
        alert("Bill Amount is NOT VALID!");
        return;
    }

    if (isNaN(tipPercent) || tipPercent < 0) {
        alert("Tip Percentage is NOT VALID!");
        return;
    }

    const tipAmount = bill * (tipPercent / 100);
    const total = bill + tipAmount;

    document.getElementById("initialAmount").innerText = `INITIAL AMOUNT: ${bill.toFixed(2)} lei`;
    document.getElementById("tipAmount").innerText = `TIP AMOUNT: ${tipAmount.toFixed(2)} lei`;
    document.getElementById("total").innerText = `TOTAL: ${total.toFixed(2)} lei`;
}   

function resetForm() {
    document.getElementById("bill").value = "";
    document.getElementById("tipOption").value = "0";
    document.getElementById("customTip").style.display = "none";
    document.getElementById("customTip").value = "";

    document.getElementById("initialAmount").innerText = "INITIAL AMOUNT: -";
    document.getElementById("tipAmount").innerText = "TIP AMOUNT: -";
    document.getElementById("total").innerText = "TOTAL: -";
}