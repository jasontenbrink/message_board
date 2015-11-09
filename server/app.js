var express = require ('express');
var app = express();
var index = require ('./routes/index.js');
var data = require('./routes/data.js');
var admin = require('./routes/admin.js');

var bodyParser = require ('body-parser');
var path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));


app.use('/data', data);
app.use('/admin', admin);
app.use('/', index);

app.set("port", process.env.PORT || 5000);

app.listen(app.get("port"), function () {
  console.log('raarrr', app.get('port'));
});


// app.get('/*', function(request, response){
//   var file = request.params[0] || 'views/index.html';
//   response.sendFile(path.join(__dirname,'./public',file));
// });
