const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Import the app

const { expect } = chai;
chai.use(chaiHttp);

describe('Digital Wallet API', () => {
  let authHeader;

  before((done) => {
    // Set up basic auth header
    const username = 'user2';
    const password = 'password2';
    authHeader = 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64');
    done();
  });

  describe('GET /api/wallet/balance', () => {
    it('should return the balance', (done) => {
      chai.request(app)
        .get('/api/wallet/balance')
        .set('Authorization', authHeader)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('balance');
          done();
        });
    });
  });

  describe('POST /api/wallet/cash-in', () => {
    it('should cash-in and return the new balance', (done) => {
      chai.request(app)
        .post('/api/wallet/cash-in')
        .set('Authorization', authHeader)
        .send({ amount: 500 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('balance');
          done();
        });
    });

    it('should not cash-in negative amount', (done) => {
      chai.request(app)
        .post('/api/wallet/cash-in')
        .set('Authorization', authHeader)
        .send({ amount: -500 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });

  describe('POST /api/wallet/debit', () => {
    it('should debit and return the new balance', (done) => {
      chai.request(app)
        .post('/api/wallet/debit')
        .set('Authorization', authHeader)
        .send({ amount: 200 })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('balance');
          done();
        });
    });

    it('should not debit more than the balance', (done) => {
      chai.request(app)
        .post('/api/wallet/debit')
        .set('Authorization', authHeader)
        .send({ amount: 10000 })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.be.an('object');
          expect(res.body.success).to.be.false;
          expect(res.body.message).to.equal('Insufficient funds');
          done();
        });
    });
  });
});
