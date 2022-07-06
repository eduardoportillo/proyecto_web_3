const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Gender = require("./GenderModel")

class Movie extends Model {}

Movie.init(
	{
		name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        image: {
            type: DataTypes.STRING,
        },
	},
	{
		sequelize,
		modelName: 'movie',
		timestamps: false,
	}
);

Movie.belongsToMany(Gender, {through: "movie_gender"});
Gender.belongsToMany(Movie, {through: "movie_gender"});

module.exports = Movie;
