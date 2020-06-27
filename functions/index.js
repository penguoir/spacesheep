const admin = require('firebase-admin')
const setUsername = require('./setUsername')

admin.initializeApp()

/**
 * Gives a user a uid
 */
exports.setUsername = setUsername
