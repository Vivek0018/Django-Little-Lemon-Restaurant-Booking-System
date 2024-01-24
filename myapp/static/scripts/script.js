const form = document.querySelector('form');
const nameField = document.querySelector('#name');
const dateInputElement = document.querySelector('input#date');
const timeSelectElement = document.querySelector('#hourSelect');
const subC = document.querySelector('.sub-c');
const responseHeader = document.querySelector('#response h2');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(nameField.value == '' || dateInputElement.value == '' || timeSelectElement.value == ''){
        window.alert('Please Fill all the Details !');
    }else{
        fetch(`book?name=${nameField.value}&date=${dateInputElement.value}&time=${timeSelectElement.value}`)
            .then((data) => data.json())
            .then((res) => {
                responseHeader.innerText = res['message'];
                responseHeader.parentElement.style.display = 'block';
            })
    }
})
dateInputElement.addEventListener('input', () => {
    let value = dateInputElement.value;
    if(value == dateInputElement.getAttribute('min')){
        setTimeOptions(true);
    }else{
        setTimeOptions(false);
    }
    fetch(`/bookings?date=${value}`)
        .then((data) => data.json())
        .then((res) => {
            subC.innerHTML = ``;
            let h2 = document.createElement('h2');
            h2.innerText = `Bookings for ${value}`;
            if(res.length === 0){
                h2.innerText = `No Bookings for ${value}`;
            }
            let bookingsDetails = document.createElement('div');
            bookingsDetails.classList.add('bookings-details');
            for(let i = 0; i < res.length; i ++){
                let newEle = document.createElement('p');
                newEle.innerText = `${res[i]['fields']['name']} - ${Number(res[i]['fields']['reservation_slot']) <= 12 ? Number(res[i]['fields']['reservation_slot']) : Number(res[i]['fields']['reservation_slot']) - 12 } ${Number(res[i]['fields']['reservation_slot']) <= 12 ? 'AM' : 'PM'}`
                bookingsDetails.appendChild(newEle);
            }
            subC.appendChild(h2);
            subC.appendChild(bookingsDetails);
        })
})

function setTimeOptions(isToday){
    let lowerLimit;
    if(!isToday){
      lowerLimit = 1;  
    }else{
        let today = new Date();
        if(today.getMinutes() != 0)
            lowerLimit = today.getHours() + 1;
        else
            lowerLimit = today.getHours();
    }
    // lowerLimit = today.getHours();
    timeSelectElement.innerHTML = '';
    for(let i = lowerLimit;i <= 24; i++){
        let option = document.createElement('option');
        option.setAttribute('value', i);
        option.innerText = i <= 12 ? i + ' AM' : i - 12 + ' PM';
        timeSelectElement.appendChild(option);
    }
}


let today = new Date();
let dd = today.getDate();
let mm = today.getMonth() + 1;

let yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd;
} 

if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
dateInputElement.setAttribute("min", today);
dateInputElement.setAttribute('value', today);
setTimeOptions(true);