const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

class User extends Model {}

User.init(
	{
		username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,
                len: {args: [2,255], msg: "El nombre tiene que ser minimo de 2 chars"}
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                notEmpty: true,
                isEmail: {msg: "El email tiene que ser un correo valido"}
            }
        },
	},
	{
		sequelize,
		modelName: 'user',
		timestamps: true,
	}
);

module.exports = User;