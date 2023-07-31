const express = require('express');
const bodyParser = require('body-parser');
const User = require('./Scripts/User');
const Contact = require('./Scripts/Contact');
const Guest = require('./Scripts/Guest');
const session = require('express-session');
const UsefulUtilities = require('./Scripts/UsefulUtilities');
const { DateTime } = require('msnodesqlv8');

let util = new UsefulUtilities();

const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'totally-secret-key-api-123',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.post('/action_page', async (req, res) => {
    let user = new User();

    let loginSuccessful = await user.VerifyLogin(req.body.email, req.body.psw);

    if (loginSuccessful) {
        req.session.user = user; // Save the user to the session
        res.json(user );
    } else {
        res.json({ error: 'Login failed. Please check your email and password.' });
    }
});


app.get('/userdata', function (req, res) {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.json({});
    }
});

app.get('/currentuser', function (req, res) { 
    if (req.session.selectedUser) {
        res.json(req.session.selectedUser);
    } else {
        res.json({});
    }
});

app.get('/generatePassword', function (req, res) {
    let user = new User();
    let password = user.GenerateRandomPassword();

    res.json({ password: password });
});

app.post('/signup', async (req, res) => {

    let user = new User();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.phoneNumber = req.body.gsmNumber;
    user.email = req.body.email;
    user.address = req.body.address;
    user.Password = req.body.password;
    user.role = req.body.userType;

    let signupSuccessful = await user.CreateUser();

    if (signupSuccessful) {
        res.redirect('/createNewUser.html?signupSuccessful=true')
    } else {
        res.redirect('/createNewUser.html?signupFailed=true');
    }

});

app.post('/addcontact', async (req, res) => { 

    let contact = new Contact();

    contact.name = req.body.name;
    contact.surname = req.body.surname;
    contact.phoneNumber = req.body.gsmNumber;
    contact.email = req.body.email;
    contact.address = req.body.address;
    req.body.userId;

    let contactSuccessful = await contact.CreateContact(req.body.userId);

    if (contactSuccessful) {
        res.redirect('/createNewContact.html?contactSuccessful=true')
    } else {
        res.redirect('/createNewContact.html?contactFailed=true');
    }

});

app.get('/getUsers', async (req, res) => {


    let user = new User();

    let normalizedSearchWord = util.convertTurkishToAscii(req.query.searchWord)
    let users = await user.ListUsers(normalizedSearchWord, req.query.isActive);

    res.json({ usersList: users });

});

app.post('/updateUser', async (req, res) => {
    // Get the new user data from the request body
    let userData = req.body;

    try {
        // Create a new User instance and set the fields to the new values
        let user = new User();
        user.name = userData.name;
        user.surname = userData.surname;
        user.phoneNumber = userData.gsmNum;
        user.email = userData.email;
        user.address = userData.address;
        user.username = userData.username;
        user.password = userData.password;
        user.role = userData.role;
        user.id = userData.id;
        // Don't forget to set other fields you might have on the User object

        // Now call the UpdateUser method
        const result = await user.UpdateUser();

        if (result) {
            res.json({ success: true, message: 'User updated successfully' });
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/bringUser', async (req, res) => { 
    
        let user = new User();

        user.id = req.body.userId;

        let result = await user.BringBackUser();
    
        if (result) {
            res.json({ success: true, message: 'User updated successfully' });
        } else {
            throw new Error('User not found');
        }
});

app.post('/softDeleteUser', async (req, res) => {
    // Get the user id from the request body
    let userId = req.body.userId;

    try {
        // Create a new User instance
        let userToDelete = new User();
        userToDelete.id = userId;

        console.log(userToDelete.id);
        const result = await userToDelete.SoftDeleteUser();

        if (result) {
            res.json({ success: true, message: 'User deleted successfully' });
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/hardDeleteUser', async (req, res) => {
    // Get the user id from the request body
    let userId = req.body.userId;

    try {
        // Create a new User instance
        let userToDelete = new User();
        userToDelete.id = userId;

        console.log(userToDelete.id);
        const result = await userToDelete.HardDeleteUser();

        if (result) {
            res.json({ success: true, message: 'User deleted successfully' });
        } else {
            throw new Error('User not found');
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.post('/updateContact', async (req, res) => {

    let contactData = req.body;
    console.log(contactData);
    try {
        let contact = new Contact();
        contact.name = contactData.name;
        contact.surname = contactData.surname;
        contact.phoneNumber = contactData.gsmNum;
        contact.email = contactData.email;
        contact.address = contactData.address;
        contact.userId = contactData.userId;
        contact.id = contactData.id;

        const result = await contact.UpdateContact();

        if (result) {
            res.json({ success: true, message: 'Contact updated successfully' });
        } else {
            throw new Error('Contact not found');
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }

});

app.post('/softDeleteContact', async (req, res) => { 
    // Get the contact id from the request body
    let contactId = req.body.contactId;

    try {
        // Create a new Contact instance
        let contactToDelete = new Contact();
        contactToDelete.id = contactId;

        console.log(contactToDelete.id);
        const result = await contactToDelete.SoftDeleteContact();

        if (result) {
            res.json({ success: true, message: 'Contact deleted successfully' });
        } else {
            throw new Error('Contact not found');
        }
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

app.get('/getContacts', async (req, res) => {

    let contact = new Contact();

    console.log(req.query.isActive);

    let normalizedSearchWord = util.convertTurkishToAscii(req.query.searchWord)

    let contacts = await contact.ListContacts(req.query.userId, normalizedSearchWord, req.query.isActive);


    res.json({ contactsList: contacts });
});

app.post('/bringContact', async (req, res) => { 

    let contact = new Contact();

    contact.id = req.body.contactId;

    let contactData = await contact.BringBackContact();

    res.json({ isSuccessful: contactData });
});

app.post('/hardDeleteContact', async (req, res) => { 

    let contact = new Contact();

    contact.id = req.body.contactId;

    let contactData = await contact.SevereUserContact(req.body.userId);

    res.json({ isSuccessful: contactData });

});

app.post('/createGuest', async (req, res) => {
    
        let guest = new Guest();
    
        guest.name = req.body.name;
        guest.surname = req.body.surname;
        guest.cardId = req.body.cardId;
        guest.cardAcquisitionDate = DateTime.now();

        guest.companyName = req.body.companyName;

        let guestSuccessful = await guest.CreateGuest();
    
        if (guestSuccessful) {
            res.redirect('/createNewGuest.html?guestSuccessful=true')
        } else {
            res.redirect('/createNewGuest.html?guestFailed=true');
        }
    
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
