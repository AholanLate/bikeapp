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
      chai.request(`http://localhost:${process.env.PORT}`)
        .get(`/stations/byName/${testStationName}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('ID');
          expect(res.body).to.have.property('Nimi');
          expect(res.body).to.have.property('Osoite');
          expect(res.body).to.have.property('Kaupunki');
          done();
        });
    });

    it('no response data if station is not found', (done) => {
      chai.request(`http://localhost:${process.env.PORT}`)
        .get('/stations/byName/NonExistentStation')
        .end((err, res) => {
          expect(res.body).to.be.empty;
          done();
        });
    });
  });

  describe('GET /stations/:id', () => {
    it('should return a station by id', (done) => {
      chai.request(`http://localhost:${process.env.PORT}`)
        .get(`/stations/${testStationId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('ID');
          expect(res.body).to.have.property('Nimi');
          expect(res.body).to.have.property('Osoite');
          expect(res.body).to.have.property('Kaupunki');
          done();
        });
    });

    it('should return an error if station is not found', (done) => {
      chai.request(`http://localhost:${process.env.PORT}`)
        .get('/stations/999')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });
});

