var express = require('express');
var router = express.Router();

const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let text = db.collection('text')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  let list = await text.list();
  res.send(list);
});

router.get('/:key', async function(req, res, next) {
  let item = await text.get(req.params.key);
  res.send(item);
});

router.post('/', async function(req, res, next) {
  const {content} = req.body;
  await text.set(text, {
    Content: content,
  })
  res.end();
});


router.delete('/:key', async function(req, res, next) {
  await text.delete(req.params.key);
  res.end();
});
module.exports = router;
