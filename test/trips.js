const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Trips API', () => {
  describe('GET /trips', () => {
    it('should return a list of trips with pagination', (done) => {
      chai.request(`http://localhost:${process.env.PORT}`)
        .get('/trips')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('currentPage');
          expect(res.body).to.have.property('totalPages');
          expect(res.body).to.have.property('totalItems');
          expect(res.body).to.have.property('trips');
          done();
        });
    });
  });

  describe('GET /trips/:id', () => {
    it('should return trip statistics for a particular station', function (done) {
      this.timeout(5000); // Increase the timeout limit
  
      const stationId = 501;
      chai.request(`http://localhost:${process.env.PORT}`)
        .get(`/trips/${stationId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('startingTrips').to.be.a('number');
          expect(res.body).to.have.property('endingTrips').to.be.a('number');
          expect(res.body).to.have.property('avgStartingTripDistance').to.be.a('number');
          expect(res.body).to.have.property('avgReturnTripDistance').to.be.a('number');
          done(); 
        });
    });
  });
  
  
  describe('GET /trips/departure/:name', () => {
    it('should return trips with a particular departure station name', (done) => {
      const testStationName = 'Hanasaari';
      chai.request(`http://localhost:${process.env.PORT}`)
        .get(`/trips/departure/${testStationName}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('currentPage');
          expect(res.body).to.have.property('totalPages');
          expect(res.body).to.have.property('totalItems');
          expect(res.body).to.have.property('trips');
          done();
        });
    });
  });

  describe('GET /trips/return/:name', () => {
    it('should return trips with a particular return station name', (done) => {
      const testStationName = 'Länsituuli';
      chai.request(`http://localhost:${process.env.PORT}`)
        .get(`/trips/return/${testStationName}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('currentPage');
          expect(res.body).to.have.property('totalPages');
          expect(res.body).to.have.property('totalItems');
          expect(res.body).to.have.property('trips');
          done();
        });
    });
  });
});
