const request = require('supertest');
const server = require('../api/server');

const db = require('../database/dbConfig');

const recipe = {
    title: 'Super Easy Cake in a Mug Recipe',
    source: 'Tasty',
    ingredients:
        "4 tablespoons flour,3 tablespoons sugar, 2 tablespoons cocoa powder,½ teaspoon baking powder,3 tablespoons milk,1 tablespoon oil, vegetable or canola,1 teaspoon vanilla extract,1 tablespoon chocolate hazelnut spread, plus more for topping",
    instructions: "12-ounce (375 ml) mug or larger, mix all ingredients (except the chocolate hazelnut spread) until just combined. Once combined, spoon the chocolate hazelnut spread on top of the batter. Microwave on high for 90 seconds to 2 minutes, watching to make sure it doesn’t spill over (depending on the size of the mug). Let cool one minute before eating. Top with additional chocolate hazelnut spread and powdered sugar (optional).",
    category: 'desert',
    user_id: 1
}
 
beforeEach(() => {
    return db.migrate
        .rollback()
        .then(() => db.migrate.latest())
        .then(() => db.seed.run())

}) 

//needs authentication from register and login for all crud testing. 
//Token auth needed

//GET

test("GET /api/recipes. Return array of recipes for logged in user", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })

    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "flavor", password: "vanilla" })

    const res = await request(server)
        .get("/api/recipes")
        .set("authorization", login.body.token);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toMatchObject({ id: 1 });
    expect(res.status).toBe(200);
})

test("GET /api/recipes/:id  Get recipe by id", async () => {
    const register = await request(server)
        .post("/api/auth/register")

        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")

        .send({ username: "flavor", password: "vanilla" })
    const res = await request(server)
        .get("/api/recipes/1")
        .set("authorization", login.body.token);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body).toHaveLength(1);
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})

test("GET /api/recipes/:id/user. Recipe created specifically by the user.", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "flavor", password: "vanilla" })

    const res = await request(server)
        .get("/api/recipes/1/user")
        .set("authorization", login.body.token);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("category");
    expect(res.body[0]).toHaveProperty("ingredients");
    expect(res.body[0]).toHaveProperty("instructions");
    expect(res.body[0]).toHaveProperty("source");
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//POST

test("POST /api/recipes/:id/user  Create new recipe from logged in user", async () => {
    const register = await request(server)
        .post("/api/auth/register")
        .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "flavor", password: "vanilla" })

    const res = await request(server)
        .post("/api/recipes/1/user")
        .send(recipe)
        .set("authorization", login.body.token);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty("title");
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("category");
    expect(res.body[0]).toHaveProperty("ingredients");
    expect(res.body[0]).toHaveProperty("instructions");
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//PUT

test("PUT /api/recipes/:id  Updates recipe by id from specific user's recipe list", async () => {
    // const register = await request(server)
    //     .post("/api/auth/register")
    //     .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "lambda", password: "password" })

    const res = await request(server)
        .put("/api/recipes/1")
        .send({...recipe, title: "Chocolate Cake in a Mug Recipe"})
        .set("authorization", login.body.token);
    expect(res.body).toBe(1);
    expect(res.type).toBe("application/json");
    expect(res.status).toBe(200);
})


//DELETE

test("DELETE /api/recipes:id   Deletes recipe by id from specific user's recipe list", async () => {
    // const register = await request(server)
    //     .post("/api/auth/register")
    //     .send({ username: "flavor", password: "vanilla", email: "flavor456@email.com" })
    const login = await request(server)
        .post("/api/auth/login")
        .send({ username: "lambda", password: "password" })

    const post = await request(server)
        .post('/api/recipes/1/user')
        .send(recipe)
        .set("authorization", login.body.token)

    const res = await request(server)
        .delete("/api/recipes/1")
        .send(recipe)
        .set("authorization", login.body.token);
    expect(res.type).toBe("application/json");
    expect(res.body.deleted).toBe(1);  //.deleted comes from recipes-router
    expect(res.status).toBe(200);
})