const express = require('express');//imports express

const Hubs = require('./data/hubs-model.js');

const server = express();//sets our server to the express server function
server.use(express.json()); //need for post/put teaches the server to read json from the body
server.get('/', (req, res) =>{
    res.status(200).json({hello:'Web 26'})
})
//view a list of hubs
server.get('/api/hubs', (req,res) =>{
//go and get the hubs from database
Hubs.find()
.then(hubs => {
    res.status(200).json(hubs);})
.catch(err =>{
    console.log(err)
    res.status(500).json({
        errorMessage: 'oops'})
});
})

server.post('/api/hubs', (req, res) =>{
    const hubInfo = req.body;
    console.log('body', req.body);

    Hubs.add(hubInfo)
    .then(hub =>{
        res.status(201).json(hub);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({errorMessage:'oopsie'})
    })
})


const port = 5000;
server.listen(port, () =>{
    console.log(`***listening on port ${port}***`);
})//listens for communication on this port