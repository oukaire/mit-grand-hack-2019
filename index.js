'use strict';

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const oneup = require('./oneup')
var id = "";

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static(__dirname + '/public'))
app.use(cors())

app.get('/connect', function(req, res) {
    id = req.query.id;
    oneup.getOrMakeOneUpUserId(id, function(oneupUserId){

        oneup.getAllFhirResourceBundles(oneup.accessTokenCache[id], function(responseData){
            console.log(responseData)
            res.send(responseData)
        })
    })
})

app.get('/', function(req, res) {
    id = req.query.id;
    res.send('GET from Backend; ID: ' + id)
})

app.listen(process.env.PORT || 8888)
