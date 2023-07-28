
let currentUser = null;

let contactsData = [];
let selectedContactIndex = 0;

fetch('/userdata').then(response => response.json())
.then(data => {

    currentUser = data;

    if (currentUser.id == 0) {
        window.location.href = '/index.html';
    }


    console.log(currentUser);

    fetchContacts(currentUser.id, '');

});

document.getElementById('searchInputContact').addEventListener('keyup', function() {
    let searchWord = document.getElementById('searchInputContact').value;
    fetchContacts(currentUser.id, searchWord);
});

function fetchContacts(userId, contactSearchWord) {
    fetch(`/getContacts?userId=${userId}&searchWord=${contactSearchWord}`)
        .then(response => response.json())
        .then(data => {
            let contactList = document.getElementById('listToShowContact');
            contactList.innerHTML = ''; // Clear the list before displaying new results

            data.contactsList.forEach(contact => {
                let li = document.createElement('li');
                li.textContent = `${contact.name} ${contact.surname}`; 
                contactList.appendChild(li);

                li.addEventListener('click', function() {
                    contactsData = data.contactsList
                    selectedContactIndex = data.contactsList.indexOf(contact);

                    // Call fetchContacts when a user item is clicked
                    document.getElementById('contactFirstName').value = contact.name;
                    document.getElementById('contactLastName').value = contact.surname;
                    document.getElementById('contactGsmNum').value = contact.phoneNumber;
                    document.getElementById('contactEmail').value = contact.email;
                    document.getElementById('contactAdress').value = contact.address;
                });
            });
        })
        .catch(error => console.error('Error:', error));
}