const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app.js");
const helper = require("../helpers/helper.js");

chai.use(chaiHttp);
const { expect } = chai;

describe("Route /sleep/:recordId Testing", () => {
  beforeEach(() => {
    app.locals.sleepRecords.splice(0, app.locals.sleepRecords.length);
  });

  it("It deleted record using recordId return 204 status", (done) => {
    const userId = "1";
    const count = 1;
    const sampleRecords = helper.getArrayOfSleepRecord(userId, count);
    postRecord(sampleRecords).then((res) => {
      const sampleRecord = res[0];
      chai
        .request(app)
        .delete(`/sleep/${sampleRecord.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
        });
      done();
    });
  });

  it("It deleted perticular records only no other record is deleted", (done) => {
    const userId = "1";
    const count = 10;
    const sampleRecords = helper.getArrayOfSleepRecord(userId, count);
    postRecord(sampleRecords).then((response) => {
      const sampleRecord = response[0];
      response.splice(0, 1);
      response.sort((a, b) => b.timestamp - a.timestamp);
      chai
        .request(app)
        .delete(`/sleep/${sampleRecord.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(204);
        });
      chai
        .request(app)
        .get(`/sleep/${userId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).lengthOf(count - 1);
          expect(res.body).deep.equal(response);
        });
      done();
    });
  });

  it("It cannot delete record if does not exist 404", (done) => {
    const userId = "1";
    const count = 10;
    const sampleRecords = helper.getArrayOfSleepRecord(userId, count);
    postRecord(sampleRecords).then((response) => {
      const sampleRecord = response[count - 1].id + 10;
      response.sort((a, b) => b.timestamp - a.timestamp);
      chai
        .request(app)
        .delete(`/sleep/${sampleRecord.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
        });
      chai
        .request(app)
        .get(`/sleep/${userId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).lengthOf(count);
          expect(res.body).deep.equal(response);
        });
      done();
    });
  });

  it("It does not have any post route", (done) => {
    const sampleData = helper.sampleSleepRecord("1");
    const sampleId = 1;
    chai
      .request(app)
      .post(`/sleep/${sampleId}`)
      .send(sampleData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("It does not have any put route", (done) => {
    const sampleData = helper.sampleSleepRecord("1");
    const sampleId = 1;
    chai
      .request(app)
      .put(`/sleep/${sampleId}`)
      .send(sampleData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

function postRecord(recordsToPost) {
  return new Promise((resolve, reject) => {
    const responses = [];
    const promises = recordsToPost.map(async (record) => {
      const res = await chai.request(app).post("/sleep").send(record);
      expect(res).to.have.status(201);
      responses.push(res.body);
    });
    Promise.all(promises)
      .then(() => resolve(responses))
      .catch(reject);
  });
}
