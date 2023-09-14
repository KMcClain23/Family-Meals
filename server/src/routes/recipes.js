import express from 'express';
import multer from 'multer';
import { verifyToken } from './users.js';
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';




const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    try {
        const response = await RecipeModel.find({});
        res.json(response);
    } catch (err) {
        res.json(err);
    }
});

// router.post('/upload', upload.single('image'), (req, res) => {
//     const url = req.protocol + '://' + req.get('host')
//     const imageURL = url + '/uploads/' + req.file.filename;
//     res.status(200).json({
//         message: 'Image Uploaded Successfully!',
//         imageURL: imageURL
//     });
// });

router.post("/", verifyToken, async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        console.log(response);
        res.json(response);
    } catch (err) {
        console.log(err,"error")
        res.json(err);
    }
});

router.put("/", verifyToken, async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        res.json(err);
    }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        res.json({ savedRecipes: user?.savedRecipes }) ;
    } catch (err) {
        res.json(err)
    }
})

router.get("/savedRecipes/:userID", async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID)
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes }) ;
    } catch (err) {
        res.json(err)
    }
})

router.delete('/:recipeID', verifyToken, async (req, res) => {
    try {
        const userID = req.userId;
        const recipeID = req.params.recipeID;
        console.log(req)
        const user = await UserModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user.savedRecipes)
        user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeID);

        await user.save();

        res.json({ message: 'Recipe removed from saved recipes' });
    } catch (err) {
        console.error(err.message); 
        res.status(500).json({ message: 'Server error' });
    }
});

export { router as recipesRouter };