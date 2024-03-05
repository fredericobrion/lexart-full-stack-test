const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { phoneMiddleware } = require("../../../src/middlewares");
const {
  firstEstructure,
  secondEstructure,
  thirdEstructure,
  wrongFirstEstucture,
  wrongSecondEstucture,
  wrongThirdEstucture,
} = require("../../mocks/phone.mock");

chai.use(sinonChai);

describe("Middleware de phones", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("verifica a estrutura 1", function () {
    const req = {
      body: firstEstructure,
    };

    const res = {
      locals: {},
    };

    const next = sinon.stub();

    phoneMiddleware.verifyPhoneStructure(req, res, next);

    expect(res.locals.estructure).to.be.equal("1");
    expect(next).to.have.been.called;
  });

  it("verifica a estrutura 2", function () {
    const req = {
      body: secondEstructure,
    };

    const res = {
      locals: {},
    };

    const next = sinon.stub();

    phoneMiddleware.verifyPhoneStructure(req, res, next);

    expect(res.locals.estructure).to.be.equal("2");
    expect(next).to.have.been.called;
  });

  it("verifica a estrutura 3", function () {
    const req = {
      body: thirdEstructure,
    };

    const res = {
      locals: {},
    };

    const next = sinon.stub();

    phoneMiddleware.verifyPhoneStructure(req, res, next);

    expect(res.locals.estructure).to.be.equal("3");
    expect(next).to.have.been.called;
  });

  it("Gera erro caso a estrutura 1 não esteja correta", function () {
    const req = {
      body: wrongFirstEstucture,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      locals: {
        estructure: "1",
      },
    };

    const next = sinon.stub();

    phoneMiddleware.validatePhoneStructure(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"name" is required',
    });
  });

  it("Gera erro caso a estrutura 2 não esteja correta", function () {
    const req = {
      body: wrongSecondEstucture,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      locals: {
        estructure: "2",
      },
    };

    const next = sinon.stub();

    phoneMiddleware.validatePhoneStructure(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"brand" is required',
    });
  });

  it("Gera erro caso a estrutura 3 não esteja correta", function () {
    const req = {
      body: wrongThirdEstucture,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      locals: {
        estructure: "3",
      },
    };

    const next = sinon.stub();

    phoneMiddleware.validatePhoneStructure(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({
      message: '"price" is required',
    });
  });

  it("chama o próximo middleware caso a estrutura 1 esteja correta", function () {
    const req = {
      body: firstEstructure,
    };

    const res = {
      locals: {
        estructure: "1",
      },
    };

    const next = sinon.stub();

    phoneMiddleware.validatePhoneStructure(req, res, next);

    expect(next).to.have.been.called;
  });

  it("chama o próximo middleware caso a estrutura 2 esteja correta", function () {
    const req = {
      body: secondEstructure,
    };

    const res = {
      locals: {
        estructure: "2",
      },
    };

    const next = sinon.stub();

    phoneMiddleware.validatePhoneStructure(req, res, next);

    expect(next).to.have.been.called;
  });

  it("chama o próximo middleware caso a estrutura 3 esteja correta", function () {
    const req = {
      body: thirdEstructure,
    };

    const res = {
      locals: {
        estructure: "3",
      },
    };

    const next = sinon.stub();

    phoneMiddleware.validatePhoneStructure(req, res, next);

    expect(next).to.have.been.called;
  });
});
