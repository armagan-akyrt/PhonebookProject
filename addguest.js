window.onload = function () {
    fetchUsers('', false);
};

document.getElementById('searchInputUser').addEventListener('keyup', function () {
    let searchWord = document.getElementById('searchInputUser').value;
    fetchUsers(searchWord, false);
});

function fetchUsers(searchWord, isActive) {
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