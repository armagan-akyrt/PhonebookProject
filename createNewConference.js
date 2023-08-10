import { fetchUsers} from './Scripts/ClientFunctionsUser.js';
import { checkLogin } from './Scripts/ClientFunctions.js';

let participants = [];
let currentUser;

window.onload = function() {
    checkLogin();
    fetchUsers('', true);
    fetchRooms();
    currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log(currentUser.id);
    document.getElementById('conferenceUserId').value = currentUser.id;
}

document.getElementById('userAddToParticipants').addEventListener('click', function() {
    let result = confirm(`Bu kişiyi katılımcı olarak eklemek istediğinize emin misiniz?`);
    if(result == true) {
        let userId = sessionStorage.getItem('selectedUserId');
        if(participants.includes(userId)) {
            alert('Bu kişi zaten katılımcı olarak eklenmiş.');
            return;
        }
        participants.push(userId);

        document.getElementById('conferenceParticipants').value = JSON.stringify({participants: participants});
        console.log(document.getElementById('conferenceRoomId').value);
        console.log(document.getElementById('conferenceParticipants').value);
    }
});



function fetchRooms() {
    fetch('/getRooms')
    .then(response => response.json())
    .then(data => {
        let roomList = document.getElementById('conferenceRoomId');
        roomList.innerHTML = ''; // Clear the list before displaying new results

        data.roomsList.forEach(room => {
            let option = document.createElement('option');
            option.textContent = `Oda #${room.roomId} ${room.roomCapacity} kişilik`;
            option.value = room.roomId;

            roomList.appendChild(option);
        });
    })
}

