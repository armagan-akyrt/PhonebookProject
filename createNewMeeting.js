import { checkLogin } from "./Scripts/ClientFunctions.js";
import { fetchUsers } from "./Scripts/ClientFunctionsUser.js";
import { fetchContacts } from './Scripts/ClientFunctionsContact.js';

let currentUser = null;
window.onload = function() {

    checkLogin();
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    fetchContacts(currentUser.id, '', true);
}

document.getElementById('searchInputContact').addEventListener('keyup', function() {
    let searchWord = document.getElementById('searchInputContact').value;


    fetchContacts(currentUser.id, searchWord, true);
});

document.getElementById('createMeetingButton').addEventListener('click', function(event) {
    document.getElementById('userId').value = currentUser.id;
    document.getElementById('contactId').value = sessionStorage.getItem('selectedContactId');

});




