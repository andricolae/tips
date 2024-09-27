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

function calculeazaBacsis() {
    const notaPlata = parseFloat(document.getElementById("notaPlata").value);
    const tipOption = document.getElementById("tipOption").value;
    let tipPercent;

    if (tipOption === "custom") {
        tipPercent = parseFloat(document.getElementById("customTip").value);
    } else {
        tipPercent = parseFloat(tipOption);
    }

    if (isNaN(notaPlata) || notaPlata <= 0) {
        alert("Vă rugăm să introduceți o sumă validă pentru nota de plată.");
        return;
    }

    if (isNaN(tipPercent) || tipPercent < 0) {
        alert("Vă rugăm să introduceți un procent valid pentru bacșiș.");
        return;
    }

    const valoareBacsis = (notaPlata * tipPercent) / 100;
    const totalFinal = notaPlata + valoareBacsis;

    document.getElementById("sumaInitiala").innerText = `Suma inițială: ${notaPlata.toFixed(2)} lei`;
    document.getElementById("valoareBacsis").innerText = `Valoarea bacșișului: ${valoareBacsis.toFixed(2)} lei`;
    document.getElementById("totalFinal").innerText = `Total: ${totalFinal.toFixed(2)} lei`;
}

function resetForm() {
    document.getElementById("notaPlata").value = "";
    document.getElementById("tipOption").value = "0";
    document.getElementById("customTip").style.display = "none";
    document.getElementById("customTip").value = "";

    document.getElementById("sumaInitiala").innerText = "Suma inițială: -";
    document.getElementById("valoareBacsis").innerText = "Valoarea bacșișului: -";
    document.getElementById("totalFinal").innerText = "Total: -";
}