let rooms = [];
  
window.onload = function() {
    fetchMeetingRooms();

    // Because fetchMeetingRooms is asynchronous, rooms will still be empty here
    // console.log(rooms);  
}

function fetchMeetingRooms() {
    fetch('/getRooms') 
        .then(response => response.json())
        .then(data => {
            rooms = data.roomsList;
            sessionStorage.setItem('rooms', JSON.stringify(rooms));
            // Update the roomsList div with the rooms data
            const roomsListDiv = document.getElementById('roomsList');
            rooms.forEach(room => {
                roomsListDiv.innerHTML += `<p>${room}</p>`;  // assuming room is a string
            });
        })
        .catch(error => console.error('Error:', error));
}
