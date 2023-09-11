import axios from "axios";
import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Space, Typography, InputNumber } from "antd";

export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [cookies,] = useCookies(["access_token"]);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageURL: "https://via.placeholder.com/600x400",
        cookingTime: 0,
        userOwner: userID,
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
    };

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const addIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
    };
    console.log(recipe);

    const onSubmit = async (event) => {
        // event.preventDefault();
        console.log("In Submit");
        try {
        await axios.post("http://localhost:3001/recipes", recipe, {
            headers: { Authorization: cookies.access_token },
        });
        alert("Recipe Created");
        navigate("/");
        } catch (err) {
        console.error(err);
        }
    };

    const [form] = Form.useForm();
    return (
        <div className="CreateRecipe">
        <h2>Create Recipe</h2>
            {/* <form onSubmit={onSubmit}>
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
            </form> */}
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="CreateRecipe"
            style={{ maxWidth: 600 }}
            autoComplete="off"
            initialValues={{ items: [{}] }}
            onFinish={onSubmit}
        >
        <Form.Item label="Recipe Name"  tooltip="What is the name of your new Recipe?" rules={[{ required: true }]} >
            <Input name="name" onChange={handleChange} />
        </Form.Item>

        <Form.List name="ingredients">
            {(ingredients, { add, remove }) => (
                <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }} >
                {ingredients.map((ingredient, idx) => (
                    <Card size="small" title="Money" key={ingredient.key} extra={ <CloseOutlined onClick={() => { remove(ingredient.name); }} />}>
                    
                    <Form.Item label={`Ingredient ${ingredient.name + 1}`} > 
                        <Input name={[ingredient.name, "name"]} onChange={(event) => handleIngredientChange(event, idx)}/> 
                    </Form.Item>

                    </Card>))}
                <Button type="dashed" onClick={() => add()} block>
                    + Add Item
                </Button>
                </div>
                        )}
        </Form.List>
        
        <Form.Item label="Recipe Instructions"  tooltip="How do I make this?" rules={[{ required: true }]}>
            <Input.TextArea name='instructions' onChange={handleChange}/>
        </Form.Item>

        <Form.Item label="Meal Photo"  tooltip="How should it look when finished?" rules={[{ required: false }]} >
            <Input name="imageURL" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Cook Time" tooltip="How many minutes will this take?" rules={[{ required: true }]}>
            <Input name="cookingTime" onChange={handleChange}/>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit">
                Create Recipe
            </Button>
        </Form.Item>
        </Form>

    </div>
    );
};




