const formatSecondPhoneEstructure = (phone) => {
  return {
    name: phone.name,
    brand: phone.details.brand,
    model: phone.details.model,
    price: phone.price,
    color: phone.details.color,
  };
};

const formatThirdPhoneEstructure = (phones) => {
  const formattedPhones = [];

  phones.forEach((item) => {
    item.data.forEach((phone) => {
      const formattedPhone = {
        name: item.name,
        brand: item.brand,
        model: item.model,
        price: phone.price,
        color: phone.color,
      };
      formattedPhones.push(formattedPhone);
    });
  });

  return formattedPhones;
};

module.exports = {
  formatSecondPhoneEstructure,
  formatThirdPhoneEstructure,
};
