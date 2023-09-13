import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { Card, Col, Row, Button } from 'antd';
import '../App.css';
import 'antd/dist/reset.css';




export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,] = useCookies(["access_token"]);
    const navigate = useNavigate();    
    const userID = useGetUserID();

    useEffect(() => {

        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                if (response.data && Array.isArray(response.data.savedRecipes)) {
                    setSavedRecipes(response.data.savedRecipes);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setSavedRecipes([]);
                }
            } catch (err) {
                console.error(err);
                setSavedRecipes([]);
            }
        };

        fetchRecipe()

        if (cookies.access_token)
        fetchSavedRecipe()

    }, [cookies.access_token, userID]);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {recipeID, userID}, { headers: { Authorization: cookies.access_token }});
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.error(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes ? savedRecipes.includes(id) : false;

    const handleButtonClick = () => { navigate('/register'); };

    return (
        <div>
        <div className="hero-section">
        <div className="hero-content">
            <h1>Welcome to Our Recipe Page</h1>
            <p>Discover and Save Delicious Recipes</p>
            <Button type="primary" size="large" onClick={handleButtonClick}>
            Create a Recipe Now!
            </Button>
        </div>
    </div>
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {recipes.map((recipe) => (
                <Col xs={24} sm={12} md={8} lg={6} key={recipe._id}>
                    <Card className="recipe-card" bordered={false}>
                        <h2 className="recipe-title">{recipe.name}</h2>
                        <img className="recipe-image" src={recipe.imageURL} alt={recipe.name} />
                        <p>{recipe.instructions}</p>
                        <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                        <Button
                        type="primary"
                        onClick={() => saveRecipe(recipe._id)}
                        disabled={isRecipeSaved(recipe._id)}
                        >
                        {isRecipeSaved(recipe._id) ? "Saved" : "Save Recipe"}
                        </Button>
                    </Card>
                </Col>
                ))}
            </Row>
            </div>
        </div>
        );
    };