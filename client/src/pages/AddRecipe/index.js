import React,{useState, useEffect} from 'react';
import API from "../../utils/API"
import axios from "axios"

const AddRecipe = (props) => {
  const [user ,setUser] = useState()
 const [recipe, setRecipe] = useState({
   author:'',
   title:"",
   ingredients:"",
   instructions:"",
   description:"",
   category:"",
   step1:"",
   step2:"",
   step3:"",
   step4:"",
   step5:"",
   step6:"",
   step7:"",
   step8:"",
   step9:"",
   step10:"",
   step11:"",
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
   
  return (<>
    <hr/>
    <br/>
    <hr/>

<form>
  <div className="form-group">
    <label for="exampleFormControlInput1">Recipe Title</label>
    <input name='title' onChange={handleInputChange}  value={recipe.title} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
  </div>
  <hr></hr>
  <div className="form-group">
    <label for="exampleFormControlInput1">Ingredients (separate by commas)</label>
    <input name='ingredients' onChange={handleInputChange}  value={recipe.ingredients} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
  </div>
  <hr></hr>
 
 
  <div className="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea onChange={handleInputChange} name="description" className="form-control" id="exampleFormControlTextarea1" value={recipe.description} rows="3"></textarea>
    <hr></hr>
    <div class="form-group ">
      <label for="inputState">Category </label>
      <select id="inputState" name='category' value={recipe.category} onChange={handleInputChange} class="form-control">
        <option selected>Select one...</option>
        <option>Breakfast</option>
        <option>Soups or Salad</option>
        <option>Main Dish</option>
        <option>Vegetables</option>
        <option>Desserts</option>
        <option>Snacks</option>
        <option>Candy</option>
        
      </select>
    </div>
    <hr></hr>
  </div>
 

  
  <div className="form-group">
    <label for="exampleFormControlInput1">Step 1:</label>
    <input name='step1' onChange={handleInputChange}  value={recipe.step1} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr> </div>
{recipe.step1 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Step 2:</label>
    <input name='step2' onChange={handleInputChange}  value={recipe.step2} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr></div> )  : <div></div> }
{recipe.step2 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Step 3:</label>
    <input name='step3' onChange={handleInputChange}  value={recipe.step3} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr> </div> )  : <div></div> }
{recipe.step3 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Step 4:</label>
    <input name='step4' onChange={handleInputChange}  value={recipe.step4} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr></div> )  : <div></div> }
{recipe.step4 !== ""  ? ( <div className="form-group">
    <label for="exampleFormControlInput1">Step 5:</label>
    <input name='step5' onChange={handleInputChange}  value={recipe.step5} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr> </div>)  : <div></div> }
{recipe.step5 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Step 6:</label>
    <input name='step6' onChange={handleInputChange}  value={recipe.step6} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr> </div> )  : <div></div> }
{recipe.step6 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Step 7:</label>
    <input name='step7' onChange={handleInputChange}  value={recipe.step7} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr></div> )  : <div></div> }
{recipe.step7 !== ""  ? (
  <div className="form-group">
    <label for="exampleFormControlInput1">Step 8:</label>
    <input name='step8' onChange={handleInputChange}  value={recipe.step8} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr> </div> )  : <div></div> }
{recipe.step8 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Step 9:</label>
    <input name='step9' onChange={handleInputChange}  value={recipe.step9} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr> </div> )  : <div></div> }
{recipe.step9 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Step 10:</label>
    <input name='step10' onChange={handleInputChange}  value={recipe.step10} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
    <hr></hr></div> )  : <div></div> }
{recipe.step10 !== ""  ? (<div className="form-group">
    <label for="exampleFormControlInput1">Instruct</label>
    <input name='step11' onChange={handleInputChange}  value={recipe.step11} className="form-control" id="exampleFormControlInput1" placeholder=""></input>
  </div> )  : <div></div> }

 






 
  
  
  
  
  
  
  
  
  <button className="btn-primary " onClick={handleSubmit}>Add Recipe</button>
</form>  </>)
}

export default AddRecipe ;