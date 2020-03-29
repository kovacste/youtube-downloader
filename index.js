const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const urlToMp3 = require('./converter.js');
var compression = require('compression');

const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(compression());

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))

app.get('/about', (req, res) => res.sendFile(path.join(__dirname+'/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname+'/contact.html')));
app.get('/termsofservices', (req, res) => res.sendFile(path.join(__dirname+'/termsofservices.html')));
app.get('/privacypolicy', (req, res) => res.sendFile(path.join(__dirname+'/privacypolicy.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/notfound.html')));
app.post('/getYTMusic', (req, res) => {
    urlToMp3.urlToMp3(req.body.url).then(fileName => {
        return res.send({url: fileName})
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

