const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../src/app.js");
const helper = require("../helpers/helper.js");

chai.use(chaiHttp);
const { expect } = chai;
describe("Post Method /sleep Testing", () => {
  it("should be able to add sleep record", (done) => {
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
  it("cannot record sleep if no data passed", (done) => {
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
  it("userId is required  to record sleep", (done) => {
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
  it("timestamp is required to record sleep", (done) => {
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
  it("hours is required to record sleep", (done) => {
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
});
