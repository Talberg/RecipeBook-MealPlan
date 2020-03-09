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



function ShoppingList() {
    // Setting our component's initial state
    const [mealplans, setMealPlans] = useState([])
    const [shopping, setShopping] = useState([])
    const [currentPlan, setCurrentPlan] = useState()
    const [user, setUser] = useState({
        loggedIn: false,
        user: {}
    })
    const [formObject, setFormObject] = useState({})



    let list = []



    // Load all books and store them with setBooks
    useEffect(() => {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                setUser({
                    loggedIn: true,
                    user: user.data.user
                });
                console.log(user.data)
                console.log(currentPlan)


            }
        },
            loadMealPlan())
        loadCurrentPlan()





    }, [])

    function listGetter(name) {

        axios.post(`/api/mealplan/getid`, name).then(res => {
            console.log(res)
            res.data.ingredients.map(ingredient => 
                 list.push(ingredient)
            )









        })
    }





    // Loads all books and sets them to books
    function loadMealPlan() {
        axios.get("/api/mealplan/all")
            .then(res => {
                console.log(res)
                setMealPlans(res.data)
            }

            )
            .catch(err => console.log(err));
    };
    function loadCurrentPlan() {
        axios.get("/api/mealplan/current").then(res => {
            console.log(res.data)
            setCurrentPlan(res.data)





        }
        )


    }
    function makeCurrent(plan) {
        axios.post("/api/mealplan/makecurrent", plan)
    }

    function linkGetter(name) {

        axios.post(`/api/mealplan/getid`, name).then(res => {
            console.log(res)
            window.location.pathname = `/cookbook/${res._id}`

        })
    }

    // Deletes a book from the database with a given id, then reloads books from the 

    function listMaker() {

        listGetter({ title: currentPlan.monday })
        listGetter({ title: currentPlan.tuesday })
        listGetter({ title: currentPlan.wednesday })
        listGetter({ title: currentPlan.thursday })
        listGetter({ title: currentPlan.friday })
        listGetter({ title: currentPlan.saturday })
        listGetter({ title: currentPlan.sunday })

    }


    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };


    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    ;
    let shoppinglist = []


    function show(){
        listMaker()
        return(
        <ul>
        {list.map(res => {
            return (<li>{res}</li>)
        })}
        </ul>
        )

    }
   


    return (

        <>



            <div>
                {user.loggedIn ? (<><button onClick={listMaker}></button> </>) : (
                    <div className="noUser">

                        <>
                            <h1 >Please log in!</h1>
                            <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block >Login</Button></Link>
                        </>



                    </div>
                )}


            </div></>










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


export default ShoppingList;