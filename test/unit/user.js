const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app.js");
const helper = require("../helpers/helper.js");

chai.use(chaiHttp);
const { expect } = chai;

describe("Get Method /sleep/:userId Testing", () => {
  beforeEach(() => {
    app.locals.sleepRecords.splice(0, app.locals.sleepRecords.length);
  });

  it("It should be able retrieve all record posted by user", (done) => {
    const userId = "1";
    const count = 10;
    const sampleRecords = helper.getArrayOfSleepRecord(userId, count);
    postRecord(sampleRecords).then((res) => {
      chai
        .request(app)
        .get(`/sleep/${userId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(count);
        });
      done();
    });
  });

  it("It retrieved record should of user only", (done) => {
    const userId = "1";
    const count = 10;
    const sampleRecords = helper.getArrayOfSleepRecord(userId, count);
    postRecord(sampleRecords).then((res) => {
      chai
        .request(app)
        .get(`/sleep/${userId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(count);
          res.body.forEach((record) => {
            expect(record.userId).to.equal(userId);
          });
        });
      done();
    });
  });

  it("It retrieved record that are sorted by timestamp", (done) => {
    const userId = "1";
    const count = 10;
    const sampleRecords = helper.getArrayOfSleepRecord(userId, count);
    postRecord(sampleRecords).then((response) => {
      response.sort((a, b) => b.timestamp - a.timestamp);
      chai
        .request(app)
        .get(`/sleep/${userId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(count);
          for (let index = 0; index < count; index++) {
            expect(res.body[index].timestamp).to.equal(
              response[index].timestamp
            );
          }
        });
      done();
    });
  });

  it("It retrieved origional records , that are posted by user", (done) => {
    const userId = "1";
    const count = 10;
    const sampleRecords = helper.getArrayOfSleepRecord(userId, count);
    postRecord(sampleRecords).then((response) => {
      response.sort((a, b) => b.timestamp - a.timestamp);
      chai
        .request(app)
        .get(`/sleep/${userId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(count);
          for (let index = 0; index < count; index++) {
            expect(res.body[index].id).to.equal(response[index].id);
            expect(res.body[index].userId).to.equal(response[index].userId);
            expect(res.body[index].timestamp).to.equal(
              response[index].timestamp
            );
            expect(res.body[index].hours).to.equal(response[index].hours);
          }
        });
      done();
    });
  });

  it("It retrieved record that are sorted by timestamp", (done) => {
    const validUser = "1";
    const count = 10;
    const invalidUser = "2";
    const sampleRecords = helper.getArrayOfSleepRecord(validUser, count);
    postRecord(sampleRecords).then((response) => {
      chai
        .request(app)
        .get(`/sleep/${invalidUser}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(0);
        });
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
