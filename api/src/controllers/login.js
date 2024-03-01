const jwt = require("jsonwebtoken");
const { verifyLogin } = require("../services/login");

const { JWT_SECRET } = process.env;

const generateToken = async (req, res) => {
    const { email, password } = req.body;
    
    const user = await verifyLogin(email, password);
    
    if (user.message) {
        return res.status(401).json(user);
    }

    
    const jwtConfig = {
        expiresIn: "7d",
        algorithm: "HS256",
    };
    
    const token = jwt.sign({ id: user.id, userName: user.userName }, JWT_SECRET, jwtConfig);
    
    return res.status(200).json({ token });
};

module.exports = {
    generateToken,
};
