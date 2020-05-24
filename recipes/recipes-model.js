const db = require('../database/dbConfig');

module.exports ={
    findAll,
    findById,
    addRecipe,
    update,
    remove
}

// function findAll(){
//     return db('recipes')
// }

function findAll(){
    return db.select ("*")
    .from("recipes")
}


function findById(id){
    return db.select ('*')
    .from("recipes")
    .where({id})  
}

function addRecipe(recipe){
    return db('recipes')
    .insert(recipe)
    .then(ids=>{
        return findById(ids[0])
    })
}

function update (changes, id){
    return db("recipes")
    .where({id})
    .update(changes)
}

function remove(id){
    return db ("recipes")
    .where({id})
    .del()
}