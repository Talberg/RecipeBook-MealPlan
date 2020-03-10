import React, { useState, useEffect } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { Button } from 'reactstrap'

import axios from "axios"
import "./style.css"


function Book() {
    // Setting our component's initial state
    const [recipes, setRecipes] = useState([])
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
                console.log(user.data)
            }
        },
            loadRecipe())
    }, [])





    // Loads all books and sets them to books
    function loadRecipe() {
        axios.get("/api/recipe/all")
            .then(res => {
                console.log(res)
                setRecipes(res.data)
            }

            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteRecipe(recipe) {
        axios.post("api/recipe/remove", recipe)
            .then(loadRecipe())
    }


    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveBook({
                title: formObject.title,
                author: formObject.author,
                synopsis: formObject.synopsis
            })
                .then(res => loadRecipe())
                .catch(err => console.log(err));
        }

    };

    return (

        <div>
            <br></br><br></br>
            {user.loggedIn ? (

<div class="">
<div class="card-header bg-info text-center rounded-pill book  font">
  <h1 className=" recipeTitle ">My Cook Book</h1>
</div>
<div class="card-body font ">
  




                    <hr />
                    
                 
                    <div align="center" className=" row">
                    {recipes.map(recipe => {

                        return (<div ><div className="col-12 offset-2   mr-1 "><div class="recipe card">
                            <h5 class="card-header text-center text-light bg-danger font"><u>{recipe.title}</u></h5>
                            <div class="card-body">
                              
                                <a href={`/${recipe._id}`} class="col-m-2 mr-2 btn btn-info">Recipe Card</a>
                                <a onClick={() => { deleteRecipe(recipe) }} class="col-m-2 text-light  btn btn-info">Delete Recipe</a>
                            </div>
                        </div>
                            <br />
                            <br />
                            </div>
                        </div>
                      
                      


            )
                    })}
                    </div></div>
</div>
              
    ) : (
        <><div className=" text-center row">
        <div className="card col-6 offset-3  plan noLogged">
             <div className="card-body"><h1 >Please log in!</h1></div>
            <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block >Login</Button></Link></div></div>
        </>
    )
}
        </div >










        //     < Container fluid >
        //         <Row>
        //             <Col size="md-6">
        //                 <Jumbotron>
        //                     <h1>Add a Recipe! </h1>
        //                 </Jumbotron>
        //                 <form>
        //                     <Input
        //                         onChange={handleInputChange}
        //                         name="title"
        //                         placeholder="Title (required)"
        //                     />
        //                     <Input
        //                         onChange={handleInputChange}
        //                         name="author"
        //                         placeholder="Author (required)"
        //                     />
        //                     <TextArea
        //                         onChange={handleInputChange}
        //                         name="synopsis"
        //                         placeholder="Synopsis (Optional)"
        //                     />
        //                     <FormBtn
        //                         disabled={!(formObject.author && formObject.title)}
        //                         onClick={handleFormSubmit}
        //                     >
        //                         Submit Recipe
        //           </FormBtn>
        //                 </form>
        //             </Col>
        //             <Col size="md-6 sm-12">
        //                 <Jumbotron>
        //                     <h1>All Your Recipes </h1>
        //                 </Jumbotron>
        //                 {recipes.length ? (
        //                     <List>
        //                         {recipes.map(recipe => (
        //                             <ListItem key={recipe._id}>
        //                                 <Link to={"/books/" + recipe._id}>
        //                                     <strong>
        //                                         {recipe.title} by {recipe.author}
        //                                     </strong>
        //                                 </Link>
        //                                 <DeleteBtn onClick={() => deleteBook(recipe._id)} />
        //                             </ListItem>
        //                         ))}
        //                     </List>
        //                 ) : (
        //                         <h3>No Results to Display</h3>
        //                     )}
        //             </Col>
        //         </Row>
        //   </Container >
    );
}


export default Book;