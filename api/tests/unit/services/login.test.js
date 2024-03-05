const { expect } = require("chai");
const sinon = require("sinon");
const { User } = require("../../../src/models");
const loginMock = require("../../mocks/login.mock");
const { loginService } = require("../../../src/services");
const { UNAUTHORIZED, OK } = require("../../../src/utils/mapStatusHTTP");

describe("Login Service", function () {
  beforeEach(function () {
    sinon.restore();
  });

  it("Ao não receber um email existente, retorna um erro", async function () {
    const parameters = loginMock.invalidUserEmail;

    sinon.stub(User, "findOne").resolves(null);

    const serviceResponse = await loginService.verifyLogin(
      parameters.email,
      parameters.password
    );

    expect(serviceResponse.status).to.eq(UNAUTHORIZED);
    expect(serviceResponse.data).not.to.have.key("token");
    expect(serviceResponse.data).to.deep.eq({
      message: "E-mail or password invalid",
    });
  });

  it("Ao receber um email existente e senha incorreta, retorna um erro", async function () {
    const parameters = loginMock.invalidUserPassword;

    sinon.stub(User, "findOne").resolves({ password: loginMock.validPassword });

    const serviceResponse = await loginService.verifyLogin(
      parameters.email,
      parameters.password
    );

    expect(serviceResponse.status).to.eq(UNAUTHORIZED);
    expect(serviceResponse.data).not.to.have.key("token");
    expect(serviceResponse.data).to.deep.eq({
      message: "E-mail or password invalid",
    });
  });

  it("Ao receber um email existente e senha correta, retorna um token de login", async function () {
    const parameters = loginMock.validUser;

    sinon.stub(User, "findOne").resolves({
      id: loginMock.id,
      userName: loginMock.userName,
      password: loginMock.hashedPassword,
    });

    const serviceResponse = await loginService.verifyLogin(
      parameters.email,
      parameters.password
    );

    expect(serviceResponse.status).to.eq(OK);
    expect(serviceResponse.data).to.have.key('token');
  });
});
