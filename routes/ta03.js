// Team Activity 03
const express = require('express');
const https = require("https");

const router = express.Router();

router.get('/', (req, res, next) => {
  processJSON()
    .then((response) => {
      res.render('pages/ta03', {
        title: 'Team Activity 03',
        path: '/ta03', // For pug, EJS
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        data: response
      });
    })
    .catch((error) => {
      console.log(error);

      res.render('pages/ta03', {
        title: 'Team Activity 03',
        path: '/ta03', // For pug, EJS
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
        data: null
      });
    });



});

function processJSON () {
  let url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";

  return new Promise((resolve, reject) => {
      https.get(url, (response) => {
      var body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        try {
          const parsedData = JSON.parse(body);
          // Return data if successful
          resolve(parsedData);
        } catch (error) {
          // Return error if not
          reject(error.message);
        }
      });

    }).on('error', (error) => {
      console.log("error: ", error);
    });
  });
}

module.exports = router;
