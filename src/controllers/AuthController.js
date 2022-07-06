const User = require("../models/UserModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    //Login
    singIn(req, res){
        
        let {email, password} = req.body;

        User.findOne({
            where: {
                email: email
            }
        }).then(user => {
            if (!user) {
                res.status(404).json({ msg: "Usuario con este correo no encontrado" });
            } else {
                if (bcrypt.compareSync(password, user.password)) {
                    let token = jwt.sign({ user: user }, "proyecto4_web3", {
                        expiresIn: "24h"
                    })
                    res.json({
                        // user: user,
                        token: token
                    })
                } else {
                    res.status(401).json({ msg: "Contraseña incorrecta" })
                }
            }
        }).catch(err => {
            res.status(500).json({msg: err})
        })


    },

    singUp(req, res){

        let passwordEncrypt = bcrypt.hashSync(req.body.password, 10)

        User.create({
            username: req.body.username,
            password: passwordEncrypt, 
            email: req.body.email,
        }).then(user=>{
            let token = jwt.sign({user: user}, "proyecto4_web3", {
                expiresIn: "24h"
            })
            res.json({
                user: user,
                token:token
            });
        }).catch(err => {
            res.status(500).json({msg: err.errors[0].message})
        })
    }
}