const mongoose = require("mongoose");

const Schema = mongoose.Schema

const storeSchema = new Schema({
  family_id: { type: String, required: true }, // TODO
  name: { type: String, required: true },
  category: { type: String, required: true },
  tel: { type: String, required: true },
  rating: { type: Number, required: true },
  address: { type: String, required: true },
  longitude: { type: Number, required: true }, // TODO
  latitude: { type: Number, required: true }, // TODO
  updateDate: { type: Date, required: true, default: Date.now },
  stocks: { type: Array } // TODO
})

const foodSchema = new Schema({
  family_pid: { type: String, required: true }, // TODO
  name: { type: String, required: true },
  category: { type: String, required: true },
  tag: { type: String, required: true },
  original_price: { type: Number, required: true },
  discount_price: { type: Number, required: true },
})

const StoreModel = mongoose.model('Store', storeSchema, "store");
const FoodModel = mongoose.model('Food', foodSchema, "food");

const db = {
  StoreModel,
  FoodModel
};

module.exports = db;