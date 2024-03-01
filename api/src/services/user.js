const { User } = require("../models");
const bcrypt = require('bcrypt');

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const createUser = async (userName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ userName, email: email.toLowerCase(), password: hashedPassword });

    return {
        id: user.id,
        userName: user.userName,
        email: user.email,
    };
}

const findByEmail = async (email) => {
    const user = await User.findOne({ where: { email } });

    return user;
}

module.exports = {
    createUser,
    findByEmail,
}