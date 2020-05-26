const request = require('supertest');
const server = require('./server');

const db = require('../database/dbConfig');

// beforeEach(() => {
//     return db.migrate
//       .rollback()
//       .then(() => db.migrate.latest())
//       .then(() => db.seed.run());
//   });


describe("server", () => {
    describe("test environment", () => {
        it("test environment should be testing", () => {
            expect(process.env.DB_ENV).toBe("testing");
        })

        it("runs the server", () => {
            expect(true).toBe(true);
        })
    })
})


describe("GET /", () => {
    it("should return http status code 200 OK", () => {
        return request(server)
            .get("/")
            .then(response => {
                expect(response.status).toBe(200);
            })
    });

    it("should return { api: 'it's working, it's working! }", () => {
        return request(server)
            .get("/")
            .then(response => {
                expect(response.body).toEqual({api: "it's working, it's working!"});
                expect(response.body.api).toBeDefined();
                expect(response.body.api).toBe("it's working, it's working!");
            });
    });
});

// test("environment test", () => {
//     expect(process.env.DB_ENV).toBe("testing");
//   });