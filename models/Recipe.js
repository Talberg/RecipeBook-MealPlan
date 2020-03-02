const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  ingredients  : {
    type: String,
    unique: false,
    required: [true, "text is required"]
  },
  tags:{
  type: String,
  unique:false,
  required:[true, "text is required"]
  }
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
