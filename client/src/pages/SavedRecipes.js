import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { Card, Col, Row, Button } from 'antd';
import 'antd/dist/reset.css';

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,] = useCookies(["access_token"]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`, {
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
            await axios.delete(`http://localhost:3001/recipes/${recipeID}`, { headers: { Authorization: cookies?.access_token } });
            setSavedRecipes(savedRecipes.filter(recipe => {
                return recipe._id !== recipeID;
            }));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="site-card-wrapper">
            <Row gutter={16}>
                {savedRecipes.map((recipe) => {
                    return (
                    <Col xs={24} sm={12} md={8} lg={6} key={recipe._id}>
                        <Card className="recipe-card" bordered={false}>
                            <h2 className="recipe-title">{recipe.name}</h2>
                            <img className="recipe-image" src={recipe.imageURL} alt={recipe.name} />
                            <p>{recipe.instructions}</p>
                            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
                            <Button type="primary" onClick={() => { removeRecipe(recipe._id)}}>Remove Recipe</Button>
                        </Card>
                    </Col>
                    );
                })}
            </Row>
        </div>
    );
};
