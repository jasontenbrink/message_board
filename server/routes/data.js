var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL  || 'postgres://localhost:5432/message_board';
//+ "?ssl=true"

router.route('/').post(function (req, res) {
                    console.log(req.body);
                    pg.connect(connectionString,function (err, client, done) {
                      var query = 'INSERT INTO messages (name, message) VALUES($1, $2)';
                      client.query(query,[req.body.name, req.body.message], function (err, result) {
                        if (err) {
                          console.log('error sending data', err);
                          res.send(false);
                        }
                        res.send(result);
                      });
                      done();
                    });
                  })
                  .get(function (req, res) {
                    var results = [],
                        query;
                    pg.connect(connectionString, function (err, client, done) {
                      query = client.query('SELECT name, message, id FROM messages');
                      query.on('row', function (row) {
                        results.push(row);
                      });
                      query.on('end', function () {
                        client.end();
                        res.json(results);
                      });
                    });
                  });

module.exports = router;
