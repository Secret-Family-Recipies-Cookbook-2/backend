
exports.up = function(knex) {
  return knex.schema
    //users
    .createTable('users', tbl=>{
        tbl.increments();
        tbl.string('username',50).notNullable().unique().index();
        tbl.string('password',50).notNullable();
        tbl.string('email').notNullable().unique();
    })
    .createTable('recipes',tbl=>{
        tbl.increments();
        tbl.string('title').notNullable().index().unique();
        tbl.string('source').notNullable().index();
        tbl.string('ingredients').notNullable();
        tbl.string('instructions').notNullable();
        tbl.string('category').notNullable().index();

        //foreign key
        tbl.integer('user_id')
            .unsigned().notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists('recipes')
  .dropTableIfExists('users')
};
