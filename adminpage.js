let currentUser = null;
            let selectedUserIndex = 0;
            let selectedContactIndex = 0;

            let usersData = []; // An array to store all users data
            let contactsData = [];

            function fetchContacts(userId, contactSearchWord) {
                fetch(`/getContacts?userId=${userId}&searchWord=${contactSearchWord}`)
                    .then(response => response.json())
                    .then(data => {
                        let contactList = document.getElementById('listToShowContact');
                        contactList.innerHTML = ''; // Clear the list before displaying new results
            
                        data.contactsList.forEach(contact => {
                            let li = document.createElement('li');
                            li.textContent = `${contact.name} ${contact.surname}`; 
                            contactList.appendChild(li);

                            li.addEventListener('click', function() {
                                contactsData = data.contactsList
                                selectedContactIndex = data.contactsList.indexOf(contact);

                                // Call fetchContacts when a user item is clicked
                                document.getElementById('contactFirstName').value = contact.name;
                                document.getElementById('contactLastName').value = contact.surname;
                                document.getElementById('contactGsmNum').value = contact.phoneNumber;
                                document.getElementById('contactEmail').value = contact.email;
                                document.getElementById('contactAddress').value = contact.address;
                            });
                        });
                    })
                    .catch(error => console.error('Error:', error));
            }

            function fetchUsers(searchWord) {
                fetch(`/getUsers?searchWord=${searchWord}`)
                    .then(response => response.json())
                    .then(data => {
                        let userList = document.getElementById('listToShowUser');
                        userList.innerHTML = ''; // Clear the list before displaying new results
            
                        data.usersList.forEach(user => {
                            let li = document.createElement('li');
                            li.textContent = `${user.name} ${user.surname}`; 
                            li.addEventListener('click', function() {
                                usersData = data.usersList;
                                selectedUserIndex = data.usersList.indexOf(user);

                                // Call fetchContacts when a user item is clicked
                                fetchContacts(user.id, '');
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
            
            function updateUser() {
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
        
            function softDeleteUser() {
                const selectedUser = usersData[selectedUserIndex];

                let userId = selectedUser.id;

                fetch('/softDeleteUser', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'userId': userId}),
                })
                .then(response => response.json())
                .then(data => {

                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


            }

            function updateContact() {
                const selectedContact = contactsData[selectedContactIndex]

                const contactData = {
                    id: selectedContact.id,
                    username: selectedContact.username,
                    name: document.getElementById('contactFirstName').value,
                    surname: document.getElementById('contactLastName').value,
                    gsmNum: document.getElementById('contactGsmNum').value,
                    email: document.getElementById('contactEmail').value,
                    address: document.getElementById('contactAddress').value,
            };

                fetch('/updateContact', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(contactData),
                })
                .then(response => response.json())
                .then(data => {

                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            
            }

            function softDeleteContact() {
                const selectedContact = contactsData[selectedContactIndex]

                let contactId = selectedContact.id;

                fetch('/softDeleteContact', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({'contactId': contactId}),
                })
                .then(response => response.json())
                .then(data => {

                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            }

            document.getElementById('deleteContactButton').addEventListener('click', function(event) {
                event.preventDefault();
                softDeleteContact();
            });

            document.getElementById('updateContactButton').addEventListener('click', function(event) {
                event.preventDefault();
                updateContact();
            });

            // Attacch the softDeleteUser function to the button's click event
            document.getElementById('deleteUserButton').addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the form from being submitted normally
                softDeleteUser();
            });

            // Attach the updateUser function to the button's click event
            document.getElementById('updateUserButton').addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the form from being submitted normally
                updateUser();
            });
            
            document.getElementById('searchInputUser').addEventListener('keyup', function() {
                let searchWord = document.getElementById('searchInputUser').value;
                fetchUsers(searchWord);
            });

            document.getElementById('searchInputContact').addEventListener('keyup', function() {
                let searchWord = document.getElementById('searchInputContact').value;
                fetchContacts(currentUser, searchWord);
            });


            window.addEventListener('load', function() {
                fetchUsers(''); // Fetch all users on load
            });            
            
            