const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({

  name: {
    type: String,
    unique: true,
    required: [true, "text is required"]
  },
  monday: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  tuesday: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  wednesday: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  thursday: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  friday: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  saturday: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  sunday: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  
  
});

const MealPlan = mongoose.model("Mealplan", mealPlanSchema);

module.exports = MealPlan;
