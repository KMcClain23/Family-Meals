import axios from "axios";
import { green } from '@ant-design/colors'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import getNutrients from "../lib/apiWrapper.js";
import { useGetUserID } from "../hooks/useGetUserID";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageURL: "https://via.placeholder.com/600x400",
    cookingTime: 0,
    nutrients: [],
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

  const onSubmit = async () => {
    try {
      const nutrients = await getNutrients(recipe.ingredients);
      recipe.nutrients = nutrients;
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { Authorization: cookies.access_token },
      });
      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const [form] = Form.useForm();
  return (
    <div className="CreateRecipe" style={{ backgroundColor: "cornflowerblue", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
      <h2>Create Recipe</h2>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        form={form}
        name="CreateRecipe"
        style={{ maxWidth: 600, width: "100%", padding: "20px" }}
        autoComplete="off"
        initialValues={{ items: [{}] }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Recipe Name"
          tooltip="What is the name of your new Recipe?"
          rules={[{ required: true }]}
          className="custom-label"
        >
          <Input name="name" onChange={handleChange} />
        </Form.Item>

        <Form.List name="ingredients">
          {(ingredients, { add, remove }) => (
            <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
              {ingredients.map((ingredient, idx) => (
                <Card
                  size="small"
                  title={`Ingredient ${ingredient.name + 1}`}
                  key={ingredient.key}
                  extra={
                    <CloseOutlined
                      onClick={() => {
                        remove(ingredient.name);
                      }}
                    />
                  }
                >
                  <Form.Item label={`Ingredient ${ingredient.name + 1}`}>
                    <Input
                      name={[ingredient.name, "name"]}
                      onChange={(event) => handleIngredientChange(event, idx)}
                    />
                  </Form.Item>
                </Card>
              ))}
              <Button type="dashed" onClick={() => add()} block style={{ width: "50%", margin: "0 auto", marginTop: "16px", marginBottom: "16px" }}>
                + Add Ingredient
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item
          label="Recipe Instructions"
          tooltip="How do I make this?"
          rules={[{ required: true }]}
          className="custom-label"
        >
          <Input.TextArea name="instructions" onChange={handleChange} style={{ width: '100%', minHeight: '200px' }}/>
        </Form.Item>

        <Form.Item
          label="Meal Photo"
          tooltip="How should it look when finished?"
          rules={[{ required: false }]}
          className="custom-label"
        >
          <Input name="imageURL" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Cook Time"
          tooltip="How many minutes will this take?"
          rules={[{ required: true }]}
          className="custom-label"
        >
          <Input name="cookingTime" onChange={handleChange} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
>
            Create Recipe
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
