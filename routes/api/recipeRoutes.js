const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");

// /api/todos/all
// get all todos from the signed in user
router.get("/all",  function (req, res, next) {
    db.Recipe.find({ author: req.user._id }, (err, recipes) => {
        res.json(recipes);
    });
});

// /api/todos/new
// add new todo, update the user to have todo id
router.post("/new", function (req, res, next) {
    console.log(req.body)
   db.Recipe.create(req.body)
    .then(({author,_id})=>{
        db.User.findByIdAndUpdate(author, { $push: { recipes: _id } }, { new: true }, (err, user) => {
            if (err) throw err;
            res.send(user);
        })
    })

 
});


router.post("/remove", authMiddleware.isLoggedIn, function (req, res, next) {
    console.log(req.body)
    db.Recipe.findByIdAndDelete(req.body._id, (err, recipe) => {
        if (err) throw err;
        
       
    });
});

// /api/todos/update
// update a todo based on id
router.put("/update", authMiddleware.isLoggedIn, function (req, res, next) {
    db.Todo.findByIdAndUpdate(req.body.id, { todo: req.body.todo }, { new: true }, (err, todo) => {
        if (err) throw err;
        res.json(todo);
    });
});





module.exports = router;