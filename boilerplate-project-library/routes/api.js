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
      console.log(delRes)
      res.send('complete delete successful')
    });



  app.route('/api/books/:id')
    .get(function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      console.log("4", bookid)
      res.json('detail book')
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
      console.log('5', comment)
      res.json('post comment')

    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      console.log(req.params, req.body)
      res.send('delete successful')
    });

};
