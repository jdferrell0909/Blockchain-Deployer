const request = require('supertest');

const server = 'http://localhost:3000';

describe('/blockchain', () => {
  describe('GET', () => {
    it('responds with 200 status', () => {
      return request(server)
        .get('/blockchain')
        .expect(200)
    })
  })
})

describe('/transaction', () => {
  describe('POST', () => {
    it('responds with 201 status', () => {
      return request(server)
        .post('/transaction')
        .expect(201)
    })
  })
})

describe('/mine', () => {
  describe('GET', () => {
    it('responds with 200 status', () => {
      return request(server)
        .get('/mine')
        .expect(200)
    })
  })
})