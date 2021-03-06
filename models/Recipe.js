const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    unique: true,
    required: [true, "text is required"]
  },
  ingredients  : {
    type: Array,
    unique: false,
    required: [false, ]
  },
  instructions : {
    type: String,
    unique: false,
    required: [false, ]
  },
  
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
