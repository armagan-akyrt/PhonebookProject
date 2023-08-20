
import { checkLogin, checkAdmin } from './Scripts/ClientFunctions.js';

let guestsData = [];
let selectedGuestIndex = 0;

// Function to fetch guests based on filter criteria
function fetchGuests(searchWord, startDate, endDate, companyName, isInside) {
    // Assuming an API endpoint exists to fetch guests based on the criteria
    fetch(`/getguests?searchWord=${searchWord}&startDate=${startDate}&endDate=${endDate}&companyName=${companyName}&isInside=${isInside}`)
    .then(response => response.json())
    .then(data => {
        guestsData = data.guestsList;
        renderGuests(data);
    })
    .catch(error => console.error('Error fetching guests:', error));

}

// Function to render guests in a table
function renderGuests(data) {
    const tbody = document.getElementById('gridBody');
    tbody.innerHTML = '';
    data.guestsList.forEach(item => {
        tbody.innerHTML += renderRow(item, item.id);
    });
}

// Function to generate a table row for a guest
function renderRow(item, index) {
    return `
        <tr data-id="${index}">
            <td>${item.name}</td>
            <td>${item.surname}</td>
            <td>${item.companyName}</td>
            <td>${item.cardId}</td>
            <td>${item.cardAcquisitionDate}</td>
            <td>${item.cardSubmitDate}</td>
            <td>${item.visiting.name + ' ' + item.visiting.surname}</td>

        </tr>
    `;
}

function setData() {
    // You can add other filter fields here as needed
    let startDate = document.getElementById('startDateFilter').value;
    let endDate = document.getElementById('endDateFilter').value;

    let guestState = document.getElementById('guestStateFilter').value;
    let isInside = guestState === 'false';

    const companyName = document.getElementById('companyFilter').value;
    const searchWord = document.getElementById('usernameFilter').value;

    if (startDate == '') {  
        startDate = new Date(2020, 0, 1);
    }

    if (endDate == '') {
        endDate = new Date();
    }

    if (startDate > endDate) 
    {
        alert("Kart alım tarihi kart teslim tarihinden önce olamaz!");
        return;
    }

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
}

// Initialize the page after load
window.onload = function() {
    checkLogin();
    checkAdmin();

    // please write today - 1 year below
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

    let guestState = document.getElementById('guestStateFilter').value;
    let isInside = guestState === 'false';


    fetchGuests('', oneYearAgo, today, '', isInside);
}


document.getElementById('filterButton').addEventListener('click', function() {
    setData();

});

document.getElementById('getGuestCard').addEventListener('click', function() {
    const selectedGuest = guestsData[selectedGuestIndex];
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
        if (data.success) {
            alert('Kart başarıyla teslim alındı!');
        } else {
            console.error('Kart teslim alınamadı:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));

});

document.getElementById('deleteGuest').addEventListener('click', function() {
    // Delete guest logic; this can be expanded based on the backend API structure
    const selectedGuest = guestsData[selectedGuestIndex];
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
        if (data.success) {
            // Handle successful deletion, e.g., remove the guest from the list and re-render
        } else {
            console.error('Misafir silinirken bir hata meydana geldi:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Additional logic and event listeners can be added as required

document.addEventListener('DOMContentLoaded', function() {
    const tbody = document.getElementById('gridBody');

    // Attaching the event listener to the table body
    tbody.addEventListener('click', function(event) {
        let target = event.target;
        while (target && target.tagName !== 'TR') {
            target = target.parentElement;
        }

        if (target && target.dataset.id !== undefined) {
            // Retrieve the guest data using the data-id attribute
            const guestId = target.dataset.id;
            const guest = guestsData.find(g => g.id == guestId);
            
            if (guest) {
                // Populate the details in the right panel
                document.getElementById('guestName').value = guest.name;
                document.getElementById('guestSurname').value = guest.surname;
                document.getElementById('guestCompanyName').value = guest.companyName;
                document.getElementById('guestCardId').value = guest.cardId;
                document.getElementById('guestVisitingUser').value = guest.visitingUser;
                document.getElementById('guestVisitingUserFullName').value = guest.visiting.name + ' ' + guest.visiting.surname;
                document.getElementById('guestCardGrantDate').value = guest.cardAcquisitionDate.replace('T', ' ').replace('Z', '');
                document.getElementById('guestCardSubmitDate').value = guest.cardSubmitDate.replace('T', ' ').replace('Z', '');
            }
        }
    });
});

