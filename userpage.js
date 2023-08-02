
import { fetchContacts, updateContact, softDeleteContact } from './Scripts/ClientFunctionsContact.js';
import { checkLogin } from './Scripts/ClientFunctions.js';
import { fetchMeetings, updateMeeting, softDeleteMeeting } from './Scripts/ClientFunctionsMeeting.js';

let currentUser = null;
let startInterval = new Date();
let endInterval = new Date();

window.onload = function() { 
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    checkLogin();

    startInterval.setUTCFullYear(startInterval.getUTCFullYear() - 100);
    startInterval = startInterval.toISOString().replace('T', ' ').replace('Z', '');

    endInterval.setUTCFullYear(endInterval.getUTCFullYear() + 100);
    endInterval = endInterval.toISOString().replace('T', ' ').replace('Z', '');
    
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

document.getElementById('searchInputMeeting').addEventListener('keyup', function() {
    let searchWord = document.getElementById('searchInputMeeting').value;
    fetchMeetings(searchWord, true, startInterval, endInterval, currentUser.id);
});

document.getElementById('updateMeetingButton').addEventListener('click', function(event) {
    event.preventDefault();
    updateMeeting();
});

document.getElementById('deleteMeetingButton').addEventListener('click', function(event) {
    event.preventDefault();
    softDeleteMeeting();
});