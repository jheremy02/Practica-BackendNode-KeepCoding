var express = require('express');
const fs=require('fs')
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const filename = path.join(__dirname, '../README.md');
  fs.readFile(filename,'utf8',(err,readme)=>{
    console.log(filename)
    res.render('index', {readme})
  })
  ;
});

module.exports = router;
