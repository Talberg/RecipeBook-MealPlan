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

function App() {
  return (
      <Router>
        <>
          <TopNav />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route exact path="/profile" component={Profile} ></Route>
              <Route exact path= "/home"><Home/></Route>
              <Route exact path="/recipebook"><Book/></Route>
              <Route exact path="/addrecipe"><AddRecipe/></Route>
              <Route component={NoMatch} />
            </Switch>
          </Container>
         
        </>
      </Router>
  );
}

export default App;
