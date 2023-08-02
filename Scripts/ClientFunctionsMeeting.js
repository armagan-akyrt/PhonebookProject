let meetingsData = [];
let selectedMeetingIndex = 0;

export function fetchMeetings(searchWord, isActive, startInterval, endInterval, userId) {
    fetch(`/getMeetings?userId=${userId}&isActive=${isActive}&startInterval=${startInterval}&endInterval=${endInterval}&searchWord=${searchWord}`)
        .then(response => response.json())
        .then(data => {
            let meetingList = document.getElementById('listToShowMeeting');
            meetingList.innerHTML = ''; // Clear the list before displaying new results

            data.meetingsList.forEach(meeting => {
                let li = document.createElement('li');

                let tempStartDate = new Date(meeting.meetingStartDate);
                let tempEndDate = new Date(meeting.meetingEndDate);
                li.textContent = `${meeting.contactFullName} ${tempStartDate.getUTCHours()}:${tempStartDate.getUTCMinutes()} - ${tempEndDate.getUTCHours()}:${tempEndDate.getUTCMinutes()}`;
                meetingList.appendChild(li);

                li.addEventListener('click', function () {
                    meetingsData = data.meetingsList;
                    selectedMeetingIndex = data.meetingsList.indexOf(meeting);

                    document.getElementById('meetingContactFullname').value = meeting.contactFullName;
                    document.getElementById('meetingStartDate').value = meeting.meetingStartDate.replace('T', ' ').replace('Z', '');
                    document.getElementById('meetingEndDate').value = meeting.meetingEndDate.replace('T', ' ').replace('Z', '');
                    document.getElementById('meetingNotes').value = meeting.meetingNotes;
                });
            });
        })
        .catch(error => console.error('Error:', error));
}
