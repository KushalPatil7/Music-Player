const JWT_SECRET= "njcnirjenirj";
const jwt = require("jsonwebtoken");

const fetchuser = (req, res, next) => {
    // Get the user from JWT token and add it to req object
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).send({ error: "Please provide a valid authentication token" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {;
        console.log(error)
    return res.status(401).send({ error: "Invalid token provided or token has expired" });
    }
};



module.exports = fetchuser;
