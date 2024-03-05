const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { loginService } = require("../../../src/services");
const { loginController } = require("../../../src/controllers");
const { UNAUTHORIZED, OK } = require("../../../src/utils/mapStatusHTTP");
const { validUser, invalidUserEmail } = require("../../mocks/login.mock");

chai.use(sinonChai);

describe("Login Controller", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("Login inválido", async function () {
    const req = {
      body: invalidUserEmail,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const mockResponse = {
      status: UNAUTHORIZED,
      data: { message: "E-mail or password invalid" },
    };

    sinon.stub(loginService, "verifyLogin").resolves(mockResponse);

    await loginController.generateToken(req, res);

    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith(mockResponse.data);
  });

  it("Login válido", async function () {
    const req = {
      body: validUser,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const mockResponse = {
      status: OK,
      data: { token: "token" },
    };

    sinon.stub(loginService, "verifyLogin").resolves(mockResponse);

    await loginController.generateToken(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(mockResponse.data);
  })
});
