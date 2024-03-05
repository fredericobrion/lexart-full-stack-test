const singlePhoneCreated = {
  id: 1,
  name: "Xiomi Redmi 9",
  brand: "Xiaomi",
  model: "Redmi 9",
  price: "1000",
  color: "red",
};

const firstEstructure = {
  name: "Xiaomi Redmi 9",
  brand: "Xiaomi",
  model: "Redmi 9",
  price: 10000,
  color: "red",
};

const wrongFirstEstucture = {
  nam: "Xiaomi Redmi 9",
  brand: "Xiaomi",
  model: "Redmi 9",
  price: 10000,
  color: "red",
};

const secondEstructure = {
  name: "Xiaomi Redmi 9",
  details: {
    brand: "Xiaomi",
    model: "Redmi 9",
    color: "red",
  },
  price: 10000,
};

const wrongSecondEstucture = {
  name: "Xiaomi Redmi 9",
  details: {
    brad: "Xiaomi",
    model: "Redmi 9",
    color: "red",
  },
  price: 10000,
};

const thirdEstructure = [
  {
    name: "Xiaomi Redmi 9",
    brand: "Xiaomi",
    model: "Redmi 9",
    data: [
      {
        price: 10000,
        color: "red",
      },
      {
        price: 10000,
        color: "blue",
      },
    ],
  },
];

const wrongThirdEstucture = [
  {
    name: "Xiaomi Redmi 9",
    brand: "Xiaomi",
    model: "Redmi 9",
    data: [
      {
        price: 10000,
        color: "red",
      },
      {
        prie: 10000,
        color: "blue",
      },
    ],
  },
];

const multiplePhonesCreated = [
  {
    id: 1,
    name: "Xiomi Redmi 9",
    brand: "Xiaomi",
    model: "Redmi 9",
    price: "1000",
    color: "red",
  },
  {
    id: 1,
    name: "Xiomi Redmi 9",
    brand: "Xiaomi",
    model: "Redmi 9",
    price: "1000",
    color: "blue",
  },
];

module.exports = {
  firstEstructure,
  secondEstructure,
  singlePhoneCreated,
  thirdEstructure,
  multiplePhonesCreated,
  wrongFirstEstucture,
  wrongSecondEstucture,
  wrongThirdEstucture,
};
