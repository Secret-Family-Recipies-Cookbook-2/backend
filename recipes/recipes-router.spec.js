const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig');

beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())

})

//needs authentication from login--do register and login for all crud testing. 
//Token auth needed

//GET

test("GET /api/recipes. Return array of recipes for logged in user", async () => {
    const res = await request(server)
    .get("/api/recipes")
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})

test("GET /api/recipes/:id  Get recipe by id", async () => {
    const res = await request(server)
    .get("/api/recipes/:id")
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})

test("GET /api/recipes/:id/user. Recipe created specifically by the user.", async () => {
    const res = await request(server)
    .get("/api/recipes/:id/user")
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


  //Post

test("POST /api/recipes/:id/user  Create new recipe from logged in user", async()=>{
    const res = await request(server)
    .post("/api/recipes")
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//Update

test("PUT /api/recipes/:id  Updates recipe by id from specific user's recipe list", async()=>{
    const res = await request(server)
    .put("/api/recipes/:id")
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//Delete

test("DELETE /api/recipes:id   Deletes recipe by id from specific user's recipe list",async()=>{
    const res = await request(server)
    .put("/api/recipes/:id")
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})