const Joi = require('joi');
const express = require('express');
const fs = require('fs');
const formidable = require('formidable');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/images/download/:imageName', (req, res) => {
    let imgName = req.params.imageName;
    res.sendFile(`${__dirname}/${imgName}`);
})

app.post('/api/images/upload', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, file){
        const filepath = file.fileupload.filepath;
        const newpath = path.join(__dirname, file.fileupload.originalFilename);
        fs.rename(filepath, newpath, function(){
            res.send(newpath);
        });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))