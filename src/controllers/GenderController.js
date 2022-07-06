const Gender = require('../models/GenderModel');

module.exports = {
    async index(req, res) {
        const gender = await Gender.findAll();
        return res.status(200).json(gender);
    },

    async show(req, res){
        if(!req.params.genderId){
            res.status(400).send({
                message: "El id de la pelicula es requerido"
            });
            return;
        }
        const gender = await Gender.findByPk(req.params.genderId);
        if (gender == null) {
            res.status(404).send({ message: "Pelicula no encontrada" });
            return;
        }
        res.send(gender);
    },

    async store(req, res){
        if(!req.body.name){
            res.status(400).send({
                message: "El nombre es requerido"
            });
            return;
        }

        const gender = await Gender.create({
            name: req.body.name,
        });
    
        res.send(gender);
    },
    async update(req, res){
        if(!req.params.genderId){
            res.status(400).send({
                message: "El id de la gender es requerido"
            });
            return;
        }
        const gender = await Gender.findByPk(req.params.genderId);
        if (gender == null) {
            res.status(404).send({ message: "Pelicula no encontrada" });
            return;
        }
    
        if(!req.body.name){
            res.status(400).send({
                message: "El nombre es requerido"
            });
            return;
        }

        gender.name = req.body.name;
        await gender.save();
    
        res.send(gender);
    },
    async delete(req,res){
        if(!req.params.genderId){
            res.status(400).send({
                message: "El id de la persona es requerido"
            });
            return;
        }
        const gender = await Gender.findByPk(req.params.genderId);
        if (gender == null) {
            res.status(404).send({ message: "Persona no encontrada" });
            return;
        }
        await gender.destroy();
        res.send({msg: `gender: id:${gender.id} name:${gender.name} fue eliminado`});
    }

};

