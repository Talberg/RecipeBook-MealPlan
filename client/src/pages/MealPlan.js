import React, { useState, useEffect } from "react";
import API from "../utils/API"
import axios from "axios"

import { Button } from 'reactstrap'
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";

function MealPlan(){
const [recipe, setRecipe] =useState({
  title:"",
  monday:"",
  tuesday:"",
  wednesday:"",
  thursday:"",
  friday:"",
  saturday:"",
  sunday:""
})
const [recipeList, setRecipeList] = useState([])
const [user, setUser] = useState({
  loggedIn: false,
  user: {}
}) 


function handleSubmit(event){
event.preventDefault()
axios.post("/api/mealplan/new", recipe )
}


function handleInputChange(event) {
  const { name, value } = event.target;
  setRecipe({...recipe, [name]: value })
  console.log(recipe)
};

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





    return (<div>
      {user.loggedIn ? (
        <>
          <div className="form-group">
    <label for="exampleFormControlInput1">Recipe Title</label>
    <input name='title' onChange={handleInputChange}  value={recipe.title} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
  </div>
             
        <div class="form-group ">
        <label for="inputState">Monday </label>
        <select id="inputState" name='monday' value={recipe.monday} onChange={handleInputChange} class="form-control">
          <option selected>Select one...</option>
          {recipeList.map(option =>{
               return(<option>{option.title}</option>)
           })}
          
        </select>
      </div>
        <div class="form-group ">
        <label for="inputState">Tuesday </label>
        <select id="inputState" name='tuesday' value={recipe.tuesday} onChange={handleInputChange} class="form-control">
          <option selected>Select one...</option>
          {recipeList.map(option =>{
               return(<option>{option.title}</option>)
           })}
          
        </select>
      </div>
        <div class="form-group ">
        <label for="inputState">Wednesday </label>
        <select id="inputState" name='wednesday' value={recipe.wednesday} onChange={handleInputChange} class="form-control">
          <option selected>Select one...</option>
          {recipeList.map(option =>{
               return(<option>{option.title}</option>)
           })}
          
        </select>
      </div>
        <div class="form-group ">
        <label for="inputState">Thursday </label>
        <select id="inputState" name='thursday' value={recipe.thursday} onChange={handleInputChange} class="form-control">
          <option selected>Select one...</option>
          {recipeList.map(option =>{
               return(<option>{option.title}</option>)
           })}
          
        </select>
      </div>
        <div class="form-group ">
        <label for="inputState">Friday </label>
        <select id="inputState" name='friday' value={recipe.friday} onChange={handleInputChange} class="form-control">
          <option selected>Select one...</option>
          {recipeList.map(option =>{
               return(<option>{option.title}</option>)
           })}
          
        </select>
      </div>
        <div class="form-group ">
        <label for="inputState">Saturday </label>
        <select id="inputState" name='saturday' value={recipe.saturday} onChange={handleInputChange} class="form-control">
          <option selected>Select one...</option>
          {recipeList.map(option =>{
               return(<option>{option.title}</option>)
           })}
          
        </select>
      </div>
        <div class="form-group ">
        <label for="inputState">Sunday </label>
        <select id="inputState" name='sunday' value={recipe.sunday} onChange={handleInputChange} class="form-control">
          <option selected>Select one...</option>
          {recipeList.map(option =>{
               return(<option >{option.title}</option>)
           })}
          
        </select>
      </div>
      <button onClick={handleSubmit}  > Submit Plan</button>
      
           </>
      ) : (
              <div className="noUser">
      
                  <>
                      <h1 >Please log in!</h1>
                      <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block >Login</Button></Link>
                  </>
      
      
      
              </div>
          )}
      </div>
    )
}

export default MealPlan