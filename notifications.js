let currentUser = null;

window.onload = function () {
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    fetchParticipationInvites();
    fetchApprovalRequests();
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
            li.value = participation.participationId;
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
            document.getElementById('listToShowApprovals').appendChild(li);
        });
    });
}

