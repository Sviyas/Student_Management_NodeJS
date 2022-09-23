const express = require('express');
const router = express.Router();

//  this welcome page of the website
router.get('/', (req, res) => {
  res.send('!...Welcome to Management System...!');
  console.log('using dashboard');
});

module.exports = router;
