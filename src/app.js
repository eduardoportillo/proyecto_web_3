const express = require("express");
const logger = require('morgan');
const sequelize = require("./config/db");
let cors = require('cors');
const movieRoutes = require("./routes/Routes");
const app = express();



//server config
app.use(express.json());
app.use(logger('dev'));
app.use(cors());
app.use('/images', express.static(__dirname+'/images'));

//routes
app.use(require('./routes/Routes'));

//Http Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
});

//db
sequelize.sync({ force: false }).then(() => {
    console.log("Conexion a la base de datos exitosa");
}).catch(error => {
    console.log('Se ha producido un error', error);
})



