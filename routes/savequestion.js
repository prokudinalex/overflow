/**
 * Created by sonu on 21/9/17.
 */

var express = require('express');
var router = express.Router();
var sanitizeHtml = require('sanitize-html');
var mysql = require('mysql');

const config = require('./config');
var con = mysql.createConnection(config.MYSQL);


var staterData = {
    title: 'Express',
    company : "TECH OVERFLOW",
    username: ""
}


router.post('/', function(req, res, next) {
    const title = sanitizeHtml(req.body.title);
    const description = sanitizeHtml(req.body.description);
    const tags = sanitizeHtml(req.body.tags);
    var sql = "INSERT INTO questions(title, description,tags, askedby, askedtime, votes , extra) " +
        " VALUES ( '"+title+"', '"+description+"', '"+tags+"', '"+req.session.user[0].id+"', CURRENT_TIMESTAMP, '0' , '0')";
    con.query(sql, function (err, result, fields) {
        res.redirect('/questions');
    });


});

module.exports = router;

