var express = require('express');
var router = express.Router();
var User = require('../models').User;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try{
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const result = await User.create({
      name: req.body.name,
      age: req.body.age,
      married: req.body.married,
    });
    console.log('sssssssssss');
    console.log(result);
    console.log(result.dataValues);
    console.log('sssssssssss');
    console.log(result.toJSON());
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
