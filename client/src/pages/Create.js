import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { url } from "./home";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    instructions: "",
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${url}/recipes`, { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2 className="foh2">Add </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Title</label>
        <input
          type="text"
          id="name"
          name="name"
          value={recipe.name}
          onChange={handleChange}
        />

        <label htmlFor="instructions">Description</label>
        <textarea
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
        ></textarea>
        <button className='submit'type="submit">Create </button>
      </form>
    </div>
  );
};
