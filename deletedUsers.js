import {fetchUsers} from "./Scripts/ClientFunctionsUser.js";
import {checkLogin, checkAdmin} from "./Scripts/ClientFunctions.js";

window.onload = function () {
    checkLogin();
    checkAdmin();
    fetchUsers('', false);
};

document.getElementById('searchInputUser').addEventListener('keyup', function () {
    let searchWord = document.getElementById('searchInputUser').value;
    fetchUsers(searchWord, false);
});

document.getElementById('updateUserButton').addEventListener('click', function (event) {
    event.preventDefault();
    updateAndBringBackUser();
});

document.getElementById('deleteUserButton').addEventListener('click', function (event) {
    event.preventDefault();
    hardDeleteUser();
});


function updateAndBringBackUser() {
    // Get the data of the selected user

    const selectedUser = usersData[selectedUserIndex];

    const userData = {
        id: selectedUser.id,
        password: selectedUser.password,
        username: selectedUser.username,
        role: selectedUser.role,
        name: document.getElementById('userFirstName').value,
        surname: document.getElementById('userLastName').value,
        gsmNum: document.getElementById('userGsmNum').value,
        email: document.getElementById('userEmail').value,
        address: document.getElementById('userAddress').value,
    };


    fetch('/updateUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

        console.log(userData.id);

        fetch('/bringUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId: userData.id}),
        })
            .then(response => response.json())
            .then(data => {
    
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
}

function hardDeleteUser() {

    const selectedUser = usersData[selectedUserIndex];
    

    fetch('/hardDeleteUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId: selectedUser.id}),
    })
        .then(response => response.json())
        .then(data => {

            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


