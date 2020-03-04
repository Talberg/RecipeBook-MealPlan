import React, { useState, useEffect } from "react";
import API from "../utils/API"
import axios from "axios"


function MealPlan(){
const [recipeList, setRecipeList] = useState([])
const [user, setUser] = useState({
  loggedIn: false,
  user: {}
})

function loadRecipe() {
  axios.get("/api/recipe/all")
      .then(res => {
          console.log(res)
          setRecipeList(res.data)

      }

      )
      .catch(err => console.log(err));
};
      
      useEffect(() => {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                setUser({
                    loggedIn: true,
                    user: user.data.user
                });
                console.log(user.data)
            }
        },
            loadRecipe(),
            console.log(recipeList))
    }, [])





    return (
        <><label for="states" id="state-label">Type and choose a state:</label>
    <div class="row">
      <input class="col s10" list="states-drop-down" id="states" name="states" />
      <a id="button" class="waves-effect waves-light btn col s2">search</a>
    </div>
    <datalist id="states-drop-down">
      <select>
       {recipeList.map(option =>{
           return(<option>{option.title}</option>)
       })}
      </select>
    </datalist></>
    )
}

export default MealPlan