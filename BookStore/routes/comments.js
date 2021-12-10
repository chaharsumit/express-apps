let express = require('express');
let router = express.Router();

let Comment = require('../models/comment');

router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Comment.findById(id, (err, comment) => {
    if(err){
      return next(err);
    }
    res.render('commentEdit', { comment: comment });
  })
})

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
    if(err){
      return next(err);
    }
    res.redirect('/books/' + updatedComment.bookId);
  })
})

router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndDelete(id, (err, deletedComment) => {
    if(err){
      return next(err);
    }
    res.redirect('/books/' + deletedComment.bookId);
  })
})

module.exports = router;