'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const User = use('App/Models/User') // user model
const Mail = use('Mail') // Adonis' mail

const moment = require('moment') // moment (RUN NPM INSTALL MOMENT)
const crypto = require('crypto') // crypto

class UserSchema extends Schema {
  up () {
    this.table('users', (table) => { //migration que adiciona o token ao user
      table.string('token') // token
      table.timestamp('token_created_at') // date when token was created
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
    })
  }
}

module.exports = UserSchema
