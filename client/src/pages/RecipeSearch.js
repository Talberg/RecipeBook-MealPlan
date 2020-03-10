import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import { Button } from 'reactstrap'

import axios from "axios"



function RecipeSearch() {
    // Setting our component's initial state
    const [search, setSearch] = useState({
        term: "",
        loaded:false
    })
    const [results, setResults] = useState()
    const [recipes, setRecipes] = useState([])
    const [user, setUser] = useState({
        loggedIn: false,
        user: {}
    })
    const [formObject, setFormObject] = useState({})

    function handleNewRecipe(newRecipe){
     
        axios.post("/api/recipe/new", newRecipe )

      }

    function handleSubmit(event) {
        event.preventDefault()
        axios.get(`https://api.edamam.com/search?q=${search.term}&app_id=${process.env.REACT_APP_API_ID}&app_key=${process.env.REACT_APP_API_KEY}&from=0&to=15`).then(res => {
            console.log(res)
            setResults(res.data.hits)
            setSearch({
                ...search,
                loaded:true
                
            })


        }
        )
    }


   
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
    





  
    function loadRecipe() {
        axios.get("/api/recipe/all")
            .then(res => {
                console.log(res)
                setRecipes(res.data)
            }

            )
            .catch(err => console.log(err));
    };

   
    function deleteRecipe(recipe) {
        axios.post("api/recipe/remove", recipe)
            .then(loadRecipe())
    }


    function handleInputChange(event) {
        const { name, value } = event.target;
        setSearch({ ...search, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    ;

    return (

        <div>
            {user.loggedIn ? (
                <div className="profileBox">
                    <div className="row "><div className="col-6 forms  bg-info p-5 mt-5 form offset-3">
                    <h1 className="text-center plans font pb-2 pt-2 bg-warning title" id=""> Recipe Search </h1>
                    <hr />
                    <div className="form-group">
                        
                        <input name='term' onChange={handleInputChange} value={search.term} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
                    </div>
                    <a className="text-white col-m-2 mr-2 btn btn-danger" onClick={handleSubmit}> Search </a>
                    <hr/>
                    <br/>
                    </div></div>
                    <br></br>
                    <br></br>


                    {search.loaded  ?(
                        results.map(result => {
                            const newRecipe = {
                                ingredients : result.recipe.ingredientLines,
                                author : user.user._id,
                                instructions : result.recipe.url,
                                title : result.recipe.label
                            } 
                            console.log(newRecipe)
                            console.log(user)


 
                                return (<div><div class=" p-5 bg-warning offset-3  col-6 text-center rounded-pill search ">
                                    <h3 class="card-header bg-danger search rounded-pill text-dark font">{result.recipe.label}</h3>
                                    <div class="card-body">
                                        
                        <p  class="card-text font text-light">Number of Ingredients: {result.recipe.ingredientLines.length }</p>
                                        <a onClick={()=>handleNewRecipe(newRecipe)} class="text-white col-m-2 mr-2 btn btn-info">Add to Cook Book</a>
                                    </div>
                                </div>
                                    <br />
                                    <br />
                                </div>)
                            })) : <></>
                        
                            
                        }

                   

                </div>
            ) : (
                <><div className=" text-center row">
                <div className="card col-6 offset-3  plan noLogged">
                     <div className="card-body"><h1 >Please log in!</h1></div>
                    <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block >Login</Button></Link></div></div>
                </>
                )}
        </div>










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


export default RecipeSearch;