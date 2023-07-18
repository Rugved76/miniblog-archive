import express from "express";
import mongoose from "mongoose";
import { RecipesModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await RecipesModel.find({});
    res.status(200).json(result);
    console.log('\nHome page loaded with posts...')
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new recipe
router.post("/", verifyToken, async (req, res) => {
  const recipe = new RecipesModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    instructions: req.body.instructions,
    userOwner: req.body.userOwner,
  });
  console.log(recipe);

  try {
    const result = await recipe.save();
    res.status(201).json({
      createdRecipe: {
        name: result.name,
        instructions: result.instructions,
        _id: result._id,
      },
    });
    console.log('\nCreated post successfully...')
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Recipe
router.put("/", async (req, res) => {
  const recipe = await RecipesModel.findById(req.body.recipeID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({ savedRecipes: user.savedRecipes });
    console.log('\nPost saved successfully...')
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedRecipes = await RecipesModel.find({
      _id: { $in: user.savedRecipes },
    });

    console.log('\nFetched saved posts successfully...');
    res.status(201).json({ savedRecipes });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Single post page

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await RecipesModel.findById(id)
    console.log('\n\nFetched successfully...\n')
    console.log(recipe)
    res.status(200).json(recipe);
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const recipe = await RecipesModel.findByIdAndDelete({_id:req.params});

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    console.log('\n\nDeleted post successfully...\n');
    console.log(recipe);

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});


export { router as recipesRouter };
