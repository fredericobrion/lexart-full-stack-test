const { expect } = require("chai");
const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { phoneService } = require("../../../src/services");
const { phoneController } = require("../../../src/controllers");
const { OK, CREATED, NOT_FOUND } = require("../../../src/utils/mapStatusHTTP");
const {
  firstEstructure,
  singlePhoneCreated,
  secondEstructure,
  thirdEstructure,
  multiplePhonesCreated,
} = require("../../mocks/phone.mock");

chai.use(sinonChai);

describe("Phone Controller", function () {
  describe("Criação de telefones", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Cria um único telefone, com a estrutura 1", async function () {
      const req = {
        body: firstEstructure,
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        locals: { estructure: "1" },
      };

      const mockResponse = {
        status: CREATED,
        data: singlePhoneCreated,
      };

      sinon.stub(phoneService, "createSinglePhone").resolves(mockResponse);

      await phoneController.createPhone(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });

    it("Cria um único telefone, com a estrutura 2", async function () {
      const req = {
        body: secondEstructure,
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        locals: { estructure: "2" },
      };

      const mockResponse = {
        status: CREATED,
        data: singlePhoneCreated,
      };

      sinon.stub(phoneService, "createSinglePhone").resolves(mockResponse);

      await phoneController.createPhone(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });

    it("Cria vários telefones, com a estrutura 3", async function () {
      const req = {
        body: thirdEstructure,
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
        locals: { estructure: "3" },
      };

      const mockResponse = {
        status: CREATED,
        data: singlePhoneCreated,
      };

      sinon.stub(phoneService, "createMultiplePhones").resolves(mockResponse);

      await phoneController.createPhone(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });
  });

  describe("Busca de telefones", function () {
    it("Busca telefones com sucesso", async function () {
      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: OK,
        data: multiplePhonesCreated,
      };

      sinon.stub(phoneService, "getPhones").resolves(mockResponse);

      await phoneController.getPhones(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });
  });

  describe("Deleta um telefone", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Telefone não encontrado", async function () {
      const req = {
        params: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: NOT_FOUND,
        data: { message: "Phone not found" },
      };

      sinon.stub(phoneService, "deletePhone").resolves(mockResponse);

      await phoneController.deletePhone(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });

    it("Deleta um telefone com sucesso", async function () {
      const req = {
        params: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: CREATED,
        data: singlePhoneCreated,
      };

      sinon.stub(phoneService, "deletePhone").resolves(mockResponse);

      await phoneController.deletePhone(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });
  });

  describe("Atualiza um telefone", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Telefone não encontrado", async function () {
      const req = {
        params: { id: 1 },
        body: firstEstructure,
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: NOT_FOUND,
        data: { message: "Phone not found" },
      };

      sinon.stub(phoneService, "updatePhone").resolves(mockResponse);

      await phoneController.updatePhone(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });

    it("Atualiza um telefone com sucesso", async function () {
      const req = {
        params: { id: 1 },
        body: firstEstructure,
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: CREATED,
        data: singlePhoneCreated,
      };

      sinon.stub(phoneService, "updatePhone").resolves(mockResponse);

      await phoneController.updatePhone(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });
  });

  describe("Busca um telefone", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Telefone não encontrado", async function () {
      const req = {
        params: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: NOT_FOUND,
        data: { message: "Phone not found" },
      };

      sinon.stub(phoneService, "getSinglePhone").resolves(mockResponse);

      await phoneController.getSinglePhone(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });

    it("Busca um telefone com sucesso", async function () {
      const req = {
        params: { id: 1 },
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      const mockResponse = {
        status: OK,
        data: singlePhoneCreated,
      };

      sinon.stub(phoneService, "getSinglePhone").resolves(mockResponse);

      await phoneController.getSinglePhone(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(mockResponse.data);
    });
  });
});
