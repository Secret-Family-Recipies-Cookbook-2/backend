const express = require('express');

const Recipes = require('./recipes-model');
const Users = require('../users/users-model');

const router = require('express').Router();

//GET request-returns array for recipes from login token
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

// GET  recipes by id from recipes list
router.get('/:id',(req,res)=>{
    const { id } = req.params;

    Recipes.findById(id)
    .then((recipes)=>{
        //if(recipes)
        if(recipes.length){
            res.status(200).json(recipes)
        }else{
            res.status(404).json({errorMessage: "Could not find recipe by that id."})
        }
    })
    .catch((err)=>{
        res.status(500).json({errorMessage: "Sorry, could not retrieve recipes data."})
    })
})

//GET recipe created specifically by the user. 
router.get('/:id/user/',(req,res)=>{
    const { id } = req.params;

    Users.getUsersRecipes(id)
    .then(recipe=>{
        if(recipe){
            res.status(200).json(recipe)
        }else{
            res.status(404).json({errorMessage: "Could not find recipe by that id."})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({errorMessage: "Sorry, failed to get the recipe made by user."})
    })
})


//POST request- creates a new recipe from validated user
router.post('/:id/user',(req,res)=>{
    const newRecipe = req.body;
    const { id } = req.params;

    Recipes.addRecipe(newRecipe, id)
    .then((newRecipe)=>{
        res.status(200).json(newRecipe)
    })
    .catch((err)=>{
        console.log(err)
        res.status(400).json({errorMessage:
             "Please make sure that title, source, ingredients, instructions, and category are present."})
    })
})

// router.post('/:id/user',(req,res)=>{
//     const newRecipe = req.body;

//     Recipes.addRecipe(newRecipe)
//     .then((newRecipe)=>{
//         res.status(200).json(newRecipe)
//     })
//     .catch((err)=>{
//         console.log(err)
//         res.status(400).json({errorMessage:
//              "Please make sure that title, source, ingredients, instructions, and category are present."})
//     })
// })

//PUT request- updates the recipe by id from the specific user's recipe list
router.put('/:id',(req,res)=>{
    const { id } = req.params;
    const changes =req.body;

    Recipes.findById(id)
    .then(recipe=>{
        //if(recipe)
        if(recipe.length){
            Recipes.update(changes, id)
            .then(updatedRecipe=>{
                res.status(200).json(updatedRecipe)
            });
        }else{
            res.status(404).json({errorMessage: "Could not find recipe with given id"})
        }
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "Failed to update changes to recipe."})
    })

})

//DELETE request- remove a recipe by id from the specific user's recipe list

router.delete('/:id', (req,res)=>{
    const { id } = req.params;

    Recipes.remove(id)
    .then(deleted=>{
        if(deleted){
            res.status(200).json({deleted})
        }else{
            res.status(404).json({errorMessage: "Could not find recipe with given id"})
        }
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "Failed to delete recipe."})
    })
})

module.exports = router;