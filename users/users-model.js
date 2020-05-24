const db = require('../database/dbConfig');

module.exports ={
    add,
    findByUserId, 
    find, 
    findBy,
    getUsersRecipes

}

function findBy(filter){
    return db('users').where(filter);
}


function find(){
    return db('users').select( 'username', 'password', 'email')
}

function add(user){
    return db('users').insert(user)
    .then(ids=>{
        return db('users').where({id: ids[0]}).first()
    })
}

function findByUserId(id){
    return db('users').where({id}).first();
}

function getUsersRecipes(id){
    return db('recipes as r')
    .select('r.id', 'r.title', 'r.category','r.instructions', 'r.source')
    .where('r.user_id', id)
    .orderBy('r.user_id', id);
}