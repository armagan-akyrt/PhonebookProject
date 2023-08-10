import { fetchMeetings, softDeleteMeeting } from "./Scripts/ClientFunctionsMeeting.js";
import { checkLogin } from "./Scripts/ClientFunctions.js";

let currentUser = null;
let startInterval = new Date();
let endInterval = new Date();

window.onload = function () {
    checkLogin();
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    startInterval.setUTCFullYear(startInterval.getUTCFullYear() - 100);
    startInterval = startInterval.toISOString().replace('T', ' ').replace('Z', '');

    endInterval.setUTCFullYear(endInterval.getUTCFullYear() + 100);
    endInterval = endInterval.toISOString().replace('T', ' ').replace('Z', '');
    
    fetchMeetings('', false, startInterval, endInterval, currentUser.id);
}

document.getElementById('searchInputMeeting').addEventListener('keyup', function() {
    let searchWord = document.getElementById('searchInputMeeting').value;
    fetchMeetings(searchWord, false, startInterval, endInterval, currentUser.id);
});

document.getElementById('deleteMeetingButton').addEventListener('click', function(event) {
    event.preventDefault();
    softDeleteMeeting();
});
