const express = require ('express');
const router = express.Router();


const{list,create,remove,cursosId} = require('../controllers/categoryControllers');

router.get('/cursos',list);
router.get('/create',create);
router.get('/cursosId', remove);
router.param('cursosId',cursosId);



module.exports = router ;