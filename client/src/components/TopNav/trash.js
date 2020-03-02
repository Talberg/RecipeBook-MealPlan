<div>
<Nav tabs>
  <NavItem>
    <NavLink href="/" active>Home</NavLink>
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
  {this.state.loggedIn ? (<div>
      <NavItem>
      <NavLink  href="/addrecipe">Add Recipe</NavLink>
    </NavItem>
    <NavItem>
    <NavLink  href="/addrecipe">Add Recipe</NavLink>
  </NavItem>
  </div>
  ):(
      <div>
    <NavItem>
    <NavLink  href="/addrecipe">Add Recipe</NavLink>
  </NavItem>
  <NavItem>
  <NavLink  href="/addrecipe">Add Recipe</NavLink>
</NavItem>
</div>
  )}
</Nav>
</div>