const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const corsRegex = /localhost|10.2/g
const app = express();
app.use(bodyParser.json());

app.use(cors({
  origin: function(origin, callback){
    console.log(origin, corsRegex, corsRegex.test(origin));
    if (!origin) {
      return callback(null, true);
    }

    if (corsRegex.test(origin)) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }

}));


const port = 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

// GET request handler
app.get('/characters', (req, res) => {
  const characters = require("./characters/characters.json");
  res.send(Object.keys(characters));
});
// GET request handler
app.get('/characters/:id', (req, res) => {
  const characters = require("./characters/characters.json");
  const characterId = req.params.id
  if (characterId in characters)
    res.send(characters[characterId]);
  else 
    res.errored(new Error("Character not found"))

});
app.post('/characters/:id', (req, res) => {
  const characterId = req.params.id;
  const characters = require("./characters/characters.json");
  const newCharacters = {...characters};
  newCharacters[characterId] = req.body
  fs.writeFileSync('./characters/characters.json', JSON.stringify(newCharacters, null, 2));
  delete require.cache[require.resolve("./characters/characters.json")] 
  res.send(`PUT /users/${characterId}`);
});
app.get('/connections', (req, res) => {
  const connections = require("./connections/connections.json");
  // Logic to handle the GET request for retrieving users
  res.send(Object.keys(connections));
});