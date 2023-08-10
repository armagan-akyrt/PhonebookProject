import { checkLogin, checkAdmin } from './Scripts/ClientFunctions.js';

let guestsData = [];
let selectedGuestIndex = 0;

let searchWord = "";
let companyName = "";
let startDate = "";
let endDate = "";
let isInside = document.getElementById('selectGuestType').value;




window.onload = function () {

    checkLogin();
    checkAdmin();

    let startDate = new Date();
    startDate.setUTCFullYear(startDate.getUTCFullYear() - 100);
    startDate = startDate.toISOString().replace('T', ' ').replace('Z', '');

    let endDate = new Date();
    endDate.setUTCFullYear(endDate.getUTCFullYear() + 100);
    endDate = endDate.toISOString().replace('T', ' ').replace('Z', '');
    fetchGuests('', startDate, endDate, '', '');
    isInside = document.getElementById('selectGuestType').value;

}

document.getElementById('selectGuestType').addEventListener('change', function () { 

    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);

});

document.getElementById('searchInputUsernameGuest').addEventListener('keyup', function () {
    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
});

document.getElementById('searchInputCompanyNameGuest').addEventListener('keyup', function () {
    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
});

document.getElementById('deleteGuest').addEventListener('click', function () {
    let selectedGuest = guestsData[selectedGuestIndex];

    fetch('/deleteGuest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({guestId: selectedGuest.id}),
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('getGuestCard').addEventListener('click', function () {
    let selectedGuest = guestsData[selectedGuestIndex];

    fetch('/obtainCard', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({guestId: selectedGuest.id, cardId: selectedGuest.cardId}),
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('guestApplyIntervalButton').addEventListener('click', function () {
    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
});

function setData() {
    isInside = document.getElementById('selectGuestType').value;
    if (isInside == 'true') {
        document.getElementById('guestCardSubmitDate').style.display = 'none';
        document.getElementById('labelForCardSubmitDate').style.display = 'none';
        document.getElementById('getGuestCard').style.display = 'block';

    } else {
        document.getElementById('guestCardSubmitDate').style.display = 'block';
        document.getElementById('labelForCardSubmitDate').style.display = 'block';
        document.getElementById('getGuestCard').style.display = 'none';

    }

    searchWord = document.getElementById('searchInputUsernameGuest').value;
    companyName = document.getElementById('searchInputCompanyNameGuest').value;

    startDate = document.getElementById('startIntervalGuest').value;
    startDate = (startDate == "") ? (new Date().getUTCFullYear() - 100): startDate;
    endDate = document.getElementById('endIntervalGuest').value;
    endDate = (endDate == "") ? (new Date().getUTCFullYear() + 100) : endDate;

}

function fetchGuests(searchWord, startDate, endDate, companyName, isInside) {
    fetch(`/getGuests?searchWord=${searchWord}&startDate=${startDate}&endDate=${endDate}&companyName=${companyName}&isInside=${isInside}`)
        .then(response => response.json())
        .then(data => {
            guestsData = data;
            console.log(data);

            let guestsList = document.getElementById('listToShowGuest');
            guestsList.innerHTML = '';

            data.guestsList.forEach(guest => { 
                let li = document.createElement('li');
                li.textContent = `${guest.name} ${guest.surname} - ${guest.companyName}`;
                guestsList.appendChild(li);

                li.addEventListener('click', function () { 
                    guestsData = data.guestsList;
                    selectedGuestIndex = data.guestsList.indexOf(guest);

                    document.getElementById('guestName').value = guest.name;
                    document.getElementById('guestSurname').value = guest.surname;
                    document.getElementById('guestCardId').value = guest.cardId;
                    document.getElementById('guestCompanyName').value = guest.companyName;
                    document.getElementById('guestVisitingUser').value = guest.visiting.id;
                    document.getElementById('guestVisitingUserFullName').value = `${guest.visiting.name} ${guest.visiting.surname}`;
                    document.getElementById('guestCardGrantDate').value = guest.cardAcquisitionDate.replace('T', ' ').replace('Z', '');
                    if (guest.cardSubmitDate != null)
                        document.getElementById('guestCardSubmitDate').value = guest.cardSubmitDate.replace('T', ' ').replace('Z', '');
                    

                });
            });

        })
        .catch(error => console.error('Error:', error));

    
}