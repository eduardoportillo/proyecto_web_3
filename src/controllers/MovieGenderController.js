const Movie = require('../models/MovieModel');
const Gender = require('../models/GenderModel');

module.exports = {
    async show(req, res) {
		if (!req.params.genderId) {
			res.status(400).send({
				message: 'El id del Genero es requerido',
			});
			return;
		}
        
		const movieGender = await Gender.findAll({
            where: {
                "id": req.params.genderId
            },include:{
                model: Movie,
            }
        });
		if (movieGender == null) {
			res.status(404).send({message: 'Pelicula no encontrada'});
			return;
		}
		res.send(movieGender);
	},
}
