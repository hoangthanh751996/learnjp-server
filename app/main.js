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
let row6 = ["ha", "hi", "fu", "he", "ho"];
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

let row11 = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ"];
let row12 = ["さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の"];
let row13 = ["ま", "み", "む", "め", "も", "や", "ゆ", "よ"];
let row14 = ["ら", "り", "る", "ろ", "わ", "を", "ん"];
let letterHiragana = [];
letterHiragana = letterHiragana.concat(row11);
letterHiragana = letterHiragana.concat(row12);
letterHiragana = letterHiragana.concat(row13);
letterHiragana = letterHiragana.concat(row14);
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
    let letterCheck = req.body.letter_check;
    let textRes = "";
    let dataRes;
    let i = 0;
    while(1) {
      let numberRandom = getRandomInt(0, 45);
      if(letterCheck == "romaji") {
        if(level == "hard") {
          textRes += letter[numberRandom];
        } else {
          textRes = textRes + letter[numberRandom] + " ";

        }
        i++;
        if(i >= numberWords) {
          break;
        }
      } else {
        if(level == "hard") {
          textRes += letterHiragana[numberRandom];
        } else {
          textRes = textRes + letterHiragana[numberRandom] + " ";

        }
        i++;
        if(i >= numberWords) {
          break;
        }
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
