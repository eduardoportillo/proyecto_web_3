const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    if(!req.headers.authorization) {
        res.status(403).json({ msg: "Acceso no autorizado" });
    } else {

        let token = req.headers.authorization.split(" ")[1];

        jwt.verify(token, "proyecto4_web3", (err, decoded) => {

            if(err) {
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            } else {
                req.user = decoded;
                next();
            }

        })
    }
}