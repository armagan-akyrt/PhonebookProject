const express = require('express');
const bodyParser = require('body-parser');
const User = require('./Scripts/User');
const session = require('express-session');

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


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
