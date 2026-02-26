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

form.addEventListener('input', (e) => {
    const bill = Number(document.getElementById('bill-amount').value)
    let tipPercent //= radios.find(isChecked).value / 100 //come back here for some error handling
    if (radios.find(isChecked).value === 'custom') {
        tipPercent = prompt('Please enter a custom tip')
        tipPercent = Number(input / 100)
    } else if (!radios.find(isChecked)) {
        alert('You must choose a valid option')
    } else {
        tipPercent = radios.find(isChecked).value / 100
    }
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