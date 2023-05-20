const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);
const expect = chai.expect;

const testStationId = 501;
const testStationName = 'Länsituuli';

describe('Station API', () => {
  describe('GET /stations/byName/:name', () => {
    it('should return a station by name', (done) => {
      chai.request('http://localhost:4000')
        .get(`/stations/byName/${testStationName}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return an error if station is not found', (done) => {
      chai.request('http://localhost:4000')
        .get('/stations/byName/NonExistentStation')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('GET /stations/:id', () => {
    it('should return a station by id', (done) => {
      chai.request('http://localhost:4000')
        .get(`/stations/${testStationId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return an error if station is not found', (done) => {
      chai.request('http://localhost:4000')
        .get('/stations/999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

