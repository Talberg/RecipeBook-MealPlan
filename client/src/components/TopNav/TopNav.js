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
    <div className="navBAR" >
      <Navbar onClick={toggleNavbar} className="  text-light nav    " color="danger" secondary>
        
        <hr className="bg-secondary text-info" /> <span type="image" height="20%" src="https://m.media-amazon.com/images/I/415d2FPV5VL._SR500,500_.jpg" ></span>
        <NavbarBrand onClick={toggleNavbar} className=" brand  text-dark title   mr-auto "><div className="bg-info   titleback "><h1 className="textSizer yellow yellowHover"  >DINE-INNER</h1></div></NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="  font  ml-auto" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav className=" font bg-light rounded" navbar>
            
            <NavItem>
            
              <NavLink className=" font  bg-secondary rounded  pl-5 text-light" href="/home"><br></br>Home <hr /></NavLink>

            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5  text-secondary" href="/cookbook"><br></br>Cook Book <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5  bg-secondary text-light" href="/shoppinglist"><br></br>Shopping List <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5 bg-light rounded text-secondary" href="/mealplan"><br></br>Meal Plan <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font   pl-5  text-light bg-secondary" href="/mealplancreate"><br></br>Create Meal Plan <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5 bg-light rounded text-secondary" href="/addrecipe"><br></br>Add Recipe <hr /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" font  pl-5 bg-secondary  text-light" href="/recipesearch"><br></br>Recipe Search<hr /></NavLink>
            </NavItem>
            {!user.loggedIn ? (<>
              <NavItem>
                <NavLink className=" font  pl-5 bg-light rounded  text-secondary" href="/login"><br></br>Log In<hr /></NavLink>
              </NavItem>
              <NavItem>
                <NavLink className=" font  pl-5 bg-secondary  text-light" href="/signup"><br></br>Sign Up <hr></hr></NavLink>
              </NavItem></>
            ) : (
                <NavItem>
                  <NavLink className=" font  pl-5   text-light" onClick={logout}><br></br>Log Out<hr /></NavLink>
                </NavItem>)


            }

          </Nav>
        </Collapse>
      </Navbar>
      
    
    </div>
  );
}

export default Example;