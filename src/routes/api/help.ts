import express from 'express';

const help = express.Router();

help.get('/', (req, res) => {
  res.send(`
    <h1 style="text-align: center;">URL must be like :</h1>
    <h3 style="text-align: center;">http://localhost:3000/images?filename={name}&width={width}&height={height}</h3>
    <h4 style="text-align: center;">
      For Example
      <a href="http://localhost:3000/images?filename=test&width=400&height=400">
        http://localhost:3000/images?filename=test&width=400&height=400
      </a>
    </h4>
  `);
});

export default help;