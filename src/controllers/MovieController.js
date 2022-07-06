const Movie = require('../models/MovieModel');
const uuid = require('uuid');
const path = require('path');
const Gender = require('../models/GenderModel');

module.exports = {
    async index(req, res) {
        const movies = await Movie.findAll();
        return res.status(200).json(movies);
    },

    async show(req, res) {
        if (!req.params.movieId) {
            res.status(400).send({
                message: 'El id de la pelicula es requerido',
            });
            return;
        }

        // const movie = await Movie.findByPk(req.params.movieId);
        const movieWithGender = await Movie.findAll({
            where: {
                id: req.params.movieId,
            },
            include: {
                model: Gender,
            },
        });
        if (movieWithGender == null) {
            res.status(404).send({message: 'Pelicula no encontrada'});
            return;
        }
        res.send(movieWithGender);
    },

    async store(req, res) {
        if (!req.body.name) {
            res.status(400).send({
                message: 'El nombre es requerido',
            });
            return;
        }
        if (!req.body.description) {
            res.status(400).send({
                message: 'El descripción es requerido',
            });
            return;
        }
        if (req.file !== undefined) {
            let path_multer = req.file.path;
            let name_img = path_multer.substring(11, path_multer.length);
            url_server = 'http://127.0.0.1:3000/';
            url_fotografia = `${url_server}images/${name_img}`;
        } else {
            url_fotografia = 'img-no-insertada';
        }

        if (!req.body.genders) {
            res.status(400).send({
                message: 'se espera un array de generos',
            });
            return;
        }

        const movie = await Movie.create({
            name: req.body.name,
            code: uuid.v4(),
            description: req.body.description,
            image: url_fotografia,
        });

        genderJson = JSON.parse(req.body.genders);

        for (let gen in genderJson) {
            console.log(genderJson[gen]);
            movie.addGender([genderJson[gen]]);
        }

        res.send(movie);
    },
    async update(req, res) {
        if (!req.params.movieId) {
            res.status(400).send({
                message: 'El id de la movie es requerido',
            });
            return;
        }

        const movie = await Movie.findByPk(req.params.movieId);
        if (movie == null) {
            res.status(404).send({message: 'Pelicula no encontrada'});
            return;
        }

        if (req.file !== undefined) {
            let path_multer = req.file.path;
            let name_img = path_multer.substring(11, path_multer.length);
            url_server = 'http://127.0.0.1:3000/';
            url_fotografia = `${url_server}images/${name_img}`;
        } else {
            url_fotografia = movie.image;
        }

        movie.name = req.body.name;
        movie.description = req.body.description;
        (movie.image = url_fotografia), await movie.save();

        console.log(req.body.genders);
        genderJson = JSON.parse(req.body.genders);

        let ArrayGender = new Array();
        for (let gen in genderJson) {
            ArrayGender.push(await Gender.findByPk(genderJson[gen]));
        }
        await movie.setGenders(ArrayGender);

        res.send(movie);
    },
    async delete(req, res) {
        if (!req.params.movieId) {
            res.status(400).send({
                message: 'El id de la persona es requerido',
            });
            return;
        }
        const movie = await Movie.findByPk(req.params.movieId);
        if (movie == null) {
            res.status(404).send({message: 'Persona no encontrada'});
            return;
        }
        await movie.destroy();
        res.send({
            msg: `movie: id:${movie.id} name:${movie.name} fue eliminado`,
        });
    },
};
