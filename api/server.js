const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

//auth middleware
const authenticate = require('../auth/auth-middleware.js');

const authRouter = require('../auth/auth-router.js');
const recipesRouter = require('../recipes/recipes-router.js');
const mockRouter = require('../mock/mock-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/recipes', authenticate, recipesRouter);
server.use('/api/mock',mockRouter);

server.get("/", (req,res)=>{
    res.json({api: "it's working, it's working!"})
})

module.exports = server;