import React, { useState, useReducer, useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import API from "../../utils/API"
import "./styles.css"

const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [user, setUser] = useState({
    loggedIn: false

  })
  function logout() {
    API.logout().then((data) => {
      window.location.pathname = "/"
    }).catch((err) => {
      console.log(err)
    })
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
    )
  }, [])


  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar onClick={toggleNavbar} className=" font  text-light   " color="danger" secondary>
        <hr />
        <NavbarBrand onClick={toggleNavbar} className=" font  text-dark title   mr-auto "><h1>Working Title</h1></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className=" font  text-light ml-auto" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className=" font bg-light rounded" navbar>
            
            <NavItem>
              
              <NavLink className=" font  bg-secondary rounded  pl-5 text-light" href="/home"><br></br>Home <hr /></NavLink>

            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5  text-secondary" href="/cookbook"><br></br>Cook Book <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5 bg-secondary rounded text-light" href="/mealplan"><br></br>Meal Plan <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font   pl-5  text-secondary" href="/mealplan/create"><br></br>Create Meal Plan <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5 bg-secondary rounded text-light" href="/addrecipe"><br></br>Add Recipe <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5  text-secondary" href="/recipesearch"><br></br>Recipe Search<hr /></NavLink>
            </NavItem>
            {!user.loggedIn ? (<>
              <NavItem>
                <NavLink className=" font  pl-5 bg-secondary rounded  text-light" href="/login"><br></br>Log In<hr /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className=" font  pl-5  text-secondary" href="/signup"><br></br>Sign Up <hr /></NavLink>
              </NavItem></>
            ) : (
                <NavItem>
                  <NavLink className=" font  pl-5   text-light" onClick={logout}><br></br>Log Out<hr /></NavLink>
                </NavItem>)


            }

          </Nav>
        </Collapse>
      </Navbar>
      <hr />
    </div>
  );
}

export default Example;