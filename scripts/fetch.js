/* eslint-disable no-restricted-syntax, no-await-in-loop */

const contentfulStatic = require('contentful-static')
const fs = require('fs')

module.exports = (space, accessToken) => new Promise((resolve) => {
  contentfulStatic.config({
    space,
    accessToken
  })

  contentfulStatic.sync((err, json) => {
    if (err) {
      console.log('contentful-static: data could not be fetched')
      return false
    }
    const lang = Object.keys(json.entries)[0]
    resolve(json.entries[lang])
  })
})
