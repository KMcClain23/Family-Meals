<Col xs={24} sm={12} md={8} lg={6} key={recipe._id}>
                        <Card className="recipe-card" bordered={false}>
                        <h1 className="recipe-title">{recipe.name}</h1>
                        <img className="recipe-image" src={recipe.imageURL} alt={recipe.name} />
                        <h2>Instructions: </h2><p>{recipe.instructions}</p>
                        <h2>Cooking Time: {recipe.cookingTime} minutes</h2>
                        {recipe.nutrients && recipe.nutrients.map(([nutrient, value]) => (
                            <p>{nutrient}: {value}</p>
                        ))}
                        <Button type="primary" onClick={() => { removeRecipe(recipe._id)}}>Remove Recipe</Button>
                    </Card>