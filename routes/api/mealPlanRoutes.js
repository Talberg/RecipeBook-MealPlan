const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");




router.post("/new", function (req, res, next) {
    console.log(req.body)
   db.MealPlan.create(req.body)
    .then(({author,_id})=>{
        db.User.findByIdAndUpdate(author, { $push: { mealPlan: _id } }, { new: true }, (err, user) => {
            if (err) throw err;
            res.send(user);
        })
    })

 
});







module.exports = router;





