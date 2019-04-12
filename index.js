

const express = require('express');
const server = express();
server.use(express.json());

let games = [];

server.get('/', async (req,res) => {
    res.status(200).json({message:'yaya'});
});

server.get('/games', async (req,res) => {
    res.status(200).json(games);
});

server.post('/games', async (req,res) => {
    const {title,genre} = req.body;
    if (!title || !genre) {
        res.status(422).json({error: 'title & genre are required fields'});
    } else {
        let duplicate = games.filter(game => game.title === title);
        if (duplicate.length > 0) {
            res.status(405).json({error:'game title must be unique'});
        } else {
            try {
                games.push(req.body);
                res.status(201).json(req.body);
            }
            catch(err) {
                res.status(500).json(err);
            }
        }
    }
});

server.post('/clear', async (req,res) => {
    if (games.length > 0) {
        games = [];
        res.status(200).json({message: 'games cleared'});
    } else {
        res.status(404).json({message: 'games array is empty'});
    }
})

module.exports = server;
