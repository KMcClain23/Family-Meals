

import axios from 'axios';


async function getNutrients(ingredients) {
    const api_key = '2d8bf72605fd14dcdc1a97bde0067ebf';
    const app_id = 'e033f46a';
    const url = `https://api.edamam.com/api/nutrition-details?app_id=${app_id}&app_key=${api_key}`;
    const headers = { 'Content-Type': 'application/json' };

    const payload = JSON.stringify({
        title: 'something',
        ingr: ingredients
    });

    try {
        const response = await axios.post(url, payload, { headers });
        const info = response.data;
        const all_ingr = info.ingredients;
    
        let carbs = 0;
        let fat = 0;
        let protein = 0;
        let fiber = 0;

    for (let i = 0; i < all_ingr.length; i++) {
        carbs += all_ingr[i].parsed[0].nutrients.CHOCDF?.quantity || 0;
        fat += (all_ingr[i].parsed[0].nutrients.FAT?.quantity || 0) + (all_ingr[i].parsed[0].nutrients.FASAT?.quantity || 0);
        protein += all_ingr[i].parsed[0].nutrients.PROCNT?.quantity || 0;
        fiber += all_ingr[i].parsed[0].nutrients.FIBTG?.quantity || 0;
    }

    const nutrients = [`Carbs: ${carbs} `, `Fat: ${fat}`, `Protein ${protein}`,` Fiber: ${fiber}`];

        return Promise.resolve(nutrients); 
    } catch (error) {
        console.error(error);
        return Promise.reject(error); 
    }
}

export default getNutrients;