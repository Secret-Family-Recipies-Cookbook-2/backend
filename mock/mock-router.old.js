// const request = require('supertest');
// const db = require('../database/dbConfig');

// const server = require('../api/server');


// beforeEach(() => {
//     return db.migrate
//         .rollback()
//         .then(() => db.migrate.latest())
//         .then(() => db.seed.run())

// })

// test("GET /api/mock  Returns recipes array with no auth token needed", async()=>{
//     const res = await(request(server))
//     .get('/api/mock')
//     expect(res.body[0]).toHaveProperty("id");
//     expect(res.body[0]).toHaveProperty("title");
//     expect(res.body[0]).toHaveProperty("source");
//     expect(res.body[0]).toHaveProperty("ingredients");
//     expect(res.body[0]).toHaveProperty("category");
//     expect(res.body[0]).toHaveProperty("instructions");
//     expect(res.body).toHaveLength(2);
//     expect(res.status).toBe(200)
// })  