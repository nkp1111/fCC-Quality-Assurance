'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {

  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body

      // if any field is missing
      if (!req.body) {
        res.send({ error: 'Required field(s) missing' })
      }
      // if text is empty
      if (!text) {
        res.send({ error: 'No text to translate' })
      }
      // if locale is invalid
      const possibleLocales = ['british-to-american', 'american-to-british']
      if (!possibleLocales.includes(locale)) {
        res.send({ error: 'Invalid value for locale field' })
      }

      let translation = translator.translate(text, locale)
      res.send({ text, translation })
    });
};
