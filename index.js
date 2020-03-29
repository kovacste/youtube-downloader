const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser');
const urlToMp3 = require('./converter.js');

const port = 80

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))


app.post('/getYTMusic', (req, res) => {
    urlToMp3.urlToMp3(req.body.url).then(fileName => {
        return res.send({url: fileName})
    });
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

