const router = require("express").Router();
const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
const mealPlanRoutes = require("./mealPlanRoutes")

router.use("/users", userRoutes);
router.use("/recipe", recipeRoutes);
router.use("/mealplan", mealPlanRoutes);

module.exports = router;
