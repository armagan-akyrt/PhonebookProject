
import { checkLogin, checkAdmin } from './Scripts/ClientFunctions.js';

let guestsData = [];
let selectedGuestIndex = 0;

// Function to fetch guests based on filter criteria
function fetchGuests(searchWord, startDate, endDate, companyName, isInside) {
    // Assuming an API endpoint exists to fetch guests based on the criteria
    fetch(`/getguests?searchWord=${searchWord}&startDate=${startDate}&endDate=${endDate}&companyName=${companyName}&isInside=${isInside}`)
    .then(response => response.json())
    .then(data => {
        guestsData = data;
        renderGuests(data);
    })
    .catch(error => console.error('Error fetching guests:', error));
}

// Function to render guests in a table
function renderGuests(data) {
    const tbody = document.getElementById('gridBody');
    tbody.innerHTML = '';
    data.guestsList.forEach(item => {
        tbody.innerHTML += renderRow(item);
    });
}

// Function to generate a table row for a guest
function renderRow(item) {
    return `
        <tr>
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

// Function to set data from filter fields
function setData() {
    const searchWord = document.getElementById('usernameFilter').value;
    const companyName = document.getElementById('companyNameFilter').value;
    // You can add other filter fields here as needed

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
}

// Initialize the page after load
window.onload = function() {
    checkLogin();
    checkAdmin();

    // please write today - 1 year below
    const today = new Date();
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    fetchGuests('', oneYearAgo, today, '', '');
}

// Event listeners for filter fields
document.getElementById('usernameFilter').addEventListener('keyup', setData);
document.getElementById('companyNameFilter').addEventListener('keyup', setData);
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
            console.error('Error deleting guest:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Additional logic and event listeners can be added as required
