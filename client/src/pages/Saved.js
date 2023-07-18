import React, { useEffect, useState } from "react";
import { useGetUserID } from "../Hooks/useGetUserID";
import axios from "axios";
import { url } from "./Home";
import { Link } from "react-router-dom";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(`${url}/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchSavedRecipes();
    }, []);

    return (savedRecipes[0]) ? (  // savedRecipes is not a data but an array of data so [0]
        <div>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div className="savedcard">
                            <Link to={`/${recipe._id}`}>
                                <h2 style={{ marginBottom: '0' }}>{recipe.name}</h2>
                            </Link>
                            <p style={{ marginTop: '0' }}>{recipe.instructions}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <h2 style={{ color: 'white',marginTop:'5rem' }}>Loading...</h2> // this is a loading logic, we can put a loading gif here as well
    )
};
