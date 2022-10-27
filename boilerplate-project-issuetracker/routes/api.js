'use strict';
const Issue = require('../models/issues')

module.exports = function (app) {

  app.route('/api/issues/:project')

    .get(async function (req, res) {
      // to get all issues with the project name
      let project = req.params.project;
      const { issue_title, issue_text, created_by, assigned_to, open, status_text } = req.query

      const valid = returnDefined(issue_title, issue_text, created_by, assigned_to, open, status_text)
      let issues

      if (issue_title || issue_text || created_by || assigned_to || open || status_text) {
        issues = await Issue.find({ project_name: project, ...valid })
      } else {
        issues = await Issue.find({ project_name: project })
      }

      let issuesToSend = issues.map(i => {
        return {
          _id: i._id,
          issue_text: i.issue_text,
          issue_title: i.issue_title,
          created_on: i.created_on,
          updated_on: i.updated_on,
          created_by: i.created_by,
          assigned_to: i.assigned_to,
          open: i.open,
          status_text: i.status_text
        }
      })

      res.json(issuesToSend)
    })

    .post(async function (req, res) {
      // to post an issue with necessary information
      let project = req.params.project;

      const { issue_text, created_by, issue_title, assigned_to = '', status_text = '', open = true } = req.body

      if (issue_text && created_by && issue_title) {
        const issueToSave = new Issue({
          issue_text, created_by, issue_title, assigned_to, status_text, open, project_name: project
        })
        let issue = await issueToSave.save()

        const issueToSend = {
          issue_title: issue.issue_title,
          issue_text: issue.issue_text,
          created_by: issue.created_by,
          created_on: issue.created_on,
          assigned_to: issue.assigned_to,
          open: issue.open,
          status_text: issue.status_text,
          updated_on: issue.updated_on,
          _id: issue._id.toString()
        }
        // console.log("post", issueToSend)
        res.json(issueToSend)

      } else {
        res.json({ error: 'required field(s) missing' })
      }
    })

    .put(async function (req, res) {
      // to update an issue with id and other information
      let project = req.params.project;
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = req.body

      if (!_id) {
        return res.json({ error: 'missing _id' })
      }

      if (!issue_title && !issue_text && !created_by && !assigned_to && !open && !status_text) {
        console.log({ error: 'no update field(s) sent', '_id': _id })
        return res.json({ error: 'no update field(s) sent', '_id': _id })
      }
      else {
        const valuesToUpdate = returnDefined(issue_title, issue_text, created_by, assigned_to, open, status_text)
        try {
          await Issue.findByIdAndUpdate(_id, { valuesToUpdate }, { $currentDate: { updated_on: true } })
          return res.json({ result: 'successfully updated', '_id': _id })
        } catch (err) {
          console.log('update', err)
          return res.json({ error: 'could not update', '_id': _id })
        }
      }
    })

    .delete(async function (req, res) {
      // delete route to delete a particular issue with id
      let project = req.params.project;
      const { _id } = req.body
      console.log("delete", _id)
      if (!_id) {
        return res.json({ error: 'missing _id' })
      } else {
        try {
          await Issue.findByIdAndDelete(_id)
          return res.json({ result: 'successfully deleted', '_id': _id })
        }
        catch (err) {
          console.log(err)
          return res.json({ error: 'could not delete', '_id': _id })
        }

      }
    })

}

const returnDefined = (issue_title, issue_text, created_by, assigned_to, open, status_text) => {
  let defined = {}
  if (issue_title) {
    defined['issue_title'] = issue_title
  }
  if (issue_text) {
    defined['issue_text'] = issue_text
  }
  if (open) {
    defined['open'] = open
  }
  if (created_by) {
    defined['created_by'] = created_by
  }
  if (assigned_to) {
    defined['assigned_to'] = assigned_to
  }
  if (status_text) {
    defined['status_text'] = status_text
  }
  return defined
}
