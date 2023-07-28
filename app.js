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

app.get('/getUsers/:searchWord', async (req, res) => {


    let user = new User();

    let normalizedSearchWord = util.convertTurkishToAscii(req.params.searchWord)
    let users = await user.ListUsers(normalizedSearchWord, true);

    let testval = 0;

    res.json({usersList: users});

});

app.get('/getContacts/:userId/:searchWord', async (req, res) => {

    let contact = new Contact();

    let normalizedSearchWord = util.convertTurkishToAscii(req.params.searchWord)

    let contacts = await contact.ListContacts(req.params.userId,normalizedSearchWord, true);

    res.json({contactsList: contacts});
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
