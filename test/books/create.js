const expect = require('chai').expect;
const axios = require('axios');
const url = require('../test-config.js');
axios.defaults.headers['content-type'] = "application/json";
describe('Book API', () => {
  describe('Create Book', () => {
    describe('Create Book validation ERROR', () => {
      describe('Create Book missing field', () => {
        const payload = {
            author : '',
            title : '',
            isbn : '',
            release_date : ''
        };

        it('status', done => {
          axios({
            method: 'post',
            url: `${url.url}book`,
            data:payload,
            responseType: 'json'
          }).catch((error) => {
            expect(error.response.status).to.equal(400)
            done()
          })
        });

        it('Message', done => {
          axios({
            method: 'post',
            url: `${url.url}book`,
            data:payload,
            responseType: 'json'
          }).catch((error) => {
            console.log(error.response.data.error);
            expect(error.response.data.validate).to.equal(false)
            //console.log(error);
            done()
          })
        })
      })

      describe('Check duplicate book using ISBN', done => {

        const payload = {
            author : '',
            title : '',
            isbn : "00001",
            release_date : ''
        };

        it('status', done => {
          axios({
            method: 'post',
            url: `${url.url}book`,
            data:payload,
           // responseType: 'json'
          }).catch((error) => {
            expect(error.response.status).to.equal(400)
            done()
          })
        });

        it('Message', done => {
          axios({
            method: 'post',
            url: `${url.url}book`,
            data:payload,
            responseType: 'json'
          }).then((response)=>{
            done();
          }).catch((error) => {
         //   console.log(error.response);
            expect(error.response.data.message).to.equal("ISBN code already exists.")
            //console.log(error);
            done()
          })
        })
      })

      it('Create Book success', (done) => {
          const payload = {
              author : 'Guido van Rossum',
              title : 'Python Tutorial',
              isbn : 'Py002',
              release_date : '1995-01-01'
          };
          axios({
            method: 'post',
            url: `${url.url}book`,
            data:payload,
            responseType: 'json'
          }).then((response) => {
            //console.log(response);
            expect(response.data.success).to.equal(true)
           done()
          })
      })

    })
  })
})