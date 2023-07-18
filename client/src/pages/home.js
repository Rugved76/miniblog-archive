import "../App.css";
import React, { useEffect, useState } from "react";
import { useGetUserID } from "../Hooks/useGetUserID";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
export const url = `http://localhost:3001`


export const Home = () => {

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);

    const userID = useGetUserID();

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(`${url}/recipes`);
            setRecipes(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchSavedRecipes = async () => {
        try {
            const response = await axios.get(`${url}/recipes/savedRecipes/ids/${userID}`);
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRecipes();
        fetchSavedRecipes();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(`${url}/recipes`, {
                recipeID,
                userID,
            });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    const deleterecipe = async (id) => {
        try {
            await axios.delete(`${url}/recipes/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (recipes[0]) ? (
        <div>
            <ul className="ul">
                {recipes.map((recipe) =>
                (
                    <li className="li" key={recipe._id}>
                        <div className="card">

                            <Link className="textdata" to={`/${recipe._id}`}>
                                <h2>{recipe.name}</h2>
                            </Link>

                            <p className="inst">{recipe.instructions}</p>

                            <button className="submit"
                                onClick={() => saveRecipe(recipe._id)}
                                disabled={isRecipeSaved(recipe._id)}
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>

                            <button
                                className="submit"
                                onClick={() => deleterecipe(recipe._id)}>
                                DEL
                            </button>
                        </div>
                    </li>
                )
                )}
            </ul>
        </div>
    ) : (
        <h2 style={{ color: 'white', marginTop: '5rem' }}>Loading...</h2>
    )

};
