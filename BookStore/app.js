let express = require('express');
let mongoose = require('mongoose');
let path = require('path');

let indexRouter = require('./routes/index');
let booksRouter = require('./routes/books');
let commentsRouter = require('./routes/comments');

mongoose.connect('mongodb://localhost/bookstore', (err) => {
  console.log(err ? err : "Database is successfully connnected");
})

let app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname , '/views'));

app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "/public")));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/comments', commentsRouter);

app.use((req, res, next) => {
  res.send('404 Page Not Found!!');
}) 

app.use((err, req, res, next) => {
  res.send(err);
})

app.listen(3000, () => {
  console.log('server is listening on port:3000');
})