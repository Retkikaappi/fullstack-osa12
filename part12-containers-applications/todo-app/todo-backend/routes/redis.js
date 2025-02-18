const express = require('express');
const { setAsync, getAsync } = require('../redis/index');
const router = express.Router();

router.get('/', async (req, resp) => {
  const current = await getAsync('added_todos');
  resp.send({ added_todos: current });
});

module.exports = router;
