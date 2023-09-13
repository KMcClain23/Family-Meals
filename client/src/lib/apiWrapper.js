// import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config()

// async function getNutrients(ingredients) {

// const api_key = process.env.API_KEY;
// const app_id = process.env.APP_ID;
// const url = `https://api.edamam.com/api/nutrition-details?app_id=${app_id}&app_key=${api_key}`;
// const headers = { 'Content-Type': 'application/json' };

//     const payload = JSON.stringify({
//         title: 'something',
//         ingr: ingredients
//     });
    
    
//     await axios.post(url, payload, { headers })
//         .then(response => {
//         const info = response.data;
//         const all_ingr = info.ingredients;
        
//         let carbs = 0;
//         let fat = 0;
//         let protein = 0;
//         let fiber = 0;
    
//         for (let i = 0; i < all_ingr.length; i++) {
//             carbs += all_ingr[i].parsed[0].nutrients.CHOCDF?.quantity || 0;
//             fat += (all_ingr[i].parsed[0].nutrients.FAT?.quantity || 0) + (all_ingr[i].parsed[0].nutrients.FASAT?.quantity || 0);
//             protein += all_ingr[i].parsed[0].nutrients.PROCNT?.quantity || 0;
//             fiber += all_ingr[i].parsed[0].nutrients.FIBTG?.quantity || 0;
//         }
    
//         const nutrient_dict = {
//             carbs: carbs,
//             fat: fat,
//             protein: protein,
//             fiber: fiber
//         };
//         const nutrients = Object.entries(nutrient_dict)

//         return nutrients;
//     })
//         .catch(error => {
//         console.error(error);
//     });
// }

// export default getNutrients