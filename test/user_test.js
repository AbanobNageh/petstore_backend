const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const path = require('path');
const Umzug = require("umzug");
const database = require("../models/index");

chai.should();

chai.use(chaiHttp);

before(async function() {
  const migrationsConfig = {
    migrations: {
      path: path.join(__dirname, "../migrations"),
      params: [
        database.sequelize.getQueryInterface(),
        database.sequelize.constructor
      ],
    },
    storage: "sequelize",
    storageOptions: {
      sequelize: database.sequelize,
    },
    logger: console,
  };

  const seedsConfig = {
    migrations: {
      path: path.join(__dirname, "../seeders"),
      params: [
        database.sequelize.getQueryInterface(),
        database.sequelize.constructor
      ],
    },
    storage: "sequelize",
    storageOptions: {
      sequelize: database.sequelize,
      modelName: "SequelizeData",
    },
    logger: console,
  };

  const migrator = new Umzug(migrationsConfig);
  const seeder = new Umzug(seedsConfig);

  await seeder.down({ to: 0 });
  await migrator.down({ to: 0 });
  await migrator.up();
  await seeder.up();
});

describe("User routes tests", () => {
  describe("POST /V1/user/bid/:username", () => {
    it("Should return error when the user doesn't exist.", (done) => {
      chai
        .request(server)
        .post("/V1/user/bid/user11")
        .send({
          pet_id: 2,
          amount: 200,
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

    it("Should return error when one or more of sent data are null", (done) => {
      chai
        .request(server)
        .post("/V1/user/bid/user1")
        .send({
          pet_id: null,
          amount: null,
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

    it("Should return error when one or more of sent data are not numbers", (done) => {
      chai
        .request(server)
        .post("/V1/user/bid/user1")
        .send({
          pet_id: "2",
          amount: "200",
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

    it("Should return error when the pet doesn't exist", (done) => {
      chai
        .request(server)
        .post("/V1/user/bid/user1")
        .send({
          pet_id: 20,
          amount: 200,
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

    it("Should add a new bid when all input is correct.", (done) => {
      chai
        .request(server)
        .post("/V1/user/bid/user1")
        .send({
          pet_id: 2,
          amount: 200,
        })
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

    it("Should return error when the bid already exists", (done) => {
      chai
        .request(server)
        .post("/V1/user/bid/user1")
        .send({
          pet_id: 2,
          amount: 200,
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
  });
});
