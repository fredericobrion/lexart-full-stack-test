const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { loginMiddleware } = require("../../../src/middlewares");

chai.use(sinonChai);

const VALID_EMAIL = "user@gmail.com";
const INVALID_EMAIL = "usergmail.com";
const VALID_PASSWORD = "123456";
const INVALID_PASSWORD = "123";

describe("Middleware de login", function () {
  beforeEach(function () {
    sinon.restore();
  });
  it("retorna um erro caso o email não seja informado", function () {
    const req = {
      body: {
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    loginMiddleware.validateLoginFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"email" is required',
    });
  });

  it("retorna um erro caso o email não seja válido", function () {
    const req = {
      body: {
        email: INVALID_EMAIL,
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    loginMiddleware.validateLoginFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"email" must be a valid email',
    });
  });

  it("retorna um erro caso a senha não seja informada", function () {
    const req = {
      body: {
        email: VALID_EMAIL,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    loginMiddleware.validateLoginFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"password" is required',
    });
  });

  it("retorna um erro caso a senha não seja válida", function () {
    const req = {
      body: {
        email: VALID_EMAIL,
        password: INVALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    loginMiddleware.validateLoginFields(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"password" length must be at least 6 characters long',
    });
  });

  it("chama o próximo middleware caso os campos sejam válidos", function () {
    const req = {
      body: {
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    loginMiddleware.validateLoginFields(req, res, next);

    expect(next).to.have.been.called;
  });
});
