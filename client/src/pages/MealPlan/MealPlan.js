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


function MealPlan() {
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
                console.log(user.data)

            }
        },
            loadMealPlan())
        loadCurrentPlan()
        console.log(mealplans)
        console.log(currentPlan)
    }, [])





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
            console.log(res)
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
            window.location.pathname = `/cookbook/${res.data._id}`

        })
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
            {user.loggedIn ? (
                <div className="profileBox">
                    <hr />
                    {currentPlan ? (<> <h1 className="text-center" id="userTitle">Current Meal Plan <hr /> </h1>


                        <div><div class="card bg-warning">
                            <h5 class="card-header">{currentPlan.title}</h5>
                            
                        </div>
                            <br />
                            <br />
                            <div class="row">
                                <div class="col-lg-5">
                                    <div class="row">
                                        <div class="col-lg-4"><div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title day">Monday:</h5>
                                                <p className="card-text">{currentPlan.monday}</p>
                                                <a className="btn btn-primary text-light " onClick={() => { linkGetter({ title: currentPlan.monday }) }}>Recipe Card</a>
                                            </div>
                                        </div></div>
                                        <div class="col-lg-4"><div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title day">Tuesday:</h5>
                                                <p className="card-text">{currentPlan.tuesday}</p>
                                                <a className="btn btn-primary text-light " onClick={() => { linkGetter({ title: currentPlan.tuesday }) }}>Recipe Card</a>
                                            </div>
                                        </div></div>
                                        <div class="col-lg-4"><div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title day">Wednesday:</h5>
                                                <p className="card-text">{currentPlan.wednesday}</p>
                                                <a className="btn btn-primary text-light " onClick={() => { linkGetter({ title: currentPlan.wednesday }) }}>Recipe Card</a>
                                            </div>
                                        </div></div>

                                    </div>
                                </div>
                                <div class="col-lg-7">
                                    <div class="row">
                                        <div class="col-lg-3"><div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title day ">Thursday:</h5>
                                                <p className="card-text">{currentPlan.thursday}</p>
                                                <a className="btn btn-primary text-light " onClick={() => { linkGetter({ title: currentPlan.thursday }) }}>Recipe Card</a>
                                            </div>
                                        </div></div>
                                        <div class="col-lg-3"><div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title day">Friday:</h5>
                                                <p className="card-text">{currentPlan.friday}</p>
                                                <a className="btn btn-primary text-light " onClick={() => { linkGetter({ title: currentPlan.friday }) }}>Recipe Card</a>
                                              
                                            </div>
                                        </div></div>
                                        <div class="col-lg-3"><div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title day">Saturday:</h5>
                                                <p className="card-text">{currentPlan.saturday}</p>
                                                <a className="btn btn-primary text-light " onClick={() => { linkGetter({ title: currentPlan.saturday }) }}>Recipe Card</a>
                                            </div>
                                        </div></div>
                                        <div class="col-lg-3"><div className="card" >
                                            <div className="card-body">
                                                <h5 className="card-title day">Sunday:</h5>
                                                <p className="card-text">{currentPlan.sunday}</p>
                                                <a className="btn btn-primary text-light " onClick={() => { linkGetter({ title: currentPlan.sunday }) }}>Recipe Card</a>
                                            </div>
                                        </div></div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <br/>
                        </div></>) : (<>
                            <h1 className="text-center"> No meal plan selected<hr></hr></h1>
                            <h2 className="text-center"> Make one of your meal plans your current by clicking on the button that says "Make Current"<hr></hr></h2>
                        </>
                        )


                    }




                    {mealplans !== [] ? (<>
                        <h3>Your Meal Plans </h3>
                        {mealplans.map(plan => {

                            return (<div><div class="card">
                                <h5 class="card-header">{plan.title}</h5>
                                <div class="card-body">
                                    <h5 class="card-title ">{}</h5>
                                    <ul>
                                        <li>Monday: {plan.monday}</li>
                                        <li>Tuesday: {plan.tuesday}</li>
                                        <li>wednesday: {plan.wednesday}</li>
                                        <li>thursday: {plan.thursday}</li>
                                        <li>Friday: {plan.friday}</li>
                                        <li>Saturday: {plan.monday}</li>
                                        <li>Sunday: {plan.monday}</li>

                                    </ul>

                                    <a onClick={() => { makeCurrent(plan) }} class="col-m-2  btn btn-primary">Make Current</a>
                                </div>
                            </div>
                                <br />
                                <br />
                            </div>




                            )
                        })}</>) : (<a href="mealplan/create" class=" text-light offset-3  btn btn-primary">Create Meal Plan</a>)}






                </div>
            ) : (
                    <div className="noUser">

                        <>
                            <h1 >Please log in!</h1>
                            <Link className="loginLink" to="/login"><Button className="loginBtn" color="info" block >Login</Button></Link>
                        </>



                    </div>
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


export default MealPlan;