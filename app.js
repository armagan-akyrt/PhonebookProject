const express = require('express');
const bodyParser = require('body-parser');
const User = require('./Scripts/User');
const Contact = require('./Scripts/Contact');
const session = require('express-session');
const UsefulUtilities = require('./Scripts/UsefulUtilities');

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

    if (loginSuccessful && user.role == "ADMIN") {
        req.session.user = user;  // Save the user to the session
        res.redirect('/adminpage.html');
    } else if (loginSuccessful && user.role == "USER") {
        req.session.user = user;  // Save the user to the session
        res.redirect('/userpage.html');
    } else {
        res.redirect('/index.html?loginFailed=true');
    }
});

app.get('/userdata', function (req, res) {
    if (req.session.user) {
        res.json(req.session.user);
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

app.get('/getUsers', async (req, res) => {


    let user = new User();

    let normalizedSearchWord = util.convertTurkishToAscii(req.query.searchWord)
    let users = await user.ListUsers(normalizedSearchWord, true);

    let testval = 0;

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

    let normalizedSearchWord = util.convertTurkishToAscii(req.query.searchWord)

    let contacts = await contact.ListContacts(req.query.userId, normalizedSearchWord, true);

    res.json({ contactsList: contacts });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
