const { Router } = require('express');
const dogs = require('./subRoutes/dogs.js');
const temper = require('./subRoutes/temper.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogs);
router.use('/tempers', temper);


module.exports = router;
