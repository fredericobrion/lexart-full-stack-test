const { Phone } = require('../models');

const createSinglePhone = async (name, brand, model, price, color) => {
    const phone = await Phone.create({ name, brand, model, price, color });

    return {
        id: phone.id,
        name: phone.name,
        brand: phone.brand,
        model: phone.model,
        price: phone.price,
        color: phone.color,
    };
};

module.exports = {
    createSinglePhone,
};