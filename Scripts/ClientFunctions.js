

// In contactsAPI.js
function fetchContacts(userId, contactSearchWord, isActive, callback) {
    fetch(`/getContacts?userId=${userId}&searchWord=${contactSearchWord}&isActive=${isActive}`)
        .then(response => response.json())
        .then(data => {
            callback(data); // Call the callback function with the data as argument
        })
        .catch(error => console.error('Error:', error));
}

function updateContact(contactPrompts) {
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