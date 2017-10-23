"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// load dependencies
let row1 = ["a", "i", "u", "e", "o"];
let row2 = ["ka", "ki", "ku", "ke", "ko"];
let row3 = ["sa", "shi", "su", "se", "so"];
let row4 = ["ta", "chi", "tsu", "te", "to"];
let row5 = ["na", "ni", "nu", "ne", "no"];
let row6 = ["ha", "hi", "hu", "he", "ho"];
let row7 = ["ma", "mi", "mu", "me", "mo"];
let row8 = ["ya", "yu", "yo"];
let row9 = ["ra", "ri", "ru", "re", "ro"];
let row10 = ["wa", "wo", "n"];
let letter = [];
letter = letter.concat(row1);
letter = letter.concat(row2);
letter = letter.concat(row3);
letter = letter.concat(row4);
letter = letter.concat(row5);
letter = letter.concat(row6);
letter = letter.concat(row7);
letter = letter.concat(row8);
letter = letter.concat(row9);
letter = letter.concat(row10);

// boostrap app
let app = express();
let server = require("http").Server(app);
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = (config) => {

	app.use(cors());
	app.use(bodyParser.json({limit: '50mb'}));

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.post("/api/generate", (req, res) => {
    let numberWords = req.body.number_word;
    let level = req.body.level;
    let textRes = "";
    let dataRes;
    let i = 0;
    while(1) {
      let numberRandom = getRandomInt(0, 45);
      if(level == "hard") {
        textRes += letter[numberRandom];
      } else {
        textRes = textRes + letter[numberRandom] + " ";

      }
      i++;
      if(i > numberWords) {
        break;
      }
    }

    dataRes = {
      code: 200,
      data: textRes,
      message: "Success"
    }
    res.json(dataRes);
  })

	server.listen(config.PORT, function (err) {
		if (err) {
			console.log("Error", err);
		};

		console.log("Lib server is listening on port " + config.PORT);
	});
};
