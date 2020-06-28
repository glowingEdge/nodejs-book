var express = require('express');
var router = express.Router();
var User = require('../models').User;

/* GET home page. */
router.get('/', async (req, res, next) => {
  try{
    const users = await User.findAll();
    console.log('start');
    console.log(users);
    res.render('sequelize', { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
