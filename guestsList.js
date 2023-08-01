
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
}

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
                });
            });

        })
        .catch(error => console.error('Error:', error));

    
}