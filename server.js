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
    let imgPath = `${__dirname}/${imgName}`;

    fs.access(imgPath, fs.F_OK, (err) => {
        if(err) {
            res.sendStatus(404);
            return
        }
        res.sendFile(imgPath);
    });


});

app.post('/api/images/upload', (req, res) => {
    let form = new formidable.IncomingForm();
    form.parse(req, function(error, fields, file){
        const filepath = file.fileupload.filepath;
        const newpath = path.join(__dirname, file.fileupload.originalFilename);
        //does this work?? 
        if (typeof file.fileupload == 'undefined'){
            res.sendStatus(404);
            return
        }

        fs.rename(filepath, newpath, function(){
            res.send(newpath);
        });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))