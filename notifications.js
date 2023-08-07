let currentUser = null;
let selectedOverseerRequestIndex = null;
let selectedParticipantRequestIndex = null;


window.onload = function () {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    fetchParticipationInvites();
    fetchApprovalRequests();
    fetchNotifications();
}

function fetchParticipationInvites()
{
    document.getElementById('listToShowParticipations').innerHTML = '';
    fetch(`/getPendingParticipations?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(data => {
        data.pendingParticipationsList.forEach(participation => {
            let li = document.createElement('li');
            li.textContent = `Konu: ${participation.topic}`;
            li.value = participation.conferenceId;
            
            li.addEventListener('click', function() {
                selectedParticipantRequestIndex = li.value;
                console.log(selectedParticipantRequestIndex);
                console.log(document.getElementById('rejectParticipation').value);
            });
            document.getElementById('listToShowParticipations').appendChild(li);
        });
    });
}

function fetchApprovalRequests() 
{
    document.getElementById('listToShowApprovals').innerHTML = '';
    fetch(`/getApprovalRequests?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(data => {
        data.pendingApprovalsList.forEach(approval => {
            let li = document.createElement('li');
            li.textContent = `Konu: ${approval.topic}`;
            li.value = approval.requestId;

            li.addEventListener('click', function() {
                selectedOverseerRequestIndex = li.value;
                console.log(selectedOverseerRequestIndex);
            });
            document.getElementById('listToShowApprovals').appendChild(li);
        });
    });
}

function fetchNotifications() {
    document.getElementById('listToShowNotifications').innerHTML = '';
    fetch(`/getNotifications?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(data => {
        data.notificationsList.forEach(notification => {
            let li = document.createElement('li');
            li.textContent = `Konu: ${notification.topic}`;
            li.value = notification.notificationId;
            document.getElementById('listToShowNotifications').appendChild(li);
        });
    });
}

function participationAnswer(participationAnswer) {
    if (selectedParticipantRequestIndex != null) {
        fetch('/participationAnsw', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
    
            body: JSON.stringify({requestId: selectedParticipantRequestIndex, response: participationAnswer, participantId: currentUser.id}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchParticipationInvites();
                fetchApprovalRequests();
                fetchNotifications();
            }
        });
    }
}



document.getElementById('acceptParticipation').addEventListener('click', function() {
    participationAnswer(document.getElementById('acceptParticipation').value);
});

document.getElementById('rejectParticipation').addEventListener('click', function() {
    participationAnswer(document.getElementById('rejectParticipation').value);
});

