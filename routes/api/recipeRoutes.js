const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");


router.get("/all",  function (req, res, next) {
    db.Recipe.find({ author: req.user._id }, (err, recipes) => {
        res.json(recipes);
    });
});

router.post("/new", function (req, res, next) {
    console.log(req.body)
   db.Recipe.create(req.body)
    .then(({author,_id})=>{
        db.User.findByIdAndUpdate(author, { $set: { recipes: _id } }, { new: true }, (err, user) => {
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







module.exports = router;