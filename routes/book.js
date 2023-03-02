
const {Router} = require('express');
const { getBook, getBooks, createBook, updateBook, deleteBook } = require('../controller/book');
const {check} = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// Rutas publicas
router.get('/:bid', getBook);
router.get('/', getBooks);

// Rutas privadas
router.post(
    '/',
    [
        validarJWT,
        check('title','El titulo del libro es requerido').not().isEmpty(),
        check('author','El autor del libro es requerido').not().isEmpty(),
        check('editorial','La editorial del libro es requerida').not().isEmpty(),
        check('postDate','La fecha de publicacion es requerida').isDate(),
        check('format','El formato es requerido').not().isEmpty(),      
        check('language','Es necesario especificar el lenguaje').not().isEmpty(),
        check('description','La descripcion es requerida').not().isEmpty(),
        check('category','La categoria del libro es requerida').not().isEmpty(),
        check('image','La url de la imagen del libro es requerida').isURL(),
        check('issue','La editorial del libro es requerida').not().isEmpty(),
        check('rating','La editorial del libro es requerida').not().isEmpty(),
        check('numberPages','La editorial del libro es requerida').not().isEmpty(),
        check('ISBN10','La editorial del libro es requerida').not().isEmpty(),
        check('ISBN13','El precio es requerido').isNumeric(),
        check('readAge','La descripcion es necesaria').not().isEmpty(),
        check('measureLexile','La categoria es necesaria').notEmpty(),
        check('ItemWeight','link de la imagen es necesario').notEmpty().isLength({min:5}),
        check('dimensions','link de la imagen es necesario').notEmpty().isLength({min:5}),
        check('aboutAuthor','link de la imagen es necesario').notEmpty().isLength({min:5}),
        check('price','link de la imagen es necesario').notEmpty().isLength({min:5}),
        check('user','El usuario es necesario').isMongoId(),
        validarCampos
    ],
    createBook
);

router.put('/:pid',validarJWT, updateBook);

router.delete('/:pid',validarJWT, deleteBook);



module.exports = router;