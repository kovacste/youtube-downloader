const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const urlToMp3 = require('./converter.js');
const removeJob = require('./fileRemoveJob')
var compression = require('compression');

var Ddos = require('ddos');
var ddos = new Ddos({burst:10, limit:15})

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(compression());
app.use(ddos.express);

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))
app.get('/about', (req, res) => res.sendFile(path.join(__dirname+'/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname+'/contact.html')));
app.get('/termsofservices', (req, res) => res.sendFile(path.join(__dirname+'/termsofservices.html')));
app.get('/privacypolicy', (req, res) => res.sendFile(path.join(__dirname+'/privacypolicy.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname+'/notfound.html')));



app.post('/getYTMusic', (req, res) => {

    switch (req.body.format) {
        case 'mp3': {
            urlToMp3.urlToMp3(req.body.url).then(fileName => {
                return res.send({url: fileName})
            });
            break;
        }
        case 'mp4': {
            urlToMp3.urlToMp4(req.body.url).then(fileName => {
                return res.send({url: fileName})
            });
            break;
        }
    }
});
/*

var cron = require('node-cron');
cron.schedule('1 * * * * *', () => {
    removeJob.removeFiles();
    console.log('Jobs done')
})
*/
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

