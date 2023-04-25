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


router.post('/', async function(req, res, next) {
  const {content} = req.body;
  await text.set("content", {
    Content: content,
  })
  res.json({
    status: "success",
    content: content
  })
});

module.exports = router;
