const express = require('express');
const { Todo } = require('../mongo');
const { findByIdAndUpdate } = require('../mongo/models/Todo');
const router = express.Router();
const { incrementCounter } = require('../redis/index');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  await incrementCounter('added_todos');
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const update = req.body;
  if (!req.body) {
    res.send(400).json({ error: 'No modifications supplied' });
    return;
  }

  await Todo.updateOne(req.todo, update);
  res.send(update);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
