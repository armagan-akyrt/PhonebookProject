import { checkLogin } from "./Scripts/ClientFunctions.js";


let contactsData = [];
let selectedContactIndex = 0;


let selectedUserId = null;



window.onload = function() { 

    checkLogin();
    selectedUserId = JSON.parse(sessionStorage.getItem('selectedUserId'));

    fetchContacts(selectedUserId, '', false);
    

};

document.getElementById('searchInputContact').addEventListener('keyup', function() {
    let searchWord = document.getElementById('searchInputContact').value;
    fetchContacts(selectedUserId, searchWord, false);
});

document.getElementById('updateContactButton').addEventListener('click', function(event) {
    event.preventDefault();
    updateAndBringContact();
});

document.getElementById('deleteContactButton').addEventListener('click', function(event) {
    event.preventDefault();
    hardDeleteContact();
});

function fetchContacts(userId, contactSearchWord, isActive) {
    fetch(`/getContacts?userId=${userId}&searchWord=${contactSearchWord}&isActive=${isActive}`)
        .then(response => response.json())
        .then(data => {
            let contactList = document.getElementById('listToShowContact');
            contactList.innerHTML = ''; // Clear the list before displaying new results

            data.contactsList.forEach(contact => {
                let li = document.createElement('li');
                li.textContent = `${contact.name} ${contact.surname}`;
                contactList.appendChild(li);

                li.addEventListener('click', function () {
                    contactsData = data.contactsList
                    selectedContactIndex = data.contactsList.indexOf(contact);

                    // Call fetchContacts when a user item is clicked
                    document.getElementById('contactFirstName').value = contact.name;
                    document.getElementById('contactLastName').value = contact.surname;
                    document.getElementById('contactGsmNum').value = contact.phoneNumber;
                    document.getElementById('contactEmail').value = contact.email;
                    document.getElementById('contactAddress').value = contact.address;
                });
            });
        })
        .catch(error => console.error('Error:', error));
}

function updateAndBringContact() {
    const selectedContact = contactsData[selectedContactIndex]

    const contactData = {
        id: selectedContact.id,
        username: selectedContact.username,
        name: document.getElementById('contactFirstName').value,
        surname: document.getElementById('contactLastName').value,
        gsmNum: document.getElementById('contactGsmNum').value,
        email: document.getElementById('contactEmail').value,
        address: document.getElementById('contactAddress').value,
    };

    fetch('/updateContact', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData),
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    fetch('/bringContact', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contactId: selectedContact.id}),
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

}

function hardDeleteContact() {

    const selectedContact = contactsData[selectedContactIndex]

    fetch('/hardDeleteContact', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contactId: selectedContact.id,
                              userId: selectedUserId}),
    })
    .then(response => response.json())
    .then(data => {

        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
