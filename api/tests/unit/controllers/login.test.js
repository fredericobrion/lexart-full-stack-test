const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const loginController = require("../../../src/controllers/login");
const loginService = require("../../../src/services/login");
const { UNAUTHORIZED, OK } = require("../../../src/utils/mapStatusHTTP");
const { validUser, invalidUserEmail } = require("../../mocks/login.mock");
const { User } = require("../../../src/models");
const { request } = require('express');

chai.use(sinonChai);

describe("Login Controller", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("Login inválido", async function () {
    req.body = invalidUserEmail;

    // sinon.stub(User, "findOne").resolves(null);

    sinon
      .stub(loginService, "verifyLogin")
      .resolves({
        status: UNAUTHORIZED,
        data: { message: "E-mail or password invalid" },
      });

    // sinon
    //   .stub(loginService, "verifyLogin").callsFake(function fakeFn() {
    //     return { status: UNAUTHORIZED, data: { message: "E-mail or password invalid" } };
    //   })

    await loginController.generateToken(req, res);

    sinon.assert.calledWith(res.status, 401);
    sinon.assert.calledWith(res.json, { message: "E-mail or password invalid" });
  });

  it("Login válido", async function () {
    

    // sinon.stub(User, "findOne").resolves({});

    const serviceResponse = { status: OK, data: { token: "token" } };

    sinon.stub(loginService, "verifyLogin").resolves(serviceResponse);

    const req = { body: validUser };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    await loginController.generateToken(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });
});
