
let contactsData = [];
let selectedContactIndex = 0;


let selectedUserId = null;



window.onload = function() { 

    selectedUserId = JSON.parse(sessionStorage.getItem('selectedUserId'));

    fetchContacts(selectedUserId, '', false);
    

};

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

