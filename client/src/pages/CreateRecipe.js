import axios from "axios";
import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";


export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [cookies,] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageURL: "",
        cookingTime: 0,
        userOwner: userID,
    });

const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({...recipe, [name]: value });
    }

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients });
    }

    const addIngredient = () => {
        setRecipe({...recipe, ingredients: [...recipe.ingredients, ""] });
    };
    console.log(recipe);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/recipes", recipe, { headers: { Authorization: cookies.access_token }});
            alert("Recipe Created");
            navigate("/")
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="CreateRecipe">
            <h2>Create Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" onChange={handleChange}/>
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, idx) => (
                    <input key={idx} type="text" name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, idx)}/>
                ))}
                <button onClick={addIngredient} type="button">Add Ingredient</button>
                <label htmlFor="instructions">Instructions</label>
                <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>
                <label htmlFor="imageURL">Image Url</label>
                <input type="text" id="imageURL" name="imageURL" onChange={handleChange}/>
                <label htmlFor="cookingTime">Cooking Time (minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
};