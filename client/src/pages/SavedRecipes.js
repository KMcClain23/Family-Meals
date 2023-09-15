import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { Card, Col, Row, Button, Collapse } from 'antd';
import 'antd/dist/reset.css';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,] = useCookies(["access_token"]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`https://family-recipe-server.onrender.com/recipes/savedRecipes/${userID}`, {
                    headers: {
                        'Authorization': cookies.access_token
                    }
                });
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSavedRecipe();
    }, [userID]);

    const removeRecipe = async (recipeID) => {
        try {
            await axios.delete(`https://family-recipe-server.onrender.com/recipes/${recipeID}`, { headers: { Authorization: cookies?.access_token } });
            setSavedRecipes(savedRecipes.filter(recipe => {
                return recipe._id !== recipeID;
            }));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="site-card-wrapper">
            <Row gutter={16}>
                {savedRecipes.map((recipe) => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={6} key={recipe._id}>
                            <Card className="recipe-card" bordered={false}>
                                <h1 className="recipe-title">{recipe.name}</h1>
                                <img className="recipe-image" src={recipe.imageURL} alt={recipe.name} />
                                <h2>Instructions: </h2><p>{recipe.instructions}</p>
                                <h2>Cooking Time:</h2> <h3>{recipe.cookingTime} minutes</h3>
                                <Collapse ghost>
                                    <Collapse.Panel key="1" header="Nutrients">
                                        {recipe.nutrients && recipe.nutrients.map((nutrient, index) => (
                                            <p key={index}>{nutrient}</p>
                                        ))}
                                    </Collapse.Panel>
                                </Collapse>
                                <Button type="primary" onClick={() => { removeRecipe(recipe._id)}}>Remove Recipe</Button>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Card>
    );
};
