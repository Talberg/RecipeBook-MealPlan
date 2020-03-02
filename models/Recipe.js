const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  recipe: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  mealPlan  : {
    type: String,
    unique: false,
    required: [false, ]
  },
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
