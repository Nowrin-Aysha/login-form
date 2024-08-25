/*var http = require("http");
http.createServer(function(request,response){
    response.write("<h1>Welcome to node</h1>");
    response.end();
}).listen(8080);*/

/*const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
        // Serve the home page
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    } else if (req.url === '/login' && req.method === 'GET') {
        // Serve the login page
        const filePath = path.join(__dirname, 'login.html');
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content, 'utf-8');
            }
        });
    } else {
        // Handle 404 Not Found
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


*/
/*

var http=require('http')
var fs=require('fs')

http.createServer(function(req,res){

if(req.url==='/'){

     fs.readFile('sample.html',function(hello,hai){

        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(hai)
        res.end()

    })
}else if(req.url==='/login'){
    res.write('login')
    res.end()
}else{
    res.writeHead(404,{'Content-Type':'text/html'})
    res.write('error')
    res.end()
}
    
}).listen(7000, () => console.log('Server is running on http://localhost:7000')
)
*/
















const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(session({
    secret: '0707', 
    saveUninitialized: true,
    cookie: { secure: false } 
}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    next();
});


app.set('view engine','ejs');

app.get('/',(req,res) =>{
    if (req.session.username) {
        return res.redirect('/home');
    }

    res.render('form', { error: null });
})


app.post('/home', (req, res) => {
    const { username, password } = req.body;


    

    
    if (username === 'Nowrin' && password === '1234') {
        req.session.username = username;  
            res.redirect('/home');  
    } else {
        
        res.render('form', { error: 'Incorrect username or password' });
    }
});

app.get('/home', (req, res) => {
    if (req.session.username) {
        res.render('home', { username: req.session.username });
    } else {
        res.redirect('/');  
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home');
        }
        res.redirect('/');
    });
});


app.listen(8080, () => {
    console.log('Server is running on port 8080');
});







