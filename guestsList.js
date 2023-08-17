import { checkLogin, checkAdmin } from './Scripts/ClientFunctions.js';

let guestsData = [];
let selectedGuestIndex = 0;

let searchWord = "";
let companyName = "";
let startDate = "";
let endDate = "";
let isInside = document.getElementById('selectGuestType').value;




window.onload = function () {

    checkLogin();
    checkAdmin();

    let startDate = new Date();
    startDate.setUTCFullYear(startDate.getUTCFullYear() - 100);
    startDate = startDate.toISOString().replace('T', ' ').replace('Z', '');

    let endDate = new Date();
    endDate.setUTCFullYear(endDate.getUTCFullYear() + 100);
    endDate = endDate.toISOString().replace('T', ' ').replace('Z', '');
    fetchGuests('', startDate, endDate, '', '');
    isInside = document.getElementById('selectGuestType').value;

}

document.getElementById('selectGuestType').addEventListener('change', function () { 

    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);

});

document.getElementById('searchInputUsernameGuest').addEventListener('keyup', function () {
    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
});

document.getElementById('searchInputCompanyNameGuest').addEventListener('keyup', function () {
    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
});

document.getElementById('deleteGuest').addEventListener('click', function () {
    let selectedGuest = guestsData[selectedGuestIndex];

    fetch('/deleteGuest', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({guestId: selectedGuest.id}),
    })
        .then(response => response.json())
        .then(data => {

            let alertString = ' Misafir silinirken bir hata oluştu.';

            if (data.success == true) {
                alertString = 'Misafir başarıyla silindi.';
            }
            alert(alertString);

        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('getGuestCard').addEventListener('click', function () {
    let selectedGuest = guestsData[selectedGuestIndex];

    fetch('/obtainCard', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({guestId: selectedGuest.id, cardId: selectedGuest.cardId}),
    })
        .then(response => response.json())
        .then(data => {

            let alertString = ' Kart alınırken bir hata oluştu.';
            if (data.success == true) {
                alertString = 'Kart başarıyla alındı.';
            }
            alert(alertString);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('guestApplyIntervalButton').addEventListener('click', function () {
    setData();

    fetchGuests(searchWord, startDate, endDate, companyName, isInside);
});

function setData() {
    isInside = document.getElementById('selectGuestType').value;
    if (isInside == 'true') {
        document.getElementById('guestCardSubmitDate').style.display = 'none';
        document.getElementById('labelForCardSubmitDate').style.display = 'none';
        document.getElementById('getGuestCard').style.display = 'block';

    } else {
        document.getElementById('guestCardSubmitDate').style.display = 'block';
        document.getElementById('labelForCardSubmitDate').style.display = 'block';
        document.getElementById('getGuestCard').style.display = 'none';

    }

    searchWord = document.getElementById('searchInputUsernameGuest').value;
    companyName = document.getElementById('searchInputCompanyNameGuest').value;

    startDate = document.getElementById('startIntervalGuest').value;
    startDate = (startDate == "") ? (new Date().getUTCFullYear() - 100): startDate;
    endDate = document.getElementById('endIntervalGuest').value;
    endDate = (endDate == "") ? (new Date().getUTCFullYear() + 100) : endDate;

}

function fetchGuests(searchWord, startDate, endDate, companyName, isInside) {
    fetch(`/getGuests?searchWord=${searchWord}&startDate=${startDate}&endDate=${endDate}&companyName=${companyName}&isInside=${isInside}`)
        .then(response => response.json())
        .then(data => {
            guestsData = data;
            console.log(data);

            let guestsList = document.getElementById('listToShowGuest');
            guestsList.innerHTML = '';

            data.forEach(item => {
                tbody.innerHTML += renderRow(item);
            });

            let selectedRow = null;

            function deselectRow() {
                const previouslySelected = document.querySelector('table tbody tr.selected');
                if (previouslySelected) {
                    previouslySelected.classList.remove('selected');
                }
            }
    
            document.querySelectorAll('table tbody tr').forEach(row => {
                row.addEventListener('click', function() {
                    deselectRow();
                    this.classList.add('selected');
    
                    selectedRow = {
                        name: this.cells[0].innerText,
                        surname: this.cells[1].innerText,
                        company: this.cells[2].innerText,
                        phone: this.cells[3].innerText,
                        address: this.cells[4].innerText,
                        startDate: this.cells[5].innerText,
                        endDate: this.cells[6].innerText
                    };
    
                    alert(`You selected ${selectedRow.name} ${selectedRow.surname} from ${selectedRow.company}`);
                });
            });

        })
        .catch(error => console.error('Error:', error));

    
}


const tbody = document.getElementById('gridBody');

        const tagsOrder = ["name", "surname", "company", "phone", "address", "startDate", "endDate"];

        function renderRow(item) {
            return `
                <tr>
                    ${tagsOrder.map(tag => `<td>${item[tag]}</td>`).join('')}
                </tr>
            `;
        }