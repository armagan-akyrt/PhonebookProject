import { fetchPreviousMeetings, softDeleteMeeting } from "./Scripts/ClientFunctionsMeeting.js";

let currentUser = null;

let startInterval = new Date();
let endInterval = new Date();
let searchWord = '';

window.onload = function () {

    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    startInterval.setUTCFullYear(startInterval.getUTCFullYear() - 100);
    startInterval = startInterval.toISOString();

    endInterval.setUTCFullYear(endInterval.getUTCFullYear() + 100);
    endInterval = endInterval.toISOString();
    
    fetchPreviousMeetings('', true, startInterval, endInterval, currentUser.id);
}

document.getElementById('meetingApplyIntervalButton').addEventListener('click', function(event) {
    event.preventDefault();
    startInterval = document.getElementById('startIntervalMeeting').value;
    endInterval = document.getElementById('endIntervalMeeting').value;
    searchWord = document.getElementById('searchInputMeeting').value;
    fetchPreviousMeetings('', true, startInterval, endInterval, currentUser.id);
});


document.getElementById('meetingSearchButton').addEventListener('keyup', function(event) {
    event.preventDefault();
    searchWord = document.getElementById('searchInputMeeting').value;
    fetchPreviousMeetings(searchWord, true, startInterval, endInterval, currentUser.id);
});
