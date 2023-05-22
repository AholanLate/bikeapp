const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const dotenv = require('dotenv'); 

// Load environment variables from .env file
dotenv.config();

chai.use(chaiHttp);
const expect = chai.expect;

const testStationId = 501;
const testStationName = 'Länsituuli';

// all tests for station database
describe('Station APIs', () => {

  // test station by name search
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

    it('should return an error if station is not found', (done) => {
      chai.request(`http://localhost:${process.env.PORT}`)
        .get('/stations/byName/NonExistentStation')
        .end((err, res) => {
          expect(res).to.have.status(404);
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

