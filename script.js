


function init() {
    const radios = [...document.querySelectorAll('input[type="radio"]')]
    const tipPerPersonDisplay = document.getElementById('tip-per-person-display')
    const totalPerPersonDisplay = document.getElementById('total-per-person-display')
    const customTipLabel = document.querySelector('.input__label--custom')
    const tipModal = document.getElementById('tip-modal')
    const tipModalForm = document.getElementById('tip-modal-form')
    const modalBtn = document.getElementById('modal-button')
    let bill = Number(document.getElementById('bill-amount').value)
    let tipPercent
    let numberOfPeople = Number(document.getElementById('number-of-people').value)
    

    tipModal.addEventListener('close', (e) => {
        if (Number(tipModal.querySelector('input').value ) > 100 || Number(tipModal.querySelector('input').value ) < 1) {
            document.querySelector('.error-msg-tip').classList.remove('hidden')
            customTipLabel.classList.add('error')
        } else {
            document.querySelector('.error-msg-tip').classList.add('hidden')
            customTipLabel.classList.remove('error')
            tipPercent = Number(tipModal.querySelector('input').value ) / 100
            resetDisplay(tipPerPersonDisplay)
            resetDisplay(totalPerPersonDisplay)

            //calculates tip and bill split and stores the value
            const tipAmount = calculateTip(bill, tipPercent)
            const tipPerPerson = splitTip(tipAmount, numberOfPeople)
            const totalPerPerson = splitBill(bill, numberOfPeople, tipPerPerson)

            //sets the dom
            setDisplay(tipPerPersonDisplay, tipPerPerson)
            setDisplay(totalPerPersonDisplay, totalPerPerson)
        }
            
    })

    const form = document.querySelector('form')

    form.addEventListener('input', (e) => {
        
        //reads the value of the bill element to use in calculations
        bill = Number(document.getElementById('bill-amount').value)

        //figures out the tip percent based on which radio is selected in the dom, if its custom, open the modal and grab input
        if (radios.find(isChecked).value === 'custom') {
            tipModal.showModal()
        } else if (!radios.find(isChecked)) {
            alert('You must choose a valid option')
        } else {
            tipPercent = radios.find(isChecked).value / 100
        }

        //reads the value of the number of people to split bill buy for use in calculations
        numberOfPeople = Number(document.getElementById('number-of-people').value)
        if (numberOfPeople === 0) {
            document.querySelector('.input__group--splitter').classList.add('error')
            document.querySelector('.error-msg').classList.remove('hidden')
        } else {
            document.querySelector('.input__group--splitter').classList.remove('error')
            document.querySelector('.error-msg').classList.add('hidden')
        }
        //clears the dom
        resetDisplay(tipPerPersonDisplay)
        resetDisplay(totalPerPersonDisplay)

        //calculates tip and bill split and stores the value
        const tipAmount = calculateTip(bill, tipPercent)
        const tipPerPerson = splitTip(tipAmount, numberOfPeople)
        const totalPerPerson = splitBill(bill, numberOfPeople, tipPerPerson)

        //sets the dom
        setDisplay(tipPerPersonDisplay, tipPerPerson)
        setDisplay(totalPerPersonDisplay, totalPerPerson)

    })

    //grab button and reset dom back to default state
    const resetBtn = document.getElementById('reset-button')

    resetBtn.addEventListener('click', (e) => {
        resetDisplay(tipPerPersonDisplay)
        resetDisplay(totalPerPersonDisplay)
    })


}


init()




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