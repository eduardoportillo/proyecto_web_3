const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const Movie = require("./MovieModel")

class Gender extends Model {}

Gender.init(
	{
		name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                len: {args: [2,255], msg: "El nombre tiene que ser minimo de 2 chars"}
            }
        }
	},
	{
		sequelize,
		modelName: 'gender',
		timestamps: false,
	}
);

// Gender.belongsToMany(Movie, {through: "movie_gender"})

module.exports = Gender;
