
let contactsData = [];
let selectedContactIndex = -1;

export function fetchContacts(userId, contactSearchWord, isActive) {
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

export function updateContact() {
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
}

export function softDeleteContact() {
    const selectedContact = contactsData[selectedContactIndex]

    let contactId = selectedContact.id;

    fetch('/softDeleteContact', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'contactId': contactId })
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

}