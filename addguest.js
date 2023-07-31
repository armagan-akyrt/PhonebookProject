import {fetchUsers} from "./Scripts/ClientFunctionsUser.js";

window.onload = function () {
    fetchUsers('', true);
};

document.getElementById('searchInputUser').addEventListener('keyup', function () {
    let searchWord = document.getElementById('searchInputUser').value;
    fetchUsers(searchWord, true);
});

document.getElementById('listToShowUser').addEventListener('click', function (event) { 
    if (event.target && event.target.nodeName === 'LI') {  // Check if a list item was clicked
        let userId = sessionStorage.getItem('selectedUserId');
        document.getElementById('visitingUser').value = userId;
    }
});


