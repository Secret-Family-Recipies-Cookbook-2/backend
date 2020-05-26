const express = require('express');

const Recipes = require('../recipes/recipes-model.js');

const router = require('express').Router();

//GET request- returns array of recipes with no auth token needed.
router.get('/',(req,res)=>{
    Recipes.findAll()
    .then(recipes=>{
        res.status(200).json(recipes)
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "Sorry, encountered an error in retrieving recipes."})
    })
})

module.exports = router;