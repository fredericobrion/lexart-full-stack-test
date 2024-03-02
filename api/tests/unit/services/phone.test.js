const { expect } = require("chai");
const sinon = require("sinon");
const { Phone } = require("../../../src/models");
const phoneService = require("../../../src/services/phone");
const {
  singlePhoneCreated,
  firstEstructure,
  secondEstructure,
  thirdEstructure,
  multiplePhonesCreated,
} = require("../../mocks/phone.mock");
const { CREATED, OK, NOT_FOUND } = require("../../../src/utils/mapStatusHTTP");

describe("Phone Service", function () {
  describe("Create single phone", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Cria o phone com a estrutura 1", async function () {
      sinon.stub(Phone, "create").resolves({ dataValues: singlePhoneCreated });

      const serviceResponse = await phoneService.createSinglePhone(
        "1",
        firstEstructure
      );

      expect(serviceResponse.status).to.eq(CREATED);
      expect(serviceResponse.data).to.deep.eq(singlePhoneCreated);
    });

    it("Cria o phone com a estrutura 2", async function () {
      sinon.stub(Phone, "create").resolves({ dataValues: singlePhoneCreated });

      const serviceResponse = await phoneService.createSinglePhone(
        "2",
        secondEstructure
      );

      expect(serviceResponse.status).to.eq(CREATED);
      expect(serviceResponse.data).to.deep.eq(singlePhoneCreated);
    });
  });

  describe("Create multiple phones", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Cria os phones", async function () {
      sinon
        .stub(Phone, "bulkCreate")
        .resolves([
          { dataValues: multiplePhonesCreated[0] },
          { dataValues: multiplePhonesCreated[1] },
        ]);

      const serviceResponse = await phoneService.createMultiplePhones(
        thirdEstructure
      );

      expect(serviceResponse.status).to.eq(CREATED);
      expect(serviceResponse.data).to.deep.eq(multiplePhonesCreated);
    });
  });

  describe("Get phones", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Retorna os phones", async function () {
      sinon.stub(Phone, "findAll").resolves([
        { dataValues: multiplePhonesCreated[0] },
        { dataValues: multiplePhonesCreated[1] },
      ]);

      const serviceResponse = await phoneService.getPhones();

      expect(serviceResponse.status).to.eq(OK);
      expect(serviceResponse.data).to.deep.eq(multiplePhonesCreated);
    });
  });

  describe("Delete phone", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Não encontra o phone", async function () {
      sinon.stub(Phone, "findByPk").resolves(null);

      const serviceResponse = await phoneService.deletePhone(1);

      expect(serviceResponse.status).to.eq(NOT_FOUND);
      expect(serviceResponse.data).to.deep.eq({ message: "Phone not found" });
    });

    it("Deleta o phone", async function () {
      sinon.stub(Phone, "findByPk").resolves({ dataValues: singlePhoneCreated });
      sinon.stub(Phone, "destroy");

      const serviceResponse = await phoneService.deletePhone(1);

      expect(serviceResponse.status).to.eq(OK);
      expect(serviceResponse.data).to.deep.eq(singlePhoneCreated);
    });
  });

  describe("Update phone", function () {
    beforeEach(function () {
      sinon.restore();
    });

    it("Não encontra o phone", async function () {
      sinon.stub(Phone, "findByPk").resolves(null);

      const serviceResponse = await phoneService.updatePhone(1, singlePhoneCreated);

      expect(serviceResponse.status).to.eq(NOT_FOUND);
      expect(serviceResponse.data).to.deep.eq({ message: "Phone not found" });
    });
  });
});
