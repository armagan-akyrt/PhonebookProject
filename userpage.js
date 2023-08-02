
import { fetchContacts, updateContact, softDeleteContact } from './Scripts/ClientFunctionsContact.js';
import { checkLogin } from './Scripts/ClientFunctions.js';
import { fetchMeetings } from './Scripts/ClientFunctionsMeeting.js';

let currentUser = null;

window.onload = function() { 
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    checkLogin();

    let startInterval = new Date().getUTCFullYear() - 100;
    let endInterval = new Date().getUTCFullYear() + 100;
    
    fetchMeetings('', true, startInterval, endInterval, currentUser.id);

    let currUsr = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currUsr.role == "USER") {
        document.getElementById('adminBar').style.display = "none";
    }
        
    
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