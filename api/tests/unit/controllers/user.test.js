const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { userService } = require("../../../src/services");
const { userController } = require("../../../src/controllers");
const { OK, CREATED, NOT_FOUND } = require("../../../src/utils/mapStatusHTTP");

chai.use(sinonChai);

const EMAIL = "user@gmail.com";
const PASSWORD = "123456";
const USER_NAME = "user";

describe("User Controller", function () {
  describe("Criação de usuários", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("cria um usuário", async function () {
      const req = {
        body: {
          userName: USER_NAME,
          email: EMAIL,
          password: PASSWORD,
        },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: CREATED,
        data: {
          userName: USER_NAME,
          email: EMAIL,
          id: 1,
        },
      };

      sinon.stub(userService, "createUser").resolves(mockResponse);

      await userController.createUser(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });
  });
});
