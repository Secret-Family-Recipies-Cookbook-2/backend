
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'lambda', email: "lambdaschool@email.com",password:hashPassword('password')},
        {username: 'blue',  email: "bluesky@email.com",password: hashPassword('password')}
      ]);
    });
};

const hashPassword = password => {
  const bcrypt = require('bcryptjs');
  const rounds = 8;
  const hash = bcrypt.hashSync(password, rounds);
  return hash;
};