
import { fetchContacts, updateContact, softDeleteContact } from './Scripts/ClientFunctionsContact.js';
import { checkLogin } from './Scripts/ClientFunctions.js';

let currentUser = null;

window.onload = function() { 
    checkLogin();
}

function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

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