const radios = [...document.querySelectorAll('input[type="radio"]')]
const tipPerPersonDisplay = document.getElementById('tip-per-person-display')
const totalPerPersonDisplay = document.getElementById('total-per-person-display')

function calculateTip(bill, tipPercent) {
    return bill * tipPercent
}

function splitTip(tipToBeSplit, numberOfPeople = 1) {
    if (numberOfPeople < 1) return tipToBeSplit
    return tipToBeSplit / numberOfPeople
}

function splitBill(bill, numberOfPeople = 1, splitTipAmount) {
    if (numberOfPeople < 1) return bill + splitTipAmount
    return (bill / numberOfPeople) + splitTipAmount
}

function isChecked(input) {
    return input.checked
}

function resetDisplay(element) {
    element.textContent = '$0.00'
}

function setDisplay(element, data) {
    element.textContent = `$${data.toFixed(2)}`
}


const form = document.querySelector('form')

form.addEventListener('change', (e) => {
    const bill = Number(document.getElementById('bill-amount').value)
    const tipPercent = radios.find(isChecked).value / 100 //come back here for some error handling
    const numberOfPeople = Number(document.getElementById('number-of-people').value)

    resetDisplay(tipPerPersonDisplay)
    resetDisplay(totalPerPersonDisplay)

    const tipAmount = calculateTip(bill, tipPercent)
    const tipPerPerson = splitTip(tipAmount, numberOfPeople)
    const totalPerPerson = splitBill(bill, numberOfPeople, tipPerPerson)

    setDisplay(tipPerPersonDisplay, tipPerPerson)
    setDisplay(totalPerPersonDisplay, totalPerPerson)

})

const resetBtn = document.getElementById('reset-button')

resetBtn.addEventListener('click', (e) => {
    resetDisplay(tipPerPersonDisplay)
    resetDisplay(totalPerPersonDisplay)
})