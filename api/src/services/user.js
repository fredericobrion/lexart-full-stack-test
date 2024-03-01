const { User } = require("../models");
const bcrypt = require('bcrypt');

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const createUser = async (userName, email, password) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ userName, email, hashedPassword });

    return {
        id: user.id,
        userName: user.userName,
        email: user.email,
    };
}

module.exports = {
    createUser,
}