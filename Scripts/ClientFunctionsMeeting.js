let meetingsData = [];
let selectedMeetingIndex = 0;

export function fetchMeetings(searchWord, isActive, startInterval, endInterval, userId) {
    // Here we make sure the startInterval and endInterval are Date objects

    // Now we can convert them into the ISO string format
    let startIntervalStr = startInterval.toISOString();
    let endIntervalStr = endInterval.toISOString();

    fetch('/getMeetings', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({startInterval: startIntervalStr, endInterval: endIntervalStr, searchWord: searchWord, isActive: isActive, userId : userId}),
    })
        .then(data => {
            let meetingList = document.getElementById('listToShowMeeting');
            meetingList.innerHTML = ''; // Clear the list before displaying new results

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
