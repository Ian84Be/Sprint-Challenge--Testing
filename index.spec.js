
const req = require('supertest');
const server = require('./index.js');

describe('index.js', () => {
    it('responds 200 yaya', async () => {
        const res = await req(server).get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('yaya');
    });

    describe('POST /games', () => {
        it('should accept a new game with or without releaseYear', async () => {
            const game = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
              };
            let res = await req(server).post('/games').send(game);
            expect(res.status).toBe(201);

            const game2 = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
              };
            res = await req(server).post('/games').send(game2);
            expect(res.status).toBe(201);
        });

        it('should respond 422 if required fields are missing', async () => {
            const game = {
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
              };
            let res = await req(server).post('/games').send(game);
            expect(res.status).toBe(422);

            const game2 = {
                title: 'Pacman', // required
                releaseYear: 1980 // not required
              };
            res = await req(server).post('/games').send(game2);
            expect(res.status).toBe(422);
        });
    });
});