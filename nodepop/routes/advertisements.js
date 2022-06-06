var express = require('express');
var router = express.Router();
const Advertisement = require('mongoose').model('Advertisement');
const {buildFilter}=require('../lib/utils.js')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const start=parseInt(req.query.start) || 0
    const limit = parseInt(req.query.limit) || 100
    const sort = req.query.sort || '_id'
    const pagination={start,limit,sort}

    const filters=req.query
    const filterBuilt=buildFilter(filters)
    const advertisements= await Advertisement.list(filterBuilt,pagination)
    res.render("advertisements",{advertisements})
});

module.exports = router;
