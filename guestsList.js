
let guestsData = [];
let selectedGuestIndex = 0;

window.onload = function () {
    let startDate = new Date();
    startDate.setUTCFullYear(startDate.getUTCFullYear() - 100);
    startDate = startDate.toISOString().replace('T', ' ').replace('Z', '');

    let endDate = new Date();
    endDate.setUTCFullYear(endDate.getUTCFullYear() + 100);
    endDate = endDate.toISOString().replace('T', ' ').replace('Z', '');
    fetchGuests('', startDate, endDate, '', '');
    let isInside = document.getElementById('selectGuestType').value;

    if (isInside == 'false') {
        document.getElementById('guestCardSubmitDate').style.display = 'none';
        document.getElementById('labelForCardSubmitDate').style.display = 'none';
    }
}

document.getElementById('selectGuestType').addEventListener('change', function () { 

    let isInside = document.getElementById('selectGuestType').value;
    if (isInside == 'true') {
        document.getElementById('guestCardSubmitDate').style.display = 'none';
        document.getElementById('labelForCardSubmitDate').style.display = 'none';
    } else {
        document.getElementById('guestCardSubmitDate').style.display = 'block';
        document.getElementById('labelForCardSubmitDate').style.display = 'block';
    }

    let searchWord = document.getElementById('searchInputUsernameGuest').value;
    let companyName = document.getElementById('searchInputCompanyNameGuest').value;

    let startDate = document.getElementById('startIntervalGuest').value;
    startDate = (startDate == "") ? new Date().getUTCFullYear() - 100: startDate;
    let endDate = document.getElementById('endIntervalGuest').value;
    endDate = (endDate == "") ? new Date().getUTCFullYear() + 100 : endDate;

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);

});


function fetchGuests(searchWord, startDate, endDate, companyName, isInside) {
    fetch(`/getGuests?searchWord=${searchWord}&startDate=${startDate}&endDate=${endDate}&companyName=${companyName}&isInside=${isInside}`)
        .then(response => response.json())
        .then(data => {
            guestsData = data;
            console.log(data);

            let guestsList = document.getElementById('listToShowGuest');
            guestsList.innerHTML = '';

            data.guestsList.forEach(guest => { 
                let li = document.createElement('li');
                li.textContent = `${guest.name} ${guest.surname} - ${guest.companyName}`;
                guestsList.appendChild(li);

                li.addEventListener('click', function () { 
                    guestsData = data.guestsList;
                    selectedGuestIndex = data.guestsList.indexOf(guest);

                    document.getElementById('guestName').value = guest.name;
                    document.getElementById('guestSurname').value = guest.surname;
                    document.getElementById('guestCardId').value = guest.cardId;
                    document.getElementById('guestCompanyName').value = guest.companyName;
                    document.getElementById('guestVisitingUser').value = guest.visiting.id;
                    document.getElementById('guestVisitingUserFullName').value = `${guest.visiting.name} ${guest.visiting.surname}`;
                    document.getElementById('guestCardGrantDate').value = guest.cardAcquisitionDate.replace('T', ' ').replace('Z', '');

                });
            });

        })
        .catch(error => console.error('Error:', error));

    
}