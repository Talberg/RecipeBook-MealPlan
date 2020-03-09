import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import { Container } from 'reactstrap';
import Book from './pages/Book'
import AddRecipe from "./pages/AddRecipe"
import MealPlan from "./pages/MealPlan/MealPlan"
import RecipeSearch from "./pages/RecipeSearch"
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateMealPlan from "./pages/CreateMealPlan"
import RecipeCard from './pages/RecipeCard/index'
function App() {
  return (
      <Router>
        <>
         
          <Container > <TopNav className="" />
            <Switch>
              <Route exact path= "/"> <Profile></Profile></Route>
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route exact path="/profile" component={Profile} ></Route>
              <Route exact path= "/home"> <Profile></Profile></Route>
              <Route exact path="/cookbook"><Book/></Route>
              <Route exact path="/addrecipe"><AddRecipe/></Route>
              <Route exact path="/recipesearch"><RecipeSearch/></Route>
              <Route exact path="/mealplan"><MealPlan/></Route>
              <Route exact path="/mealplan/create"><CreateMealPlan/></Route>
              <Route exact path="/cookbook/:id"><RecipeCard></RecipeCard></Route>
              <Route component={NoMatch} />
            </Switch>
          </Container>
         
        </>
      </Router>
  );
}

export default App;
