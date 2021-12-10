let express = require('express');
let router = express.Router();
let Book = require('../models/book');
let Comment = require('../models/comment');

router.get('/', (req, res) => {
  Book.find({}, (err, books) => {
    if(err){
      return next(err);
    } 
    res.render('books', { books: books })
  });
})

router.get('/new', (req, res) => {
  res.render('addBook');
});

/*
router.get('/:id', (req, res) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if(err){
      return next(err);
    }
    Comment.find({bookId: id}, (err, comments) => {
      res.render('bookDetails', { book: book, comments: comments });
    })
  });
})
*/

router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Book.findById(id).populate('comments').exec((err, book) => {
    if(err){
      return next(err);
    }
    res.render('bookDetails', { book: book });
  })
})

router.get('/:id/edit', (req, res) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if(err){
      return next(err);
    }
    res.render('editBook', { book: book });
  });
})

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if(err){
      return next(err);
    }
    Comment.deleteMany({ bookId: book.id }, (err, info) => {
      if(err){
        return next(err);
      }
      res.redirect('/books');
    });
  })
})

router.post('/:id', (req, res) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    res.redirect('/books/' + id);
  })
})

router.post('/', (req, res, next) => {
  Book.create(req.body, (err, createdBook) => {
    if(err){
      return next(err);
    }
    res.redirect('/books');
  })
});

router.post('/:id/comments', (req, res, next) => {
  let id = req.params.id;
  req.body.bookId = id;
  Comment.create(req.body, (err, comment) => {
    if(err){
      return next(err);
    }
    Book.findByIdAndUpdate(id, { $push: { comments: comment._id } }, (err, updatedBook) => {
      if(err){
        return next(err);
      }
      res.redirect('/books/' + id);
    });
  });
})


module.exports = router; 