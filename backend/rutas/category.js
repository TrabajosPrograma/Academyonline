const express = require ('express');
const router = express.Router();

const {list,create,categoryById} =require ("../controllers/categoryControllers");

router.get('/categorias',list);
router.post('/create', create);
router.delete('/:categoryId', categoryById);


module.exports = router;