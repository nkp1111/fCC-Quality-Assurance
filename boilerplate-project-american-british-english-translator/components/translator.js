const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  translate(text, locale) {
    const textParts = text.split(' ')
    if (locale === 'british-to-american') {
      return this.BritishToAmerican(textParts).join(' ')
    }

    if (locale === 'american-to-british') {
      return this.AmericanToBritish(textParts).join(' ')
    }
  }

  AmericanToBritish(textArr) {
    for (let i = 0; i < textArr.length; i++) {
      if (americanToBritishSpelling[textArr[i]]) {
        textArr[i] = `<span class="highlight">${americanToBritishSpelling[textArr[i]]}</span>`
      }
      // for time 

    }
    return textArr
  }

  BritishToAmerican(textArr) {
    for (let i = 0; i < textArr.length; i++) {
      if (americanToBritishSpelling[textArr[i]]) {
        textArr[i] = `<span class="highlight">${americanToBritishSpelling[textArr[i]]}</span>`
      }
    }
    return textArr
  }

}

module.exports = Translator;