import React,{useState, useEffect} from 'react';
import API from "../../utils/API"
import axios from "axios"

const AddRecipe = (props) => {
  const [user ,setUser] = useState()
 const [recipe, setRecipe] = useState({
   author:'',
   title:"",
   ingredients:"",
   instructions:""
 }
 )


  //Pulls in and sets user to the results from the user API call
  useEffect(() => {
    API.isLoggedIn().then(user => {
        if (user.data.loggedIn) {
          setRecipe({...recipe,
            author:user.data.user._id
          })
            setUser({
                loggedIn: true,
                user: user.data.user
            });
            
        }
    },
        )
}, [])

 console.log(user)

 function handleInputChange(event) {
  const { name, value } = event.target;
  setRecipe({...recipe, [name]: value}
  )
  console.log(recipe)
}
  function handleSubmit(event){
    event.preventDefault()
    axios.post("/api/recipe/new", recipe)
  }
   
  return (
<form>
  <div className="form-group">
    <label for="exampleFormControlInput1">Recipe Title</label>
    <input name='title' onChange={handleInputChange}  value={recipe.title} className="form-control" id="exampleFormControlInput1" placeholder="Maw's Rolls"></input>
  </div>
 
 
  <div className="form-group">
    <label for="exampleFormControlTextarea1">Ingredients</label>
    <textarea onChange={handleInputChange} name="ingredients" className="form-control" id="exampleFormControlTextarea1" value={recipe.ingredients} rows="3"></textarea>
  </div>
  <div className="form-group">
    <label for="exampleFormControlTextarea1">Instructions</label>
    <textarea onChange={handleInputChange} name="instructions" className="form-control" id="exampleFormControlTextarea1" value={recipe.instructions} rows="3"></textarea>
  </div>
  <button onClick={handleSubmit}>Submit</button>
</form>  );
}

export default AddRecipe ;