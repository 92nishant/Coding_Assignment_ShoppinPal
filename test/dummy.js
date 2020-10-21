const expect = require('chai').expect;
const axios = require('axios');
const request = require('request');
const url = require('./test-config.js');
describe('Status and content', () => {
  describe('Dummy GET', () => {
    it('status', done => {
      request.get(`${url.url}test`,(_, response) => {
        expect(response.statusCode).to.equal(200)
        done()
      })
    })

    it('content', done => {
      request.get(`${url.url}test`,(_, response) => {
        expect(JSON.parse(response.body).message).to.equal('ShoppinPal Coding Assigment Testing')
        done()
      })
    })
  })
})