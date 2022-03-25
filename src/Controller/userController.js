const jwt = require('jsonwebtoken');
const config = require('../../config');
const rp = require("request-promise");





//Use the ApiKey and APISecret from config.js
const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};
const token = jwt.sign(payload, config.APISecret);

const createMeeting = async (req, res) => {
  // console.log("req.body", req.body)
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + 'asadiqbal791@gmail.com' + "/meetings",
    body: { ...req.body },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      // console.log("response is: ", response);
      // response.status(200).json(response);
      // let dataRes = {
      //   join_url: response.join_url,
      // };
      // if(response.occurrences)
      res.status(200).json(response);

      // res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      // console.log("API call failed, reason ", err);
      res.status(422).send(err)
    });
}

const getMeeting = async (req, res) => {
  var options = {
    method: "GET",
    uri: "https://api.zoom.us/v2/users/asadiqbal791@gmail.com/meetings",
    auth: {
      bearer: token,
    },
    // qs:{
    //     "page_size": 10
    // },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      // console.log("Zoom REsponse", response);
      // response.status(200).json(response);
      let dataRes = {
        join_url: response.join_url,
      };
      res.status(200).send(response)

      // res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      // console.log("API call failed, reason ", err);
    });
};
const deleteMeeting = async (req, res) => {

  var options = {
    method: "DELETE",
    uri: `https://api.zoom.us/v2/meetings/${req.params.id}`,
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      // console.log("Zoom REsponse", response);
      // response.status(200).json(response);
      res.status(200).send(response)

      // res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // API call failed...
      // console.log("API call failed, reason ", err);
      res.status(122).send(err)
    });
};

module.exports = { getMeeting, createMeeting, deleteMeeting }