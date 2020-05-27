const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig');

afterEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        // .then(() => db.seed.run())

})

//POST  Register
test("POST /api/auth/register   Check if register working", async () => {
    const res = await request(server)
        .post('/api/auth/register')
        .send({ username: "cotton", password: "candy", email: "cottoncandy@123email.com"})
    expect(res.body.data).toMatchObject({ username: "cotton", email: "cottoncandy@123email.com"})
    expect(res.body.password).not.toBe("password")
    expect(res.status).toBe(201)
})



//POST Login  
test("POST /api/auth/login   Check if login successful", async () => {
    const register = await request(server)
        .post('/api/auth/register')
        .send({ username: "cotton", password: "candy", email: "cottoncandy123@email.com" })

    const login = await request(server)
        .post('/api/auth/login')
        .send({ username: "cotton", password: "candy" })
    expect(login.body).toHaveProperty("token")
    expect(login.body).toMatchObject({ message: "Welcome to our Secret Family Recipes API" })
    expect(login.status).toBe(200);
})