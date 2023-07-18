import { useParams } from "react-router-dom";
import { url } from "./Home";
import { useEffect, useState } from "react";
import axios from 'axios'
import './recipepage.css'

export const RecipePage = () => {

    const [recipeInfo, setRecipeInfo] = useState('');
    const { id } = useParams();

    const fetchRecipe = async () => {
        try {
            const response = await axios.get(`${url}/recipes/${id}`)
            setRecipeInfo(response.data)
        } catch (er) {
            console.log(er)
        }
    }

    useEffect(() => {
        fetchRecipe();
    }, [])

    return (recipeInfo) ? (
        <div>
            <div style={{ marginTop: '10px' }} className="card">
                <h1>{recipeInfo.name}</h1>
                <h6>@<span style={{color:'blue'}}>{recipeInfo.userOwner}</span></h6>
                <p>{recipeInfo.instructions}</p>
            </div>
        </div>
    ) : (
        <h2 style={{color: 'white',marginTop:'5rem'}}>Loading...</h2>
    )
}