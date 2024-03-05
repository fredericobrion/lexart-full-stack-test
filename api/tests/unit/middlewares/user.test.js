const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { userMiddleware } = require("../../../src/middlewares");
const { userService } = require("../../../src/services");
const { OK, NOT_FOUND } = require("../../../src/utils/mapStatusHTTP");

chai.use(sinonChai);

const VALID_USER_NAME = "user";
const INVALID_USER_NAME = "us";
const VALID_EMAIL = "user@gmail.com";
const INVALID_EMAIL = "usergmail.com";
const VALID_PASSWORD = "123456";
const INVALID_PASSWORD = "123";

describe("Middleware de usuário", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("retorna um erro caso o email não seja informado", function () {
    const req = {
      body: {
        userName: VALID_USER_NAME,
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    userMiddleware.validateNewUser(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"email" is required',
    });
  });

  it("retorna um erro caso o email não seja válido", function () {
    const req = {
      body: {
        userName: VALID_USER_NAME,
        email: INVALID_EMAIL,
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    userMiddleware.validateNewUser(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"email" must be a valid email',
    });
  });

  it("retorna um erro caso a senha não seja informada", function () {
    const req = {
      body: {
        userName: VALID_USER_NAME,
        email: VALID_EMAIL,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    userMiddleware.validateNewUser(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"password" is required',
    });
  });

  it("retorna um erro caso a senha não seja válida", function () {
    const req = {
      body: {
        userName: VALID_USER_NAME,
        email: VALID_EMAIL,
        password: INVALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    userMiddleware.validateNewUser(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"password" length must be at least 6 characters long',
    });
  });

  it("retorna um erro caso o usuário não seja informado", function () {
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

    userMiddleware.validateNewUser(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"userName" is required',
    });
  });

  it("retorna um erro caso o usuário não seja válido", function () {
    const req = {
      body: {
        userName: INVALID_USER_NAME,
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    userMiddleware.validateNewUser(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"userName" length must be at least 3 characters long',
    });
  });

  it("da erro caso o email já esteja cadastrado", async function () {
    const req = {
      body: {
        userName: VALID_USER_NAME,
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    sinon.stub(userService, "findByEmail").resolves({
      status: OK,
    });

    await userMiddleware.validateNewUser(req, res, next);

    expect(res.status).to.have.been.calledWith(409);
    expect(res.json).to.have.been.calledWith(
      "E-mail already registered. Please try again."
    );
  });

  it("cadastra usuário com sucesso", async function () {
    const req = {
      body: {
        userName: VALID_USER_NAME,
        email: VALID_EMAIL,
        password: VALID_PASSWORD,
      },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    const next = sinon.stub();

    sinon.stub(userService, "findByEmail").resolves({
      status: NOT_FOUND,
    });

    await userMiddleware.validateNewUser(req, res, next);

    expect(next).to.have.been.called;
  });
});
