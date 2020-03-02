import React, { Component } from "react";
import "./TopNav.scss";
import API from "../../utils/API";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

export default class Navigation extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            loggedIn: false
        };
    }

    componentDidMount() {
        API.isLoggedIn().then(user => {
            if (user.data.loggedIn) {
                this.setState({
                    loggedIn: true
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    logout() {
        API.logout().then((data)=> {
            window.location.pathname = "/"
        }).catch((err)=> {
            console.log(err)
        })
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <div>
<Nav tabs>
  <NavItem>
    <NavLink href="/" >Home</NavLink>
  </NavItem>

  <NavItem>
    <NavLink href="/recipebook">Recipe Book</NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/mealplan">Meal Plan</NavLink>
  </NavItem>
  <NavItem>
    <NavLink  href="/addrecipe">Add Recipe</NavLink>
  </NavItem>
  {this.state.loggedIn ? (<div className='ml-auto'>
      <NavItem>
      <NavLink  onClick={this.logout}>Logout</NavLink>
    </NavItem>
    <NavItem>
    <NavLink  href="/profile">Profile</NavLink>
  </NavItem>
  </div>
  ):(
      <div className='ml-auto'>
    
    <NavLink  href="/login">Log-in</NavLink>
  
  <NavItem>
  <NavLink  href="/signup">Sign Up</NavLink>
</NavItem>
</div>
  )}
</Nav>
</div>
        );
    }
}