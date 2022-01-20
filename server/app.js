const getPorts = require('./api');
const express = require('express');

const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api/ports', (req, res) => {
  const ports = getPorts(req, res)
  res.json({ ports })
})

app.listen(3000, () => {
  console.log('Ports API listening on port 3000')
})
