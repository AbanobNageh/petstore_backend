const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();

chai.use(chaiHttp);

describe("Pet routes tests", () => {
  describe("GET /V1/pet/bid/:petId", () => {
    it("Should return error when pet id is not a number", (done) => {
      chai
        .request(server)
        .get("/V1/pet/bid/aaa")
        .query({
          page_number: 1,
          page_size: 25,
        })
        .end((error, response) => {
          if (error) {
            console.log(error);
            return;
          }

          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("code");
          response.body.should.have.property("message");
          done();
        });
    });

    it("Should return error when pet doesn't exist", (done) => {
      chai
        .request(server)
        .get("/V1/pet/bid/10")
        .query({
          page_number: 1,
          page_size: 25,
        })
        .end((error, response) => {
          if (error) {
            console.log(error);
            return;
          }

          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("code");
          response.body.should.have.property("message");
          done();
        });
    });

    it("Should return 4 bids with pagination when all input is correct", (done) => {
      chai
        .request(server)
        .get("/V1/pet/bid/1")
        .query({
          page_number: 1,
          page_size: 25,
        })
        .end((error, response) => {
          if (error) {
            console.log(error);
            return;
          }

          response.should.have.status(200);
          response.body.should.have.property("data");
          response.body.data.should.be.a("array");
          response.body.data.length.should.be.eq(4);
          done();
        });
    });

    it("Should return 4 bids without pagination when all input is correct", (done) => {
      chai
        .request(server)
        .get("/V1/pet/bid/1")
        .end((error, response) => {
          if (error) {
            console.log(error);
            return;
          }

          response.should.have.status(200);
          response.body.should.have.property("data");
          response.body.data.should.be.a("array");
          response.body.data.length.should.be.eq(4);
          done();
        });
    });
  });

  describe("GET /V1/pet/auction/:petId", () => {
    it("Should return error when pet id is not a number", (done) => {
      chai
        .request(server)
        .get("/V1/pet/auction/aaa")
        .query({
          page_number: 1,
          page_size: 25,
        })
        .end((error, response) => {
          if (error) {
            console.log(error);
            return;
          }

          response.should.have.status(400);
          response.body.should.be.a("object");
          response.body.should.have.property("code");
          response.body.should.have.property("message");
          done();
        });
    });

    it("Should return error when pet doesn't exist", (done) => {
      chai
        .request(server)
        .get("/V1/pet/auction/10")
        .query({
          page_number: 1,
          page_size: 25,
        })
        .end((error, response) => {
          if (error) {
            console.log(error);
            return;
          }

          response.should.have.status(404);
          response.body.should.be.a("object");
          response.body.should.have.property("code");
          response.body.should.have.property("message");
          done();
        });
    });

    it("Should return an object with the results of the auction when all input is correct.", (done) => {
      chai
        .request(server)
        .get("/V1/pet/auction/1")
        .end((error, response) => {
          if (error) {
            console.log(error);
            return;
          }

          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });
});
