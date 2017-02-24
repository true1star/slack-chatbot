var getAuth = require('./google-auth');
var google = require('googleapis');
var Base64 = require('js-base64').Base64;
var urlBase64 = require('base64-url');
var urlencode = require('urlencode');

var testPresentationId = '1tv1MzZSBLXBYAazQ5b7Ulo0ukx2NdFPbib4HHD2WmQA';

getAuth(function (auth) {
  copySlide(auth);
});

/**
 * Prints the number of slides and elements in a sample presentation:
 * https://docs.google.com/presentation/d/1EAYk18WDjIG-zp_0vLm3CsfQh_i8eXc67Jo2O9C6Vuc/edit
 */
function listSlides(auth) {
  var slides = google.slides('v1');
  slides.presentations.get({
    auth: auth,
    presentationId: '1b47D9rDqCMVY5z1LTW-JF7NlYjLgP2kWwyBpCX34Ctw'
  }, function(err, template) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    //var a = template.slides[0].pageElements[1].table.tableRows[4].tableCells[1].text.textElements[1].textRun.content;
    var copied = JSON.parse(JSON.stringify(template));
    var arr = ['2017','2','4','17','2','20'];

    copied.title = newTitle(arr, copied.title);

    slides.presentations.create({
      auth: auth,
      title: copied.title,
    }, function (err, presentation) {
      if(err) {
        console.log('err : ' + err);
        return;
      }
      var newPt = presentation;
      console.log(newPt);
    });
  });
}

function copySlide(auth) {
  var service = google.drive('v3');

  var arr = ['2017','2','4','17','2','20'];
  var title = newTitle(arr, 'YYYY년 MM월 WW주차 주간미팅 (yy. mm. dd)');
  var testTitle = 'copy and mail';
  var testFolder = "0B2f6yArstZFEbHNQUFZmSHlxZG8";
  var shared = "0B2f6yArstZFEaUlMazRMa3ZjUjA";
  var copiedId = "1b47D9rDqCMVY5z1LTW-JF7NlYjLgP2kWwyBpCX34Ctw";

  var options = {
    name: testTitle,
    parents: [
      testFolder
    ]
  };
  var params = {
    fileId: copiedId,
    auth: auth,
    resource: options,
    fields: 'name, id, webViewLink'
  };
  service.files.copy(params, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }

    console.log(response);

    setNewSlide(auth, {id: response.id, title: title, link: response.webViewLink});
  });
}

function setNewSlide(auth, params) {
  var slide = google.slides('v1');

  var replaceText = params.title;

  var options = {
    "replaceAllText": {
      "replaceText": replaceText,
      "containsText": {
        "text": "YYYY년 MM월 WW주차 주간미팅 (yy. mm. dd)",
        "matchCase": true
      }
    }
  };

  slide.presentations.batchUpdate({auth: auth, presentationId: params.id, resource: {requests: [options] }}, null, function (err, res) {
    if ( err ) {
      console.log(err);
    }

    console.log(res);
    sendGmail(auth, params.link);
    //checkIfTouched(auth, '1tv1MzZSBLXBYAazQ5b7Ulo0ukx2NdFPbib4HHD2WmQA');
  });
}

function checkIfTouched(auth, id) {
  var slide = google.slides('v1');

  slide.presentations.get({auth: auth, presentationId: id}, null, function (err, presentation) {
    /*
     * i == 2
     * j == 2
     * k == 6 , 5 (index 0 은 헤더 row. page 2 는 k == 5)
     * l == 4 (index 1 '담주목표'만 필요)
     * m == 2 (초기값 2 index 0 : 시작점 index 1 : 글 내용 초기값 "\n")
     */
    var ptSlides = presentation.slides;
    for(var i = 0; i < ptSlides.length; i++){
      var elt = ptSlides[i].pageElements;
      for(var j = 0; j < elt.length; j++){
        if( elt[j].table ) {
          var tableRows = elt[j].table.tableRows;
          for(var k = 1; k < tableRows.length; k++){
            var textElt = tableRows[k].tableCells[1].text.textElements;
            var name = tableRows[k].tableCells[0].text.textElements[1].textRun.content;
            if( textElt[1].textRun.content !== "\n" ){
              console.log(name + "님은 작성 중 또는 완료");
            } else {
              console.log(name + "님은 안하심");
            }
          }
        }
      }
    }
  })
}

function sendGmail(auth, link) {
  var gmail = google.gmail('v1');
  var from = "진한별";
  from = "=?UTF-8?B?" + Base64.encode(from) + "?=";
  var subject = "주간미팅 목표 테이블 작성";
  subject = "=?UTF-8?B?" + Base64.encode(subject) + "?=";
  var paragraph = "안녕하세요?\n\n아래 링크를 통해 다음주 월요일 오전 주간 미팅 목표 테이블을 작성해 주시면 감사하겠습니다.";

  var email = "\From: " + from + " \<hbjin@fin2b.com\>\nTo: your name \<bhjvv57@gmail.com\>\nTo: name2 \<jinhanbyeol@naver.com\>\nSubject\: " + subject + "\n\n"+ paragraph +"\n\n "+ link;
  var base64EncodedEmail = urlBase64.encode(email);
  gmail.users.messages.send({auth: auth, userId: 'me', resource: { raw: base64EncodedEmail}}, function (err, res) {
    console.log(res);
  });
}
function newTitle(dateQuery, title){
  var seqArr = ['YYYY', 'MM', 'WW', 'yy', 'mm','dd'];
  for(var i=0; i<seqArr.length; i++){
    title = title.replace(seqArr[i], dateQuery[i]);
  }
  return title;
}