
const req = require('supertest');
const server = require('./index.js');

describe('index.js', () => {
    it('responds 200 yaya', async () => {
        const res = await req(server).get('/');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('yaya');
    });

    describe('GET /games', () => {
        it('should respond 200', async () => {
            const res = await req(server).get('/games');
            expect(res.status).toBe(200);
        });

        it('should return an empty array even if no games are saved', async () => {
            let res = await req(server).get('/games');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toEqual([]);
        });

        it('should return a list of games in an array', async () => {
            const game = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
                };
            let res = await req(server).post('/games').send(game);
            expect(res.status).toBe(201);

            res = await req(server).get('/games');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body).toEqual(expect.arrayContaining([game]));
        });
    });

    describe('POST /games', () => {
        it('should accept a new game with required fields', async () => {
            const game = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
                releaseYear: 1980 // not required
              };
            let res = await req(server).post('/games').send(game);
            expect(res.status).toBe(201);
        });

        it('should accept a game without release year', async () => {
            const game2 = {
                title: 'Pacman', // required
                genre: 'Arcade', // required
              };
            res = await req(server).post('/games').send(game2);
            expect(res.status).toBe(201);
        });

        it('should respond 422 if any required fields are missing', async () => {
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

            const game3 = {
                releaseYear: 1980 // not required
              };
            res = await req(server).post('/games').send(game3);
            expect(res.status).toBe(422);
        });
    });
});