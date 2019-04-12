

const express = require('express');
const server = express();
server.use(express.json());

server.get('/', async (req,res) => {
    res.status(200).json({message:'yaya'});
});

server.get('/games', async (req,res) => {
});

server.post('/games', async (req,res) => {
    const {title,genre} = req.body;
    if (!title || !genre) {
        res.status(422).json({error: 'title & genre are required fields'});
    } else {
        try {
            res.status(201).json({success: `added game: ${req.body}`});
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
});

module.exports = server;
