const request = require('supertest');
const server = require('../api/server.js');
const database = require('../database/dbConfig.js');

describe("auth-router", function() {
  describe("POST /api/auth/register", () => {
      beforeEach(async function () {
          await database('users')
                  .truncate()
      })
      it("should return JSON formated response", async () => {
         const yesJson = await request(server).post('/api/auth/register')
                                  .send({username: "luffy", password: "food"})
                                  expect(yesJson.type).toMatch(/json/i)
      });
      it("should add a user to the database name 'nami' ", async () => {
          const newUser = await request(server).post('/api/auth/register')
                                  .send({username: 'nami', password: "money"})
                                  expect(newUser.body.username).toBe('nami')
      });
  });
  describe("POST /api/auth/login", function() {
      it("should return a message", async () =>{
          const response = await request(server).post('/api/auth/login')
                              .send({username: 'nami', password: "money"})
                              expect(response.body.message).toMatch('Welcome back nami')
      })
      it("should getback a token after user login in", async () => {
          const response = await request(server).post('/api/auth/login')
                              .send({username: 'nami', password: "money"})
                              expect(response.body.token).toBeDefined()
      })
  })
});