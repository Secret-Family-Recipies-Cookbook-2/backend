const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/recipes";

module.exports = {
  development: {
      client: 'sqlite3',
      connection: {
          filename: './database/familyRecipes.db3'
      },
      useNullAsDefault: true,
      migrations: {
          directory: './database/migrations'
      },
      seeds: {
          directory: './database/seeds'
      },
      pool: {
          afterCreate: (conn, done) => {
              conn.run('PRAGMA foreign_keys = ON', done);
          }
      },
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.db3", // "./database/test.db3" or ":memory:"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
    },
  },

  //heroku postgres or sqlite
  production: {
    client: 'postgresql',
    connection: {
        database: 'my_db',
        user: 'username',
        password: 'password'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
}

};