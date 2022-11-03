const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {

  translate(text, locale) {
    let textParts = text.split(' ')
    const lastItem = textParts[textParts.length - 1]
    if (/[\.\?\!]$/.test(lastItem)) {
      const sign = lastItem[lastItem.length - 1]
      const lastText = textParts.slice(textParts.length - 1)[0].split(/[\.\?\!]$/)[0]
      textParts = textParts.slice(0, textParts.length - 1)
      textParts.push(lastText)
      textParts.push(sign)
    }

    if (locale === 'british-to-american') {
      let translated = this.BritishToAmerican(textParts)
      let ans = ''
      translated.map((d, i) => {
        if (i > translated.length - 3) {
          ans += d
        }
        else {
          ans += d + ' '
        }
      })
      return ans === text ? "Everything looks good to me!" : ans
    }

    if (locale === 'american-to-british') {
      let translated = this.AmericanToBritish(textParts)
      let ans = ''
      translated.map((d, i) => {
        if (i > translated.length - 3) {
          ans += d
        } else {
          ans += d + ' '
        }
      })
      console.log(ans)
      return ans === text ? "Everything looks good to me!" : ans
    }
  }

  AmericanToBritish(textArr) {
    for (let i = 0; i < textArr.length; i++) {

      let translSpell = americanToBritishSpelling[textArr[i]] || americanOnly[textArr[i]]
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
      // to translate two length words
      textArr = this.getAllKeysAndModify(americanOnly, textArr, i)
    }

    return textArr
  }

  BritishToAmerican(textArr) {

    for (let i = 0; i < textArr.length; i++) {

      let translSpell = this.getBritishToAmerican(americanToBritishSpelling, textArr[i]) ||
        this.getBritishToAmerican(britishOnly, textArr[i])

      let transTitle = this.getBritishToAmerican(americanToBritishTitles, textArr[i].toLowerCase())

      if (translSpell) {
        textArr[i] = this.highlightTranslated(translSpell)
      }
      // for time 
      if (/^[0-9]+\.[0-9]+$/.test(textArr[i])) {
        let translDate = textArr[i].split('.').join(':')
        textArr[i] = this.highlightTranslated(translDate)
      }
      // for title
      if (transTitle) {
        textArr[i] = this.highlightTranslated(transTitle[0].toUpperCase() + transTitle.substring(1))
      }

      // to translate two length words
      textArr = this.getAllKeysAndModify(britishOnly, textArr, i)

    }

    return textArr
  }

  highlightTranslated(text) {
    return `<span class="highlight">${text}</span>`
  }

  getBritishToAmerican(object, value) {
    return Object.keys(object).find(key => object[key] === value)
  }

  getAllKeysAndModify(object, textArr, ind) {
    // to check multiline translated  word
    let possibleTransl = Object.keys(object).filter(key => key.split(' ')[0] === textArr[ind].toLowerCase())
    if (possibleTransl) {
      // for each possible translation 
      // check each word of translation for match with words of array
      for (let p of possibleTransl) {
        const item = p.split(' ')
        let count = item.length
        let ans = false
        for (let j = 0; j < count; j++) {
          if (item[j] !== textArr[ind + j].toLowerCase()) {
            ans = false
            break
          }
          ans = true
        }

        if (ans) {
          // if all the words match returns newText array
          let ans234 = object[p].split(' ')
          ans234[0] = `<span class="highlight">${ans234[0]}`
          ans234[ans234.length - 1] = `${ans234[ans234.length - 1]}</span>`
          textArr = textArr.slice(0, ind).concat(...ans234).concat(textArr.slice(ind + count))
        }
      }
    }
    return textArr
  }


}

module.exports = Translator;