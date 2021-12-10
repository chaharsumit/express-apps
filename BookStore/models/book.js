let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bookSchema = new Schema({
  title: {type: String, required: true},
  description: String,
  price: Number,
  author: String
}, { timestamps: true });

let Book = mongoose.model("Book", bookSchema);

module.exports = Book;