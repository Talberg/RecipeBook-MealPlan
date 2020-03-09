import React, { useState, useReducer,useEffect } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import API from "../../utils/API"

const Example = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [user ,setUser] = useState({
      loggedIn:false

  })
  function logout() {
    API.logout().then((data)=> {
        window.location.pathname = "/"
    }).catch((err)=> {
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
      <Navbar className=" text-light  " color="primary" light>
          <hr/>
        <NavbarBrand href="/" className=" text-light  mr-auto ">Working Title</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className=" text-light mr-2 ml-auto" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink className="text-light" href="/home">Home <hr/></NavLink>

            </NavItem>
            <NavItem>
              <NavLink className=" text-light" href="/cookbook">Cook Book <hr/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" text-light" href="/mealplan">Meal Plan <hr/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" text-light" href="/mealplan/create">Create Meal Plan <hr/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" text-light" href="/addrecipe">Add Recipe <hr/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" text-light" href="/recipesearch">Recipe Search<hr/></NavLink>
            </NavItem>
            { !user.loggedIn ? (<>
            <NavItem>
              <NavLink className=" text-light" href="/login">Log In<hr/></NavLink>
            </NavItem>
            <NavItem>
              <NavLink className=" text-light" href="/signup">Sign Up <hr/></NavLink>
            </NavItem></>
             ) :(
            <NavItem>
              <NavLink className=" text-light" onClick={logout}>Log Out<hr/></NavLink>
            </NavItem> )
            
        
        }  

          </Nav>
        </Collapse>
      </Navbar>
      <hr/>
    </div>
  );
}

export default Example;