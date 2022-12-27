import express from 'express';
const index = express.Router();

//  ? Index Page of Student Management System
index.get('/', (req, res) => {
  res.send('!...Welcome to Management System...!');
  console.log('using dashboard');
});

export default index;
