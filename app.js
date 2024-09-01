import express from 'express';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: '0707',
    saveUninitialized: true,
    resave: false,  
    cookie: { secure: false }  
}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.redirect('/home');
    }
    res.render('form', { usernameError: null, passwordError: null, username: null});
});

app.post('/home', (req, res) => {
    const { username, password } = req.body;

    const userPattern = /^[a-zA-Z][a-zA-Z0-9._]{1,}$/;
    const passPattern = /^\d{4,7}$/;

    let usernameError = '';
    let passwordError = '';

    
    if (!username) {
        usernameError = "Name is required";
    } else if (!userPattern.test(username)) {
        usernameError = "Name should start with a letter and be at least 2 characters long";
    }

    
    if (!password) {
        passwordError = "Password is required";
    } else if (!passPattern.test(password)) {
        passwordError = "Password must be between 4 and 7 digits long";
    }

    
    if (usernameError || passwordError) {
        return res.render('form', { usernameError, passwordError, username });
    }

    if (username === 'Kunjappi' && password === '1234') {
        req.session.username = username;
        return res.redirect('/home');
    } else {
        
        if (username !== 'Kunjappi') {
            usernameError = 'Incorrect username';
        }
        if (password !== '1234') {
            passwordError = 'Incorrect password';
        }
        return res.render('form', { usernameError, passwordError, username });
    }
});

app.get('/home', (req, res) => {
    if (req.session.username) {
        res.render('home', { username: req.session.username });
    } else {
        res.redirect('/');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.redirect('/home');
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
