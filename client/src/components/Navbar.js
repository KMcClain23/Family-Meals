import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const logout = () => {
        setCookies("access_token", "");
        window.localStorage.clear();
        navigate("/Auth");
    };
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <Link to="/CreateRecipe">Create Recipe</Link>
        {!cookies.access_token ? (
            <Link to="/Auth">Login/Register</Link>
            ) : (
            <>
            <Link to="/SavedRecipes">Saved Recipes</Link>
            <button onClick={logout}> Logout </button>
            </>
        )}
        </div>
    );
    };