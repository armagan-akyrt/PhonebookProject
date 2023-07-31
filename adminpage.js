
import { fetchUsers, updateUser, softDeleteUser } from './Scripts/ClientFunctionsUser.js'

import { fetchContacts, updateContact, softDeleteContact } from './Scripts/ClientFunctionsContact.js';

let currentUser = null;

let selectedUserId = 0;


document.getElementById('listToShowUser').addEventListener('click', function(event) {
    if (event.target && event.target.nodeName === 'LI') {  // Check if a list item was clicked
        let userId = sessionStorage.getItem('selectedUserId');  // Get the ID of the selected user
        fetchContacts(userId, '', true);  // Call fetchContacts with the user ID
    }
});

document.getElementById('deleteContactButton').addEventListener('click', function (event) {
    event.preventDefault();
    softDeleteContact();
});

document.getElementById('updateContactButton').addEventListener('click', function (event) {
    event.preventDefault();
    updateContact();
});

// Attacch the softDeleteUser function to the button's click event
document.getElementById('deleteUserButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from being submitted normally
    softDeleteUser();
});

// Attach the updateUser function to the button's click event
document.getElementById('updateUserButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the form from being submitted normally
    updateUser();
});

document.getElementById('searchInputUser').addEventListener('keyup', function () {
    let searchWord = document.getElementById('searchInputUser').value;
    fetchUsers(searchWord, true);
});

document.getElementById('searchInputContact').addEventListener('keyup', function () {
    let userId = sessionStorage.getItem('selectedUserId');
    let searchWord = document.getElementById('searchInputContact').value;
    fetchContacts(userId, searchWord, true);
});


window.addEventListener('load', function () {
    fetchUsers('', true); // Fetch all users on load
});

