const router = require('express').Router();
const emailRoute = require('./emailRoute');

router.use('/contact', emailRoute);


module.exports = router;