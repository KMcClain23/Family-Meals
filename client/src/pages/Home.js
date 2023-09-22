import axios from "axios";
import Joyride from 'react-joyride';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";
import { Card, Col, Row, Button, Collapse } from 'antd';
import '../App.css';
import 'antd/dist/reset.css';

export const Home = ({ isDarkMode}) => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,] = useCookies(["access_token"]);
    const navigate = useNavigate();    
    const userID = useGetUserID();
    const [firstVisit, setFirstVisit] = useState(false);

    const steps = [
        {
            target: '.login-signup-button',
            content: 'Click here to login or signup!',
            placement: 'top',
        },
        {
            target: '.recipe-title',
            content: 'Here you can view the recipes that you and others have submitted.',
            placement: 'top',
        },
        {
            target: '.login-save-button',
            content: 'Login to save a recipe!',
            placement: 'right',
        },
        // add more steps as needed
    ];

    useEffect(() => {
        // check if it's the user's first visit
        if (!localStorage.getItem('visited')) {
            setFirstVisit(true);
            localStorage.setItem('visited', 'true');
        }

        const fetchRecipe = async () => {
        try {
            const response = await axios.get("https://family-recipe-server.onrender.com/recipes");
            setRecipes(response.data);
        } catch (err) {
            console.error(err);
        }
        };

        const fetchSavedRecipe = async () => {
        try {
            const response = await axios.get(`https://family-recipe-server.onrender.com/recipes/savedRecipes/ids/${userID}`);
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
        const response = await axios.put("https://family-recipe-server.onrender.com/recipes", {recipeID, userID}, { headers: { Authorization: cookies.access_token }});
        setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
        console.error(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes ? savedRecipes.includes(id) : false;

    const handleButtonClick = () => { navigate('/login'); };

    return (
        <div>
            {firstVisit && <Joyride steps={steps} continuous={true} />}
            <div className={`hero-section ${isDarkMode ? 'dark' : 'light'}`}>
                <div className="hero-content">
                <h1>Welcome to Family Meals</h1>
                <p>Discover and Save Delicious Recipes</p>
                {cookies.access_token ? null : 
                    <Button type="primary" size="large" onClick={handleButtonClick} className="login-signup-button">
                    Login or Signup to Create a Recipe!
                    </Button>
                }
                </div>
            </div>
            <Card className="">
                <Row gutter={16}>
                    {recipes.map((recipe) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={recipe._id} style={{ display: 'flex' }}>
                        <Card className="" bordered={false} style={{ margin: '20px', flex: 1 }}>
                            <h1 className="recipe-title">{recipe.name}</h1>
                            <img className="recipe-image" src={recipe.imageURL} alt={recipe.name} />
                            <h2>Instructions: </h2><p>{recipe.instructions}</p>
                            <h2>Cooking Time:</h2> <h3>{recipe.cookingTime} minutes</h3>
                            <Collapse ghost>
                            <Collapse.Panel key="1" header="Nutrients">
                                {recipe.nutrients && recipe.nutrients.map((nutrient, index) => (
                                <p key={index}>{nutrient}g</p>
                                ))}
                            </Collapse.Panel>
                            </Collapse>
                            <Button
                            type="primary"
                            onClick={() => saveRecipe(recipe._id)}
                            className="login-save-button"
                            disabled={!cookies.access_token || isRecipeSaved(recipe._id)}
                            >
                            {cookies.access_token ? (isRecipeSaved(recipe._id) ? "Saved" : "Save Recipe") : "Login to Save"}
                            </Button>
                        </Card>
                        </Col>
                    ))}
                </Row>
            </Card>
            </div>
    );
};