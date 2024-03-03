const filterPhones = (phones, filter, color, minimumPrice, maximumPrice) => {
  let filteredPhones = phones;
  console.log(filteredPhones);

  if (filter) {
    const searchTerm = filter.toLowerCase();
    filteredPhones = filteredPhones.filter((phone) => {
      return (
        phone.name.toLowerCase().includes(searchTerm) ||
        phone.model.toLowerCase().includes(searchTerm) ||
        phone.brand.toLowerCase().includes(searchTerm)
      );
    });
  }

  if (color) {
    const searchTerm = color.toLowerCase();
    filteredPhones = filteredPhones.filter((phone) => {
      return phone.color.toLowerCase().includes(searchTerm);
    });
  }

  if (minimumPrice) {
    console.log(typeof minimumPrice, typeof filteredPhones[0].price);
    filteredPhones = filteredPhones.filter((phone) => {
      return parseInt(phone.price) >= parseInt(minimumPrice);
    });
  }

  if (maximumPrice) {
    filteredPhones = filteredPhones.filter((phone) => {
      return parseInt(phone.price) <= parseInt(maximumPrice);
    });
  }

  return filteredPhones;
};

export default filterPhones;
