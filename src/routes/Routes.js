const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

//Middlewares
const auth = require('../middlewares/auth');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'src/images');
	},
	filename: function (req, file, cb) {
		let ext = path.extname(file.originalname);
		const fileName = uuid.v4() + '-' + file.originalname;
		cb(null, fileName);
	},
});	

let upload = multer({storage: storage});

//Controllers
const AuthController = require('../controllers/AuthController');
const movieController = require('../controllers/MovieController');
const genderController = require('../controllers/GenderController');
const movieGenderController = require('../controllers/MovieGenderController');

//Auth
router.post('/api/token/', AuthController.singIn);
router.post('/entidades/signup/', AuthController.singUp);

//Movie
router.get('/entidades/movie/', movieController.index);
router.get('/entidades/movie/:movieId', auth, movieController.show);
router.post(
	'/entidades/movie/',
	upload.single('image'),
	auth,
	movieController.store
);
router.patch(
	'/entidades/movie/:movieId',
	upload.single('image'),
	auth,
	movieController.update
);
router.delete('/entidades/movie/:movieId', auth, movieController.delete);

//Gender
router.get('/entidades/gender/', genderController.index);
router.get('/entidades/gender/:genderId', auth, genderController.show);
router.post('/entidades/gender/', auth, genderController.store);
router.put('/entidades/gender/:genderId', auth, genderController.update);
router.delete('/entidades/gender/:genderId', auth, genderController.delete);

//MovieGender
router.get(
	'/entidades/movie-gender/:genderId/list/',
	auth,
	movieGenderController.show
);

module.exports = router;
