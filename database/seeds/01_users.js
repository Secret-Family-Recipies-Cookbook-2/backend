
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'lambda', password: "school", email: "lambdaschool@email.com"},
        {id: 2, username: 'blue', password: "sky", email: "bluesky@email.com"}
      ]);
    });
};
