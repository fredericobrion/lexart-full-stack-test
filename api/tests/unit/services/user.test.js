const { expect } = require("chai");
const sinon = require("sinon");
const { User } = require("../../../src/models");
const userService = require('../../../src/services/user');
const { CREATED, OK, NOT_FOUND } = require("../../../src/utils/mapStatusHTTP");

const EMAIL_1 = "teste@gmail.com";
const EMAIL_2 = "teste2@gmai.com";
const PASSWORD = "123456";
const USER_NAME = "teste";

describe("Phone Service", function () {
  describe("Create user", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Cria o usuário com sucesso", async function () {
      sinon.stub(User, "create").resolves({
        id: 1,
        userName: USER_NAME,
        email: EMAIL_1,
      });

      const serviceResponse = await userService.createUser(USER_NAME, EMAIL_1, PASSWORD);

      expect(serviceResponse.status).to.eq(CREATED);
      expect(serviceResponse.data).to.deep.eq({ id: 1, userName: USER_NAME, email: EMAIL_1 });
    });
  });


  describe("Find by email", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Retorna o usuário encontrado", async function () {
      sinon.stub(User, "findOne").resolves({
        id: 1,
        userName: USER_NAME,
        email: EMAIL_1,
      });

      const serviceResponse = await userService.findByEmail(EMAIL_1);

      expect(serviceResponse.status).to.eq(OK);
      expect(serviceResponse.data).to.deep.eq({ id: 1, userName: USER_NAME, email: EMAIL_1 });
    });

    it("Retorna usuário não encontrado", async function () {
      sinon.stub(User, "findOne").resolves(null);

      const serviceResponse = await userService.findByEmail(EMAIL_2);

      expect(serviceResponse.status).to.eq(NOT_FOUND);
      expect(serviceResponse.data).to.deep.eq({ message: "User not found" });
    });
  });
});
