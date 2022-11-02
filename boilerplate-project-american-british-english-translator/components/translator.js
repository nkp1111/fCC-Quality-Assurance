const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(text, locale) {
    const textParts = text.split(' ')
    if (locale === 'british-to-american') {
      const translated = this.BritishToAmerican(textParts).join(' ')
      return translated === text ? "Everything looks good to me!" : translated
    }

    if (locale === 'american-to-british') {
      const translated = this.AmericanToBritish(textParts).join(' ')
      return translated === text ? "Everything looks good to me!" : translated
    }
  }

  AmericanToBritish(textArr) {
    for (let i = 0; i < textArr.length; i++) {
      let translSpell = americanToBritishSpelling[textArr[i]]
      let transTitle = americanToBritishTitles[textArr[i].toLowerCase()]

      if (translSpell) {
        textArr[i] = this.highlightTranslated(translSpell)
      }
      // for time 
      if (/^[0-9]+:[0-9]+$/.test(textArr[i])) {
        let translDate = textArr[i].split(':').join('.')
        textArr[i] = this.highlightTranslated(translDate)
      }
      // for title
      if (transTitle) {
        textArr[i] = this.highlightTranslated(transTitle[0].toUpperCase() + transTitle.substring(1))
      }
    }

    return textArr
  }

  BritishToAmerican(textArr) {

    for (let i = 0; i < textArr.length; i++) {

      let translSpell = this.getBritishToAmerican(americanToBritishSpelling, textArr[i])
      let transTitle = this.getBritishToAmerican(americanToBritishTitles, textArr[i].toLowerCase())

      if (translSpell) {
        textArr[i] = this.highlightTranslated(translSpell)
      }
      // for time 
      if (/^[0-9]+\.[0-9]+$/.test(textArr[i])) {
        console.log(textArr[i])
        let translDate = textArr[i].split(':').join('.')
        console.log(textArr[i])
        textArr[i] = this.highlightTranslated(translDate)
      }
      // for title
      if (transTitle) {
        textArr[i] = this.highlightTranslated(transTitle[0].toUpperCase() + transTitle.substring(1))
      }
    }

    return textArr
  }

  highlightTranslated(text) {
    return `<span class="highlight">${text}</span>`
  }

  getBritishToAmerican(object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

}

module.exports = Translator;