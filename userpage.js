
import { fetchContacts, updateContact, softDeleteContact } from './Scripts/ClientFunctionsContact.js';

let currentUser = null;



fetch('/userdata').then(response => response.json())
.then(data => {

    currentUser = data;

    let currUsr = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser.id == 0) {
        window.location.href = '/index.html';
    } 

    console.log(currentUser);

    fetchContacts(currentUser.id, '', true);

});

document.getElementById('searchInputContact').addEventListener('keyup', function() {
    let searchWord = document.getElementById('searchInputContact').value;
    fetchContacts(currentUser.id, searchWord, true);
});

document.getElementById('updateContactButton').addEventListener('click', function(event) {
    event.preventDefault();
    updateContact();
});

document.getElementById('deleteContactButton').addEventListener('click', function(event) {
    event.preventDefault();
    softDeleteContact();
});