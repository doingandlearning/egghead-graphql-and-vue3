const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const craftSchema = new mongoose.Schema({
  name: String,
  type: String,
  brand: String,
  price: String,
  age: Number,
  owner_id: mongoose.Schema.Types.ObjectId,
});

craftSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Craft", craftSchema);
