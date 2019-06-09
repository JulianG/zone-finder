
         'use strict'

      if (process.env.NODE_ENV === 'production') {
        module.exports = require('./zone-finder.cjs.production.js')
      } else {
        module.exports = require('./zone-finder.cjs.development.js')
      }