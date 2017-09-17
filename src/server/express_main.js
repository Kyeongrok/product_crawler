/*

node.js -> javascript엔진
electron -> html을 pc app처럼 사용 할 수 있게 해줌
express -> server
 */

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(1092);