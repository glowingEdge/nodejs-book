var express = require('express');
var router = express.Router();
var { User, Comment } = require('../models');

router.get('/:id', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        where: { id: req.params.id },
      }
    });
    console.log('start');
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try{
    const result = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try{
    const result = await Comment.update({
      comment: req.body.comment
    }, {
      where: { id: req.params.id }
    });
    console.log(result);
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try{
    const result = await Comment.destroy({
      where: { id: req.params.id }
    });
    console.log('start');
    console.log(result);
    console.log('end');
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;