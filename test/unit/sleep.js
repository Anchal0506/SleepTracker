const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app.js");
const helper = require("../helpers/helper.js");

chai.use(chaiHttp);
const { expect } = chai;

describe("Route /sleep Testing", () => {
  beforeEach(() => {
    // Resetting Records
    app.locals.sleepRecords.splice(0, app.locals.sleepRecords.length);
  });

  it("It should be able to add sleep record", (done) => {
    chai
      .request(app)
      .post("/sleep")
      .send(helper.sampleSleepRecord())
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);

        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("userId");
        expect(res.body).to.have.property("timestamp");
        expect(res.body).to.have.property("hours");

        done();
      });
  });

  it("It cannot record sleep if no data passed", (done) => {
    chai
      .request(app)
      .post("/sleep")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("It required userId  to record sleep", (done) => {
    const sleepRecordWithoutUserId = helper.sampleSleepRecord();
    delete sleepRecordWithoutUserId["hours"];
    chai
      .request(app)
      .post("/sleep")
      .send(sleepRecordWithoutUserId)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("It required timestamp to record sleep", (done) => {
    const sleepRecordWithoutTimestamp = helper.sampleSleepRecord();
    delete sleepRecordWithoutTimestamp["timestamp"];
    chai
      .request(app)
      .post("/sleep")
      .send(sleepRecordWithoutTimestamp)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("It requires hours to record sleep", (done) => {
    const sleepRecordWithoutHours = helper.sampleSleepRecord();
    delete sleepRecordWithoutHours["hours"];
    chai
      .request(app)
      .post("/sleep")
      .send(sleepRecordWithoutHours)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("error");
        done();
      });
  });

  it("It does not have any PUT METHOD", (done) => {
    const sampleData = helper.sampleSleepRecord("1");
    chai
      .request(app)
      .put(`/sleep`)
      .send(sampleData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("It does not have any GET METHOD", (done) => {
    chai
      .request(app)
      .get(`/sleep`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("It does not have any DELETE METHOD", (done) => {
    chai
      .request(app)
      .delete(`/sleep`)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  
});
