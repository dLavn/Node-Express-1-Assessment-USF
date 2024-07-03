//Original Code:

/*
const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', function(req, res, next) {
  try {
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000);

*/

//Fixed and Refactored Code:
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON body
app.use(bodyParser.json());

// POST route to get GitHub user information
app.post('/', async function (req, res, next) {
  try {
    // Extract developers array from the request body
    const developers = req.body.developers;

    // Map over developers and fetch their GitHub profiles
    const results = await Promise.all(developers.map(async (username) => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        return { name: response.data.name, bio: response.data.bio };
      } catch (error) {
        return { name: username, bio: "User not found or API error" };
      }
    }));

    // Send the results as JSON response
    return res.json(results);
  } catch (err) {
    return next(err);
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
