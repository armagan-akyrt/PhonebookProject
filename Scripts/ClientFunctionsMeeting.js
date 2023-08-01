let meetingsData = [];
let selectedMeetingIndex = 0;

export function fetchMeetings(searchWord, isActive, startInterval, endInterval) {
    fetch(`/getMeetings?searchWord=${searchWord}&isActive=${isActive}&startInterval=${startInterval}&endInterval=${endInterval}`)
        .then(response => response.json())
        .then(data => {
            let contactList = document.getElementById('listToShowMeeting');
            contactList.innerHTML = ''; // Clear the list before displaying new results

            data.meetingsList.forEach(meeting => {
                let li = document.createElement('li');
                li.textContent = 'test';
                meetingList.appendChild(li);

                li.addEventListener('click', function () {
                    meetingsData = data.meetingsList
                    selectedmeetingIndex = data.meetingsList.indexOf(meeting);
                });
            });
        })
        .catch(error => console.error('Error:', error));

}