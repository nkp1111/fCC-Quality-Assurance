/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Library = require('../library')

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const books = await Library.find({})
      const bookData = books.map(b => {
        return {
          _id: b._id,
          title: b.title,
          commentcount: b.comments.length
        }
      })
      res.json(bookData)
    })

    .post(async function (req, res) {
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        res.send('missing required field title')
        return
      }
      const book = new Library({ title })
      const savedBook = await book.save()
      res.send({ _id: savedBook._id, title: savedBook.title })
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      const delRes = await Library.remove({})
      res.send('complete delete successful')
    });



  app.route('/api/books/:id')
    .get(async function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      const book = await Library.findOne({ _id: bookid })
      if (!book) {
        res.send('no book exists')
      }
      else {
        const bookDetail = {
          _id: book._id,
          title: book.title,
          comments: book.comments
        }

        res.json(bookDetail)
      }
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      if (!comment) {
        res.send('missing required field comment')
      }
      else {
        const book = await Library.findById(bookid)
        if (book) {
          book.comments.push(comment)
          const savedBook = await book.save()
          const bookData = {
            _id: savedBook._id,
            title: savedBook.title,
            comments: savedBook.comments
          }
          res.json(bookData)

        } else {
          res.send('no book exists')
        }
      }
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const delRes = await Library.findOneAndDelete({ _id: bookid })
      if (delRes) {
        res.send('delete successful')
      } else {
        res.send('no book exists')
      }
    });

};
