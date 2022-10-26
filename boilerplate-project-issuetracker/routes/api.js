'use strict';
const Issue = require('../models/issues')

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(function (req, res) {
      let project = req.params.project;
      console.log(project)
      res.send(project)
    })

    .post(async function (req, res) {
      let project = req.params.project;
      const { issue_text, created_by, issue_title, assigned_to = '', status_text = '', open = true } = req.body

      if (issue_text && created_by && issue_title) {
        const issueToSave = new Issue({
          issue_text, created_by, issue_title, assigned_to, status_text, open
        })
        let issue = await issueToSave.save()

        res.json({
          issue_title: issue.issue_title,
          issue_text: issue.issue_text,
          created_by: issue.created_by,
          created_on: issue.created_on,
          assigned_to: issue.assigned_to,
          open: issue.open,
          status_text: issue.status_text,
          update_on: issue.update_on,
          _id: issue._id
        })
      } else {
        res.send({ error: 'required field(s) missing' })
      }

    })

    .put(function (req, res) {
      let project = req.params.project;
      res.send(project)
    })

    .delete(function (req, res) {
      let project = req.params.project;
      res.send(project)
    });

};
