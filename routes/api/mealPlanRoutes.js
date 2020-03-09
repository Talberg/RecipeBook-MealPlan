const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models");
const authMiddleware = require("../../config/middleware/authMiddleware");




router.post("/new", function (req, res, next) {
    console.log(req.body)
    req.body.author = req.user._id
   db.MealPlan.create(req.body)
    .then( )


 
});
router.get("/all",  function (req, res, next) {
    db.MealPlan.find({ author: req.user._id }, (err, mealPlans) => {
        res.json(mealPlans);
    });
});

router.get("/current", function ( req,res){
    
    db.User.findOne({_id:req.user._id}, function(req ,user){
        console.log(user)
        db.MealPlan.findOne({_id:user.currentPlan}, function( err, plan ){
            res.json(plan)
        })
    } )
    
} )

router.post("/makecurrent",function(req,res){
    console.log(req.body)
    db.User.findByIdAndUpdate({_id:req.user._id}, {$set: {currentPlan:req.body._id}}, (err, user) => {
        if (err) throw err;
        res.send(user);
    })

}
)
router.post("/currentlink" , function(req,res){
    console.log( req.body)

    
})
router.post("/getid", function(req,res){
    console.log(req.body)
    db.Recipe.findOne(req.body, function(req, recipe){
        console.log(recipe)
        res.json(recipe)

    })
})







module.exports = router;





