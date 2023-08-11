


let usersData = [];
let selectedUserIndex = -1;


export function fetchUsers(searchWord, isActive) {
    fetch(`/getUsers?searchWord=${searchWord}&isActive=${isActive}`)
        .then(response => response.json())
        .then(data => {
            let userList = document.getElementById('listToShowUser');
            userList.innerHTML = ''; // Clear the list before displaying new results

            data.usersList.forEach(user => {
                let li = document.createElement('li');
                li.textContent = `${user.name} ${user.surname}`;
                li.addEventListener('click', function () {
                    usersData = data.usersList;
                    selectedUserIndex = data.usersList.indexOf(user);

                    sessionStorage.setItem('selectedUserId', user.id);

                    document.getElementById('userFirstName').value = user.name;
                    document.getElementById('userLastName').value = user.surname;
                    document.getElementById('userGsmNum').value = user.phoneNumber;
                    document.getElementById('userEmail').value = user.email;
                    document.getElementById('userAddress').value = user.address;
                });

                userList.appendChild(li);
            });
        })
        .catch(error => console.error('Error:', error));
}

export function updateUser() {
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
}

export function softDeleteUser() {
    const selectedUser = usersData[selectedUserIndex];

    let userId = selectedUser.id;

    fetch('/softDeleteUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'userId': userId }),
    })
        .then(response => response.json())
        .then(data => {

            let alertString = 'Kullanıcı silinirken bir hata oluştu. Lütfen Tekrar deneyiniz.';
            if (data.success === true) {
                alertString = 'Kullanıcı başarıyla silindi.';
            }
            alert(alertString);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


}

