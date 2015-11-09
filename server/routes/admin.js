var express = require('express');
var router = express.Router();
var path = require('path');

router.get ('/*', function (req, res) {
  console.log('admin route was hit');
  var file = req.params[0] || 'views/admin.html';
  res.sendFile(path.join(__dirname,'../public', file));
});

module.exports = router;
