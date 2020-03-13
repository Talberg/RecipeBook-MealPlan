import React, { useState, useEffect } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link,useParams } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Button } from 'reactstrap'

import axios from "axios"



function MealPlan() {
  const {id} = useParams()
    // Setting our component's initial state
    const [mealplans, setMealPlans] = useState([])
    const [currentPlan, setCurrentPlan] = useState()
    const [user, setUser] = useState({
        loggedIn: false,
        user: {}
    })
    const [formObject, setFormObject] = useState({})





    // Load all books and store them with setBooks
    useEffect(() => {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                setUser({
                    loggedIn: true,
                    user: user.data.user
                });
                loadRecipe()
              
                console.log(user.data)

            }
        },
         )
            console.log(mealplans)
            console.log(currentPlan)
    }, [])





    // Loads all books and sets them to books


    function loadRecipe(){

      axios.get(`/api/recipe/${id}`)
    
      .then(res=>{
        console.log(id)
        console.log(res)
      const newValue = res.data
      setMealPlans(res.data)
      
        
      }).then(()=>{console.log(mealplans)})
     
    
    }

  

    // Deletes a book from the database with a given id, then reloads books from the db
   


    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };


    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
 ;

    return (





      
      <div>
      {user.loggedIn ? (<>
<>{mealplans.ingredients ? (<div className="  row mt-3"><div className= " mt-3 p-5   bg-info col-6 offset-3 recipecard card ">
  
  <div className="card-body">
    <h3 className="card-title p-5   font  bg-warning text-center">{mealplans.title}</h3>
    <br></br>
    <hr></hr>
    <br></br>
    <ul className="font text-light">{mealplans.ingredients.map(res=>{
      return(
      <li>{res}</li>
      )
    })}</ul>
    <a href={mealplans.instructions} className="btn btn-danger">Go to Instructions</a>
  </div>
  
</div></div>):(<></>)}

       </></>) : (
             <><div className=" text-center mt-3 row">
             <div className="card col-6 offset-3 mt-3  plan noLogged">
                  <div className="card-body"><h1 >Please log in!</h1></div>
                 <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block >Login</Button></Link></div></div>
             </>
          )}
  </div>







    );
}


export default MealPlan;