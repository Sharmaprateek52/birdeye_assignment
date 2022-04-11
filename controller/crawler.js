const cheerio = require("cheerio");
const axios = require("axios");
var beautify = require("json-beautify");
const fs = require("fs");

const getReviews = async () => {
  try {
    const endPoint = "https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3";
    const fetchPromise = axios({ method: "get", url: endPoint });
    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Request Timeout");
      }, 30000);
    });
    const response = await Promise.race([fetchPromise, timeOutPromise]);
    const $ = cheerio.load(response.data, { xmlMode: true }); // xmlMode: true is a workaround for many cheerio bugs.
    let list = [];
    $(".review").each(function (index, element) {
      console.log(index);

      let json = {};
      if (index > 0) {
        json = {
          "Types": $(element).find(".leftCol .itemReview dt:nth-child(1)").text(),
          "Rating": $(element).find(".leftCol .itemReview dd strong:nth-child(2)").text(),
          "Review Date": $(element).find(".leftCol .reviewer dd:nth-child(4)").text(),
          "reviewer Name": $(element).find(".leftCol .reviewer dd:nth-child(2)").text(),
          "Review comment": $(element).find(".rightCol p").text(),
        };
        list.push(json);
      }
    });
    return list;
  } catch (err) {
    return err;
  }
};

module.exports = {
  getReviews,
};
