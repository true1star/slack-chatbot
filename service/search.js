/**
 * Created by true1star on 2017. 2. 3..
 */
var request = require('request');
var async = require('async');
var cheerio = require('cheerio');
var qs = require('querystring');


var baseurl = 'http://section.blog.naver.com/sub/SearchBlog.nhn?type=post&option.keyword=' + '{{keyword}}' + '&term=&option.startDate=&option.endDate=&option.page.currentPage='+'{{page}}'+'&option.orderBy=sim';

var search = function (page, keyword, result, end) {

  var url = "";

  // query[page, keyword] URL 에 넣기
  url = baseurl.replace('{{keyword}}', qs.escape(keyword));
  url = url.replace('{{page}}', qs.escape(page));

  console.log("url : ", url);
  async.waterfall([
    function (callback) {
      request.get({
        url: url
      }, function (err, res, html) {
        if (err)
          return callback(err);
        var $ = cheerio.load(html);
        callback(null, $);
      });
    },
    function ($, callback) {
      $('.search_list li h5 a').each(function () {
        result.push({title: $(this).text().trim(), href: $(this).attr('href')});
      });
      callback(null);
    }
  ], function () {
    if (page >= 5) {
      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

      result = shuffle(result);

      var random_pick = [];
      var idx = 0;
      while (random_pick.length < 1) {
        if (result[idx].title.length > 0) {
          random_pick.push(result[idx]);
        }
        idx++;
      }

      end(random_pick);
    } else {
      search(page + 1, keyword, result, end);
    }
  });
};

// search(1, 'I am keyword',[], function (result) {
//   console.log(result);
// });

module.exports = search;