const request = require('supertest');
const server = require('../api/server.js');

describe('joke-router', () => {
    describe('GET /api/jokes', () =>{
        it('should get back a json with dad jokes', async () =>{
            const response = await request(server).get('/api/jokes')
            expect(response.type).toMatch(/json/i)
        })
        it("should return 401", async () => {
            const response = await request(server).get('/api/jokes')
            expect(response.status).toBe(401)
        });
    })
})