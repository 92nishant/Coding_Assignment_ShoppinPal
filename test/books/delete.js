const expect = require('chai').expect;
const axios = require('axios');
const url = require('../test-config.js');
axios.defaults.headers['content-type'] = "application/json";
  describe('Delete Book', () => {
    describe('No Book id provided validation error', () => {
        const bookId = " ";
        it('Status', (done) => {
          axios({
            method: 'delete',
            url: `${url.url}book/${bookId}`,
            responseType: 'json'
          }).then((response)=>{
            done();
          }).catch((error) => {
            expect(error.response.status).to.equal(404)
            done();
          })
        });
    })

    describe('Provided invalid bookId', () => {

        const bookId = "5f8c555a733af93195e23f92";
        it('Status', (done) => {
          axios({
            method: 'delete',
            url: `${url.url}book/${bookId}`,
            responseType: 'json'
          }).then((response)=>{
            done();
          }).catch((error) => {
            expect(error.response.status).to.equal(404)
            done();
           })
        });

        it('Content', (done) => {
          axios({
            method: 'delete',
            url: `${url.url}book/${bookId}`,
            responseType: 'json'
          }).then((response)=>{
            done();
          }).catch((error) => {
            expect(error.response.data.message).to.equal("Book not found.")
            done();
           })
        });

    })

    describe('Book deleted success', () => {
        const bookId = "5f8c677259c46c3f299ec63b";
        it('Status & Content', (done) => {
          axios({
            method: 'delete',
            url: `${url.url}book/${bookId}`,
            responseType: 'json'
          }).then((response)=>{
            expect(response.status).to.equal(200)
            expect(response.data.message).to.equal('Book deleted successfully')
            done();
          }).catch((error)=>{
            done();
          })
        });
    })
  })